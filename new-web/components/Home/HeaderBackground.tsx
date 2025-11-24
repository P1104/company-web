// components/HeaderBackground.tsx

"use client";
import React from "react";

// --- Interfaces ---

interface BackgroundProps {
  type: "image" | "video" | "color";
  value: string;
}

interface HeaderBackgroundProps {
  fullScreen?: boolean;
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  bg: BackgroundProps;
  fallBackImage?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}


// --- Main Component ---

export const HeaderBackground: React.FC<HeaderBackgroundProps> = ({
  fullScreen = true,
  fullWidth = true,
  paddingTop = 22,
  paddingBottom = 4,
  bg = { type: "video", value: "https://www.youtube.com/embed/kwmHaXUAa0M?autoplay=1&loop=1&playlist=kwmHaXUAa0M&t=20&mute=1&playsinline=1&controls=0&showinfo=0&autohide=1&allowfullscreen=true&mode=transparent" },
  fallBackImage = "/_images/background1.jpg",
  overlay = true,
  overlayColor = "#000000", // New default: Black
  overlayOpacity = 0.3,     // New default: 0.3
}) => {
  
  // 1. Dynamic Background Style for Image/Color (replicates LESS rules)
  const bgStyle: React.CSSProperties = {};
  if (bg.type === "color") {
    bgStyle.backgroundColor = bg.value;
  } else if (bg.type === "image") {
    bgStyle.backgroundImage = `url(${bg.value})`;
    bgStyle.backgroundSize = "cover";
    bgStyle.backgroundPosition = "center center";
  }

  // 2. Padding Style (only if not full screen)
  const paddingStyle: React.CSSProperties = !fullScreen
    ? {
        paddingTop: `${paddingTop}rem`,
        paddingBottom: `${paddingBottom}rem`,
      }
    : {};

  // 3. Overlay Style (replicates LESS rules)
  const overlayStyle: React.CSSProperties =
    overlay && bg.type !== "color"
      ? {
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }
      : {};

  // --- Tailwind Classes ---

  const sectionClasses = [
    "relative flex",
    "items-center", // Assuming content will be centered vertically if fullScreen is true, or use 'flex-start'/'flex-end' if content is added later
    fullScreen ? "min-h-screen" : "",
    fullWidth ? "w-full" : "container mx-auto",
  ].join(" ");


  return (
    <section
      className={sectionClasses}
      style={{
        ...bgStyle,
        ...paddingStyle,
      }}
    >
      {/* 4. Video background and Fallback */}
      {bg.type === "video" && (
        <>
          <iframe
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src={bg.value}
            frameBorder={0}
            allow="autoplay; loop; muted"
            allowFullScreen
            style={{ pointerEvents: "none" }}
            title="Header Background Video"
          />
          
          {/* Fallback Image (Replicates .mbr-fallback-image CSS) */}
          {fallBackImage && (
            <div
              style={{
                backgroundImage: `url(${fallBackImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
              // This div acts as the fallback image layer
              className="absolute top-0 left-0 w-full h-full z-0"
            />
          )}
        </>
      )}

      {/* 5. Overlay */}
      {overlay && bg.type !== "color" && (
        // The overlay div (Replicates .mbr-overlay CSS)
        <div className="absolute inset-0 z-10" style={overlayStyle} />
      )}

      {/* 6. Content Area */}
      <div className={`relative ${fullWidth ? "container-fluid" : "container mx-auto"} z-20 w-full`}>
        <div className="row flex justify-center items-center">
            {/* Content will go here (empty in the source HTML) */}
        </div>
      </div>
    </section>
  );
};

export default HeaderBackground;