import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#FFF8EE] via-[#FFF1E2] to-[#FFDCC4] px-6 py-16 transition-colors dark:from-[#1C1714] dark:via-[#211A16] dark:to-[#2B1E17] sm:py-24">
      {/* 글래스 카드 뒤로 은은하게 비치는 빛 번짐 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#FFC9A3]/50 blur-3xl dark:bg-[#7A4A2E]/30"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[#FFB8A0]/40 blur-3xl dark:bg-[#5C3524]/30"
      />

      <div className="fixed right-4 top-4 z-10 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <main className="relative mx-auto flex w-full max-w-md flex-col gap-12">
        <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />

        <nav aria-label={`${profile.name}의 링크`}>
          <LinkList links={profile.links} />
        </nav>
      </main>

      <footer className="relative mt-16 text-center text-xs tracking-wide text-[#B08A73] dark:text-[#8A7366]">
        링크나무
      </footer>
    </div>
  );
}
