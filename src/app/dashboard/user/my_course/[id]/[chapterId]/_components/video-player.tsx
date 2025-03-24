"use client";

import MuxPlayer from "@mux/mux-player-react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";

interface VideoPlayerProps {
  playbackId: string;
  title: string;
}

export const VideoPlayer = ({
  playbackId,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative aspect-video">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      <MuxPlayer
        title={title}
        className={cn(!isReady && "hidden")}
        onCanPlay={() => setIsReady(true)}
        autoPlay
        playbackId={playbackId}
      />
    </div>
  );
};
