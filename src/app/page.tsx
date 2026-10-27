import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-slate-100 px-4 py-12 transition-colors dark:from-slate-950 dark:to-slate-900 sm:py-16">
      <div className="fixed right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      <main className="mx-auto flex w-full max-w-md flex-col gap-8">
        <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

        <nav aria-label={`${profile.name}의 링크`}>
          <ul className="flex flex-col gap-3">
            {profile.links.map((link) => (
              <li key={link.id}>
                <LinkCard {...link} />
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <footer className="mt-12 text-center text-xs text-slate-400 dark:text-slate-500">링크나무</footer>
    </div>
  );
}
