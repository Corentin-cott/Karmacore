// components/StreamEmbed.tsx
import React from "react";

interface StreamEmbedProps {
  url: string; // The URL of the Twitch or YouTube stream
}

const StreamEmbed: React.FC<StreamEmbedProps> = ({ url }) => {
  const isTwitch = url.includes("twitch.tv");
  const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");

  if (!isTwitch && !isYouTube) {
    return (
      <div className="text-center text-red-500">
        <p>Invalid stream URL. Please provide a Twitch or YouTube link.</p>
      </div>
    );
  }

  const embedUrl = isTwitch
    ? `https://player.twitch.tv/?channel=${url.split("twitch.tv/")[1]}&parent=localhost`
    : isYouTube
    ? `https://www.youtube.com/embed/${extractYouTubeId(url)}`
    : "";

  return (
    <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
      <iframe
        src={embedUrl}
        allowFullScreen
        className="w-full h-full"
        frameBorder="0"
        title="Stream Embed"
      ></iframe>
    </div>
  );
};

// Utility function to extract YouTube video ID
const extractYouTubeId = (url: string): string => {
  const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([\w-]+)/);
  return match ? match[1] : "";
};

export default StreamEmbed;
