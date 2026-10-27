import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 중에는 파일이 바뀔 때마다 모듈이 다시 실행되므로, 연결을 전역에 보관해 재사용함
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

/** MONGODB_URI가 없으면 null을 돌려줘서, DB 없이도 페이지는 동작하게 함 */
export async function getDb(): Promise<Db | null> {
  if (!uri) return null;

  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect();
  }

  try {
    const client = await globalForMongo._mongoClientPromise;
    return client.db(dbName);
  } catch (error) {
    // 실패한 연결을 계속 붙잡지 않도록 지우고, 다음 요청에서 다시 시도
    globalForMongo._mongoClientPromise = undefined;
    throw error;
  }
}
