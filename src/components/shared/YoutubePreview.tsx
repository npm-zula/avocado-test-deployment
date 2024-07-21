import React from "react";
import YouTube from "react-youtube";

interface YouTubePreviewProps {
  videoUrl: string;
}

const YouTubePreview: React.FC<YouTubePreviewProps> = ({ videoUrl }) => {
  // Extract video ID from the URL
  const getVideoId = (link: string): string | null => {
    try {
      const url = new URL(link);
      return url.searchParams.get("v") || url.pathname.split("/").pop() || "";
    } catch (error: any) {
      console.log("----errorr", error);
      return null;
    }
  };

  const videoId = getVideoId(videoUrl);

  return (
    <div className="youtube-preview">
      {videoId && <YouTube videoId={videoId} />}
    </div>
  );
};

export default YouTubePreview;
