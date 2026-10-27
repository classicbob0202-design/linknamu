export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 아래 이미지 경로. 없으면 이름 첫 글자로 아바타를 그림 */
  image?: string;
  links: LinkItem[];
};

// 예시 링크입니다. 실제 주소로 바꿔 쓰세요.
export const profile: Profile = {
  name: "김태완",
  bio: "Hi",
  links: [
    {
      id: "github",
      title: "GitHub",
      url: "https://github.com",
      description: "만든 프로젝트 모음",
    },
    {
      id: "blog",
      title: "블로그",
      url: "https://velog.io",
      description: "개발하며 배운 것들",
    },
    {
      id: "instagram",
      title: "Instagram",
      url: "https://instagram.com",
      description: "일상 사진",
    },
  ],
};
