// components/Image02.tsx

"use client";
import React from "react";
// Import Image if you plan to place the image inside the div, but using 
// background-image property is easier for full-section backgrounds.

// --- Interfaces ---

interface BackgroundProps {
  type: "image" | "color"; // Only image is selected in the source, but supporting both is good practice
  value: string;
}

interface Image02Props {
  fullScreen?: boolean;
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  bg: BackgroundProps;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}


// --- Main Component ---

export const Image02: React.FC<Image02Props> = ({
  fullScreen = true,
  fullWidth = false,
  paddingTop = 5,
  paddingBottom = 5,
  bg = { type: "image", value: "https://r.mobirisesite.com/2046818/assets/images/photo-1660165458059-57cfb6cc87e5.jpeg" },
  overlay = false,
  overlayColor = "#000000",
  overlayOpacity = 0.3,
}) => {
  
  // 1. Dynamic Background Style (replicates LESS rules)
  const bgStyle: React.CSSProperties = {
    // LESS: background-image: url(@bg-value)
    // Tailwind: background-size: cover, background-position: center added for best practice
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };
  
  if (bg.type === "image") {
    bgStyle.backgroundImage = `url(${bg.value})`;
  } else if (bg.type === "color") {
    bgStyle.backgroundColor = bg.value;
  }

  // 2. Padding Style (only if not full screen)
  const paddingStyle: React.CSSProperties = !fullScreen
    ? {
        // LESS: padding-top: (@paddingTop * 1rem)
        paddingTop: `${paddingTop}rem`,
        paddingBottom: `${paddingBottom}rem`,
      }
    : {};

  // 3. Overlay Style
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
    // LESS: overflow: hidden
    "overflow-hidden", 
    fullScreen ? "min-h-screen" : "",
  ].join(" ");
  
  const contentContainerClasses = fullWidth ? "container-fluid" : "container mx-auto";


  return (
    <section
      className={sectionClasses}
      style={{
        ...bgStyle,
        ...paddingStyle,
      }}
    >
      {/* 4. Overlay */}
      {overlay && bg.type !== "color" && (
        <div className="absolute inset-0 z-10" style={overlayStyle} />
      )}

      {/* 5. Content Area */}
      <div className={`relative z-20 w-full ${contentContainerClasses}`}>
        <div className="row">
            {/* Content area is currently empty */}
        </div>
      </div>
    </section>
  );
};

export default Image02;