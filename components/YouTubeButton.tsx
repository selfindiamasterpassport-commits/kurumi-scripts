"use client";

import { Youtube } from "lucide-react";

interface YouTubeButtonProps {
  youtubeUrl: string;
  size?: "sm" | "md";
  className?: string;
}

export function YouTubeButton({ youtubeUrl, size = "md", className = "" }: YouTubeButtonProps) {
  if (!youtubeUrl) return null;

  const sizeClasses =
    size === "sm"
      ? "px-3 py-1.5 text-xs"
      : "px-4 py-2 text-sm";

  return (
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-secondary inline-flex items-center gap-2 ${sizeClasses} ${className}`}
    >
      <Youtube className="h-4 w-4 text-red-500" />
      <span>YouTube Channel</span>
    </a>
  );
}
