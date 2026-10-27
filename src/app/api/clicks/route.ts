import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { profile } from "@/data/profile";

type ClickDoc = {
  _id: string;
  count: number;
  lastClickedAt: Date;
};

const COLLECTION = "clicks";
const linkIds = new Set(profile.links.map((link) => link.id));

// 링크 클릭 1회 기록
export async function POST(request: Request) {
  let linkId: unknown;
  try {
    // sendBeacon은 content-type을 보장하지 않아 본문을 텍스트로 받아 직접 파싱함
    linkId = JSON.parse(await request.text()).linkId;
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 등록된 링크만 집계해서 임의의 값이 DB에 쌓이지 않게 함
  if (typeof linkId !== "string" || !linkIds.has(linkId)) {
    return NextResponse.json({ error: "없는 링크입니다." }, { status: 400 });
  }

  try {
    const db = await getDb();
    if (!db) {
      return NextResponse.json({ error: "클릭 수 저장소가 설정되지 않았습니다." }, { status: 503 });
    }

    await db.collection<ClickDoc>(COLLECTION).updateOne(
      { _id: linkId },
      { $inc: { count: 1 }, $set: { lastClickedAt: new Date() } },
      { upsert: true },
    );
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("클릭 수 저장 실패", error);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}

// 링크별 클릭 수 조회
export async function GET() {
  try {
    const db = await getDb();
    if (!db) {
      return NextResponse.json({ error: "클릭 수 저장소가 설정되지 않았습니다." }, { status: 503 });
    }

    const docs = await db.collection<ClickDoc>(COLLECTION).find().toArray();
    const counts = Object.fromEntries(profile.links.map((link) => [link.id, 0]));
    for (const doc of docs) {
      if (linkIds.has(doc._id)) counts[doc._id] = doc.count;
    }
    return NextResponse.json({ counts });
  } catch (error) {
    console.error("클릭 수 조회 실패", error);
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
