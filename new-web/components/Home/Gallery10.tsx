// components/Gallery10.tsx

"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";

// --- Interfaces ---

interface BackgroundProps {
    type: "image" | "color";
    value: string;
}

interface Gallery10Props {
  paddingTop?: number;
  paddingBottom?: number;
  linesTitle?: "title1" | "title2"; // Controls font size
  animatedLine1?: string;
  speed?: number; // Speed multiplier (e.g., 0.05)
  direction?: -1 | 1; // -1 for Left, 1 for Right
  contentColor?: string;
  bg: BackgroundProps;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}


// --- Main Component ---

export const Gallery10: React.FC<Gallery10Props> = ({
  paddingTop = 6,
  paddingBottom = 6,
  linesTitle = "title1",
  animatedLine1 = "Core Values * Simplicity * Security * Performance * Innovation * AI Technology *",
  speed = 0.05,
  direction = -1, // -1 (Left) is the default direction
  contentColor = "#232323",
  bg = { type: "color", value: "#ffffff" },
  overlay = true,
  overlayColor = "#f7f7f7",
  overlayOpacity = 0.8,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);

  // 1. Dynamic Section Style (Background and Padding)
  const sectionStyle: React.CSSProperties = {
    paddingTop: `${paddingTop}rem`,
    paddingBottom: `${paddingBottom}rem`,
  };
  
  if (bg.type === "color") {
    sectionStyle.backgroundColor = bg.value;
  } else if (bg.type === "image") {
    sectionStyle.backgroundImage = `url(${bg.value})`;
    sectionStyle.backgroundSize = "cover";
    sectionStyle.backgroundPosition = "center center";
  }

  // 2. Overlay Style
  const overlayStyle: React.CSSProperties =
    overlay && bg.type !== "color"
      ? {
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }
      : {};

  // 3. Item Text Style (Color and Min-height)
  const itemStyle: React.CSSProperties = {
    color: contentColor,
    fontWeight: 'bold',
    // Minimum height defined in LESS
    minHeight: '90px', 
  };
  
  // Responsive height adjustment from LESS
  const itemClasses = [
    linesTitle === 'title1' ? "text-6xl" : "text-4xl",
    "whitespace-nowrap",
    "flex",
    "items-center",
    "justify-center",
    "max-md:min-h-[45px]", // min-height: @min-height-small = 45px
  ].join(" ");
  
  // 4. Scrolling Logic (requestAnimationFrame loop)
  const animateScroll = useCallback(() => {
    if (!scrollRef.current) return;

    // We need the width of the *single* line of text, not the duplicated container
    // We assume the children inside loop-container are the two duplicated lines.
    const firstItem = scrollRef.current.children[0] as HTMLElement;
    if (!firstItem) return;
    
    // Total scrollable width is the width of one duplicated item
    const scrollWidth = firstItem.offsetWidth;

    // Movement is based on prop: speed * direction (0.05 * -1 = -0.05 px/frame)
    const movement = speed * direction;

    setTranslateX((prevX) => {
      const nextX = prevX + movement;

      if (direction === -1) { // Moving Left
        // Reset when the first item scrolls fully out of view (past -scrollWidth)
        if (nextX <= -scrollWidth) {
          return 0;
        }
      } else { // Moving Right
        // Reset when the translated content returns to the start (past 0)
        if (nextX >= 0) {
          // Reset to the negative width of one item
          return -scrollWidth;
        }
      }
      return nextX;
    });

    requestAnimationFrame(animateScroll);
  }, [speed, direction]);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [animateScroll]);
  
  
  // The content needs to be duplicated to ensure seamless looping.
  const contentToRepeat = (
      // The content inside the item element. We include a separator for clear visual distinction.
      `${animatedLine1} ${animatedLine1} ${animatedLine1} * ` 
  );

  return (
    <section 
      className="relative gallery10 overflow-hidden" 
      style={sectionStyle}
    >
      {/* Overlay */}
      {overlay && bg.type !== "color" && (
        <div className="absolute inset-0 z-10" style={overlayStyle} />
      )}

      {/* Content Container (container-fluid) */}
      <div className="relative z-20 container-fluid overflow-hidden p-0">

        <div 
            className="loop-container flex" 
            ref={scrollRef}
            style={{ 
                // We use flex to keep items inline. We apply the transform here.
                transform: `translateX(${translateX}px)`,
                willChange: 'transform',
                // This makes the container wide enough to hold the repeated text lines
                width: 'fit-content',
            }}
        >
          {/* Duplicated Items for seamless loop */}
          {/* We repeat the content many times to ensure seamless infinite scrolling */}
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className={itemClasses}
              style={itemStyle}
              // Data attribute replicated for fidelity, though not used in JS logic
              data-linewords={animatedLine1} 
              data-direction={direction} 
              data-speed={speed}
            >
              {/* NOTE: We duplicate the content string directly here to ensure the full width is calculated */}
              {contentToRepeat}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery10;