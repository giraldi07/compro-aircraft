import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

type HeroVideoProps = {
    videoSrc: string;
    title: string;
    description: string;
    buttonText: string;
    buttonAction?: () => void;
    buttonLink?: string; // Bisa pakai link untuk navigasi
    overlayOpacity?: string;
};

const HeroVideo: React.FC<HeroVideoProps> = ({
    videoSrc,
    title,
    description,
    buttonText,
    buttonAction,
    buttonLink,
    overlayOpacity = "bg-black/50",
}) => {
  const [offsetY, setOffsetY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY * 0.3);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto min-h-[50vh] md:min-h-[30vh] flex items-center justify-center text-white overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        style={{ transform: `translateY(${offsetY * 0.4}px) scale(1.1)` }}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 ${overlayOpacity || "bg-black/50"}`}
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      />

      {/* Content */}
      <div
        className="relative text-center px-6 sm:px-8 max-w-2xl transition-transform duration-300"
        style={{ transform: `translateY(${offsetY * 0.2}px)` }}
      >
        <h1 className="text-4xl font-bold mb-2">
          {title}
        </h1>
        <p className="text-md leading-relaxed mb-6">
          {description}
        </p>
        {/* Button (Hanya Satu, Bisa Navigasi atau Action) */}
        {buttonLink ? (
          <Link
            to={buttonLink}
            onClick={buttonAction}
            className="px-8 py-3 text-md md:text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-950 dark:hover:bg-blue-800 transition-all rounded-lg shadow-xl"
          >
            {buttonText}
          </Link>
        ) : (
          <button
            onClick={buttonAction}
            className="px-8 py-3 text-md md:text-lg font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-950 dark:hover:bg-blue-800 transition-all rounded-lg shadow-xl"
          >
            {buttonText}
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroVideo;
