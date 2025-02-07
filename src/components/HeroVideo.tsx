import React from "react";

type HeroVideoProps = {
  videoSrc: string;
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
  overlayOpacity?: string; // Default overlay opacity
};

const HeroVideo: React.FC<HeroVideoProps> = ({
  videoSrc,
  title,
  description,
  buttonText,
  buttonAction,
  overlayOpacity = "bg-black/50", // Default 50% opacity
}) => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayOpacity}`} />

      {/* Content */}
      <div className="relative text-center px-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6">{description}</p>
        <button
          onClick={buttonAction}
          className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-all rounded-lg"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default HeroVideo;
