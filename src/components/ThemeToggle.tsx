"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // 서버 렌더링 때는 테마를 알 수 없으므로, 마운트된 뒤에 실제 값을 읽음
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // 저장소를 못 쓰는 환경이면 이번 방문에만 적용
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
      aria-pressed={dark ?? undefined}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/45 text-[#8A6B58] shadow-sm backdrop-blur-xl transition duration-300 hover:bg-white/65 hover:text-[#E8794A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8794A] dark:border-white/10 dark:bg-white/[0.06] dark:text-[#C2A898] dark:hover:bg-white/[0.1] dark:hover:text-[#FFB27A]"
    >
      {dark ? (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
        </svg>
      ) : (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
        </svg>
      )}
    </button>
  );
}
