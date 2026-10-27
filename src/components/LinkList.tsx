"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Counts = Record<string, number>;

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

export default function LinkList({ links }: { links: LinkItem[] }) {
  // 받아 오기 전에는 모두 0회로 보여 줌
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/clicks")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { counts?: Counts } | null) => {
        if (cancelled || !data?.counts) return;
        // 받는 사이에 누른 클릭이 사라지지 않도록 더 큰 값을 남김
        setCounts((prev) => {
          const merged = { ...data.counts };
          for (const [id, n] of Object.entries(prev)) {
            merged[id] = Math.max(merged[id] ?? 0, n);
          }
          return merged;
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  function handleClick(id: string) {
    recordClick(id);
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  }

  return (
    <ul className="flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard {...link} count={counts[link.id] ?? 0} onClick={() => handleClick(link.id)} />
        </li>
      ))}
    </ul>
  );
}
