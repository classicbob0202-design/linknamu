import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image?: string;
};

export default function ProfileHeader({ name, bio, image }: Props) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="relative h-24 w-24 overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/20 sm:h-28 sm:w-28">
        {image ? (
          <Image src={image} alt={`${name} 프로필 사진`} fill sizes="112px" className="object-cover" priority />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center text-4xl font-bold text-white"
          >
            {name.slice(0, 1)}
          </span>
        )}
      </div>
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
        {name}
      </h1>
      <p className="mt-2 text-base text-slate-500 dark:text-slate-400">{bio}</p>
    </header>
  );
}
