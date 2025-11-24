
// components/Gallery07.tsx

"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

// --- Data Structure ---

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
}

const GALLERY_IMAGES: GalleryItem[] = [
  { id: 1, src: "https://r.mobirisesite.com/2046818/assets/images/photo-1496096265110-f83ad7f96608.jpeg", alt: "Abstract Light Stripes" },
  { id: 2, src: "https://r.mobirisesite.com/2046818/assets/images/photo-1488229297570-58520851e868.jpeg", alt: "Data Points in a Server Room" },
  { id: 3, src: "https://r.mobirisesite.com/2046818/assets/images/photo-1534777410147-084a460870fc.jpeg", alt: "Blue and Pink Abstract Geometric Light" },
  { id: 4, src: "https://r.mobirisesite.com/2046818/assets/images/photo-1606778303039-9fc1488b1d8a.jpeg", alt: "Neon Shapes and Bokeh" },
  // Duplicate for seamless scrolling (essential for the infinite loop effect)
  { id: 5, src: "https://r.risesite.com/2046818/assets/images/photo-1496096265110-f83ad7f96608.jpeg", alt: "Abstract Light Stripes Copy" },
  { id: 6, src: "https://r.risesite.com/2046818/assets/images/photo-1488229297570-58520851e868.jpeg", alt: "Data Points in a Server Room Copy" },
  { id: 7, src: "https://r.risesite.com/2046818/assets/images/photo-1534777410147-084a460870fc.jpeg", alt: "Blue and Pink Abstract Geometric Light Copy" },
  { id: 8, src: "https://r.risesite.com/2046818/assets/images/photo-1606778303039-9fc1488b1d8a.jpeg", alt: "Neon Shapes and Bokeh Copy" },
];

// --- Interfaces ---

interface BackgroundProps {
  type: "image" | "color";
  value: string;
}

interface Gallery07Props {
  paddingTop?: number;
  paddingBottom?: number;
  showTitle?: boolean;
  showSubtitle?: boolean;
  spacing?: boolean;
  movingLeft?: boolean; // Controls direction (true for moving left)
  bg: BackgroundProps;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

// --- Main Component ---

export const Gallery07: React.FC<Gallery07Props> = ({
  paddingTop = 6,
  paddingBottom = 6,
  showTitle = true,
  showSubtitle = false,
  spacing = true,
  movingLeft = true, // Default to moving left based on HTML
  bg = { type: "color", value: "#ffffff" },
  overlay = false,
  overlayColor = "#edefeb",
  overlayOpacity = 0.6,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  
  // 1. Dynamic Section Style
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
    overlay && bg.type === "image"
      ? {
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }
      : {};

  // 3. Spacing Classes (Tailwind replication of LESS)
  // Tailwind handles column-gap with `gap-x-*` and row-gap with `gap-y-*`
  const gapXClass = spacing ? "gap-x-8 md:gap-x-4" : "gap-x-0"; // 2rem / 1rem
  const gapYClass = spacing ? "gap-y-8 md:gap-y-4" : "gap-y-0"; // 2rem / 1rem

  // 4. Scrolling Logic (requestAnimationFrame loop)
  const animateScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const totalWidth = scrollRef.current.scrollWidth / 2; // Only half, since we duplicated the items
    const scrollSpeed = movingLeft ? 0.3 : -0.3; // Speed in pixels per frame

    setTranslateX((prevX) => {
      let nextX = prevX + scrollSpeed;

      // Reset scroll position to create the infinite loop effect
      if (movingLeft && nextX <= -totalWidth) {
        return 0;
      }
      if (!movingLeft && nextX >= 0) {
        return -totalWidth;
      }
      return nextX;
    });

    requestAnimationFrame(animateScroll);
  }, [movingLeft]);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [animateScroll]);


  return (
    <section 
      className="relative gallery07" 
      style={sectionStyle}
    >
      {/* Overlay */}
      {overlay && bg.type === "image" && (
        <div className="absolute inset-0 z-10" style={overlayStyle} />
      )}

      {/* Main Content (Title/Subtitle) */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="row justify-center">
          <div className="w-full max-w-2xl content-head mx-auto">
            {(showTitle || showSubtitle) && (
              <div className="mb-12">
                {showTitle && (
                  <h4 className="text-4xl font-extrabold text-center mb-0 text-black">
                    **Inspiring Creations**
                  </h4>
                )}
                {showSubtitle && (
                  <h5 className="text-base text-center mb-0 mt-4 text-black">
                    Publish your site or preview it to see how the slider works in action.
                  </h5>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Wrapper (The scrolling area) */}
      {/* overflow: hidden is crucial here, and width should accommodate the translated element */}
      <div className="container-fluid gallery-wrapper overflow-hidden relative z-20">
        <div className="grid-container max-w-full">
          {/* The scrolling element: grid-container-3 */}
          <div
            ref={scrollRef}
            className={`grid-container-3 flex flex-nowrap ${gapXClass} ${gapYClass} will-change-transform`}
            style={{
                // Custom translation handling the continuous scroll
                transform: `translateX(${translateX}px)`,
                // Set the element to be twice the size of the original content to allow for seamless loop
                width: `${GALLERY_IMAGES.length / 2 * 30}vw`, // Use calculated width based on items/vw
            }}
          >
            {/* Render the images (duplicated once for infinite scroll effect) */}
            {GALLERY_IMAGES.map((item, index) => (
              <div
                key={index} // Using index as key since IDs are duplicated
                className="grid-item flex-shrink-0 flex justify-center items-center rounded-xl overflow-hidden shadow-xl"
                style={{
                    // Explicit width calculation based on CSS/LESS for item size
                    minWidth: '35vw', // Mobile min-width: 35vw
                    width: '30vw', // Desktop min-width: 30vw
                    height: 'auto',
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery07;