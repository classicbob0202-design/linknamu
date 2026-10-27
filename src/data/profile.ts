export type LinkItem = {
  id: string;
  title: string;
  url: string;
  /** 제목 앞에 붙는 이모지 */
  icon?: string;
  description?: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** 이미지 주소(public/ 경로나 외부 URL). 없으면 이름 첫 글자로 아바타를 그림 */
  image?: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "김개발",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  image: "https://placehold.co/150x150/orange/white",
  links: [
    {
      id: "github",
      title: "깃허브",
      url: "https://github.com/classicbob0202-design",
      icon: "🐙",
    },
    {
      id: "blog",
      title: "블로그",
      url: "https://classicbob0202-design.github.io/my-blog/",
      icon: "✍️",
    },
    {
      id: "email",
      title: "이메일",
      // TODO: 실제 이메일 주소로 바꾸기
      url: "mailto:me@example.com",
      icon: "📬",
    },
  ],
};
