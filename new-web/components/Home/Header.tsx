// components/Header18.tsx

"use client";
import React from "react";

// --- Interfaces (as provided in your Header.tsx) ---

interface BackgroundProps {
  type: "image" | "video" | "color";
  value: string;
}

interface Header18Props {
  fullScreen?: boolean;
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  contentWidth?: number;
  showTitle?: boolean;
  showSubtitle?: boolean;
  showText?: boolean;
  showButtons?: boolean;
  verticalAlign?: "flex-start" | "center" | "flex-end";
  horizontalAlign?: "flex-start" | "center" | "flex-end";
  bg: BackgroundProps;
  fallBackImage?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  title?: string;
  subtitle?: string;
  text?: string;
  buttonText?: string;
  buttonUrl?: string;
}

// --- Helper Functions (Modernized Tailwind mapping) ---

// Maps prop to Tailwind item alignment classes
function getVerticalAlignClasses(vertical: string = "flex-end"): string {
  if (vertical === "center") return "items-center";
  if (vertical === "flex-start") return "items-start";
  return "items-end";
}

// Maps prop to Tailwind justify content classes (used on the row/flex parent)
function getHorizontalAlignClasses(horizontal: string = "flex-start"): string {
  if (horizontal === "center") return "justify-center";
  if (horizontal === "flex-end") return "justify-end";
  return "justify-start";
}

// Maps prop to Tailwind width classes (based on the contentWidth prop)
function getContentWidthClasses(num: number = 12): string {
  if (num === 12) return "w-full";
  // Assuming a max width of 12 (full-width) and common breakpoints
  if (num === 6) return "md:w-1/2";
  if (num === 4) return "md:w-1/3";
  // Add other logic if needed, otherwise default to full width
  return "w-full";
}


// --- Main Component ---

export const Header18: React.FC<Header18Props> = ({
  fullScreen = true,
  fullWidth = true,
  paddingTop = 20,
  paddingBottom = 4,
  contentWidth = 12,
  showTitle = true,
  showSubtitle = true,
  showText = true,
  showButtons = true,
  verticalAlign = "flex-end",
  horizontalAlign = "flex-start",
  bg = { type: "image", value: "/default.jpg" },
  fallBackImage,
  overlay = true,
  overlayColor = "#000000",
  overlayOpacity = 0.5,
  title = "EQUILIBRATE.AI",
  subtitle = "Header Subtitle",
  text = "Democratizing technology by breaking all tech barriers with AI.",
  buttonText = "Explore Products",
  buttonUrl = "#",
}) => {
  
  // 1. Dynamic Background Style for Image/Color
  const bgStyle: React.CSSProperties = {};
  if (bg.type === "color") {
    bgStyle.backgroundColor = bg.value;
  } else if (bg.type === "image") {
    bgStyle.backgroundImage = `url(${bg.value})`;
    bgStyle.backgroundSize = "cover";
    bgStyle.backgroundPosition = "center center"; // Updated to match CSS
  }

  // 2. Padding Style (only if not full screen)
  const paddingStyle: React.CSSProperties = !fullScreen
    ? {
        paddingTop: `${paddingTop}rem`,
        paddingBottom: `${paddingBottom}rem`,
      }
    : {};

  // 3. Overlay Style
  const actualOverlayOpacity = bg.type === 'color' ? 0 : overlayOpacity;
  
  const overlayStyle: React.CSSProperties =
    overlay && bg.type !== "color"
      ? {
          backgroundColor: overlayColor,
          opacity: actualOverlayOpacity,
        }
      : {};


  // --- Tailwind Classes ---

  const sectionClasses = [
    "relative flex",
    getVerticalAlignClasses(verticalAlign),
    fullScreen ? "min-h-screen" : "",
    // Apply container/full-width class
    fullWidth ? "w-full" : "container mx-auto",
  ].join(" ");
  
  const contentContainerClasses = fullWidth ? "w-full" : "container mx-auto";
  
  const rowClasses = [
    "row", // Custom class for old CSS, though we use flex below
    "flex w-full",
    getHorizontalAlignClasses(horizontalAlign),
    // Apply alignment for mobile (from CSS: always center on mobile)
    "max-md:justify-center max-md:items-center",
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
          {fallBackImage && (
            // Fallback Image element
            <div
              style={{
                backgroundImage: `url(${fallBackImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
              className="absolute top-0 left-0 w-full h-full z-0"
            />
          )}
        </>
      )}

      {/* 5. Overlay */}
      {overlay && bg.type !== "color" && (
        <div className="absolute inset-0 z-10" style={overlayStyle} />
      )}

      {/* 6. Content Container */}
      <div className={`relative ${contentContainerClasses} z-20`}>
        <div className={rowClasses}>
          <div
            className={`content-wrap ${getContentWidthClasses(contentWidth)} px-4 md:px-12 py-8`}
          >
            {/* Title */}
            {showTitle && (
              <h1 className="text-center font-extrabold mb-4 text-5xl leading-tight drop-shadow-lg"
                 // Use inline style for the specific title color (#FFCDB2)
                 style={{ color: "#FFCDB2" }} 
              >
                {title}
              </h1>
            )}

            {/* Subtitle */}
            {showSubtitle && (
              <h2 className="text-center font-semibold mb-4 text-3xl drop-shadow-lg"
                  // Use inline style for the specific subtitle color (#FFCDB2)
                  style={{ color: "#FFCDB2" }}
              >
                {subtitle}
              </h2>
            )}
           
            {/* Text */}
            {showText && (
              <p className="text-center mb-4 text-lg text-white">
                {text}
              </p>
            )}

            {/* Buttons */}
            {showButtons && (
              <div className="text-center">
                <a
                  className="inline-block mt-2 px-6 py-3 border border-white text-white bg-transparent hover:bg-white hover:text-black transition rounded-lg"
                  href={buttonUrl}
                >
                  {buttonText}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header18;