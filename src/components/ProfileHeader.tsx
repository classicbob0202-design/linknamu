import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image?: string;
};

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 흰 테두리 + 아래로 떨어지는 그림자로 살짝 떠 있는 느낌을 줌 */}
      <div className="rounded-full bg-white/70 p-1.5 shadow-[0_12px_32px_-8px_rgba(194,110,60,0.45)] ring-1 ring-white/80 dark:bg-white/10 dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] dark:ring-white/10">
        <div className="relative h-28 w-28 overflow-hidden rounded-full bg-gradient-to-br from-[#FFB27A] to-[#E8794A] sm:h-32 sm:w-32">
          {image ? (
            // placehold.co는 SVG를 돌려줘 Next 이미지 최적화를 거치지 않고 그대로 씀
            <Image src={image} alt={`${name} 프로필 사진`} fill unoptimized className="object-cover" priority />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center text-4xl font-bold text-white"
            >
              {name.slice(0, 1)}
            </span>
          )}
          {/* 위쪽에 맺히는 빛으로 입체감을 더함 */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-transparent to-black/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]"
          />
        </div>
      </div>
      <h1 className="mt-6 text-[1.75rem] font-bold tracking-tight text-[#3A2A20] dark:text-[#F7EDE5] sm:text-3xl">
        {name}
      </h1>
      <p className="mt-2 max-w-xs text-[0.95rem] leading-relaxed text-[#8A6B58] dark:text-[#C2A898]">{bio}</p>
    </header>
  );
}
