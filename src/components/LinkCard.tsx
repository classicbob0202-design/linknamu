"use client";

import type { LinkItem } from "@/data/profile";

// 새 탭으로 넘어가도 요청이 끊기지 않도록 sendBeacon을 우선 사용
function recordClick(linkId: string) {
  const body = JSON.stringify({ linkId });
  try {
    if (navigator.sendBeacon?.("/api/clicks", body)) return;
  } catch {
    // sendBeacon을 못 쓰면 아래 fetch로 보냄
  }
  fetch("/api/clicks", { method: "POST", body, keepalive: true }).catch(() => {});
}

export default function LinkCard({ id, title, url, icon, description }: LinkItem) {
  // mailto: 같은 링크는 새 탭으로 열면 빈 탭만 남으므로 웹 주소만 새 탭으로 엶
  const isWeb = /^https?:\/\//.test(url);
  return (
    <a
      href={url}
      target={isWeb ? "_blank" : undefined}
      rel={isWeb ? "noopener noreferrer" : undefined}
      onClick={() => recordClick(id)}
      className="group flex min-h-16 items-center gap-4 rounded-3xl border border-white/70 bg-white/45 px-5 py-4 shadow-[0_4px_24px_-8px_rgba(160,90,50,0.18)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_28px_-10px_rgba(160,90,50,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8794A] dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] dark:hover:bg-white/[0.1]"
    >
      {icon && (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-lg shadow-sm dark:bg-white/10"
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-[#3A2A20] dark:text-[#F7EDE5]">{title}</span>
        {description && (
          <span className="mt-0.5 block truncate text-sm text-[#8A6B58] dark:text-[#C2A898]">
            {description}
          </span>
        )}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-4 w-4 shrink-0 text-[#C9A48C] transition duration-300 group-hover:translate-x-0.5 group-hover:text-[#E8794A] dark:text-[#8A7366]"
      >
        <path
          fillRule="evenodd"
          d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.17 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  );
}
