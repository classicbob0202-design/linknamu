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

export default function LinkCard({ id, title, url, description }: LinkItem) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => recordClick(id)}
      className="group flex min-h-14 items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500"
    >
      <span className="min-w-0">
        <span className="block font-semibold text-slate-900 dark:text-slate-50">{title}</span>
        {description && (
          <span className="mt-0.5 block truncate text-sm text-slate-500 dark:text-slate-400">
            {description}
          </span>
        )}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-500"
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
