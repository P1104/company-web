// components/Article05.tsx

"use client";
import React from "react";
import Image from "next/image";

// --- Interfaces ---

interface BackgroundProps {
    type: "image" | "video" | "color";
    value: string;
}

interface Article05Props {
  fullScreen?: boolean;
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  imageHeight?: number; // In units of 100px (e.g., 6 = 600px)
  imageWidth?: 4 | 5 | 6 | 7 | 8; // Corresponds to col-lg-* width
  reverseContent?: boolean;
  showTitle?: boolean;
  showText?: boolean;
  showButtons?: boolean;
  rowColor?: string;
  bg: BackgroundProps;
  transparentBg?: boolean;
  fallBackImage?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}


// --- Helper Functions ---

// Maps imageWidth prop (Bootstrap size) to Tailwind width classes
function getImageWidthClasses(imageWidth: number = 5): string {
    // Tailwind classes are based on 12-column grid: w-5/12, w-6/12, etc.
    if (imageWidth === 8) return "lg:w-8/12";
    if (imageWidth === 7) return "lg:w-7/12";
    if (imageWidth === 6) return "lg:w-6/12";
    if (imageWidth === 5) return "lg:w-5/12";
    if (imageWidth === 4) return "lg:w-4/12";
    return "lg:w-5/12";
}


// --- Main Component ---

export const Article05: React.FC<Article05Props> = ({
  fullScreen = false,
  fullWidth = false,
  paddingTop = 5,
  paddingBottom = 5,
  imageHeight = 6,
  imageWidth = 5,
  reverseContent = true,
  showTitle = true,
  showText = true,
  showButtons = false,
  rowColor = "#ffffff",
  bg = { type: "color", value: "#2e481a" },
  transparentBg = true,
  fallBackImage = "/_images/background1.jpg",
  overlay = false,
  overlayColor = "#ffffff",
  overlayOpacity = 0.8,
}) => {
  
  // 1. Dynamic Section Style (Background and Padding)
  const sectionStyle: React.CSSProperties = {
    // LESS: overflow: hidden implicitly used by card-wrapper
  };
  
  // Set background color, handling transparency (LESS logic)
  if (bg.type === "color") {
    sectionStyle.backgroundColor = transparentBg ? "transparent" : bg.value;
  } else if (bg.type === "image") {
    sectionStyle.backgroundImage = `url(${bg.value})`;
    sectionStyle.backgroundSize = "cover";
    sectionStyle.backgroundPosition = "center center";
  }

  // Padding (LESS logic)
  if (!fullScreen) {
    sectionStyle.paddingTop = `${paddingTop}rem`;
    sectionStyle.paddingBottom = `${paddingBottom}rem`;
  }

  // 2. Overlay Style
  const overlayStyle: React.CSSProperties =
    overlay && bg.type !== "color"
      ? {
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }
      : {};
      
  // 3. Image Sizing Style
  const imageStyle: React.CSSProperties = {
      // LESS: height: (@imageHeight * 100px)
      height: `${imageHeight * 100}px`,
      objectFit: 'cover',
  };

  // 4. Card Wrapper/Row Styling
  const cardWrapperClasses = [
    "card-wrapper",
    "overflow-hidden",
    `bg-[${rowColor}]`, // Use direct color for bg
  ].join(" ");
  
  const rowClasses = [
    "row", 
    "flex",
    "justify-center", 
    "items-center",
    // LESS: margin-right: -1rem; margin-left: -1rem; (Use Tailwind negative margin: -mx-4)
    "-mx-4",
    // LESS: flex-direction: row-reverse;
    reverseContent ? "flex-row-reverse" : "flex-row",
  ].join(" ");

  // 5. Text Wrapper Padding (Responsive LESS logic)
  const textWrapperClasses = [
    "text-wrapper",
    "p-16", // 4rem (default)
    "md:p-9", // 2.25rem (768px-991px)
    "max-sm:p-6" // 1.5rem (max-width 767px)
  ].join(" ");
  
  // 6. Image Wrapper Padding (LESS logic)
  const imageWrapperClasses = [
    "image-wrapper",
    "col-12", // Default full width on mobile/tablet
    "col-md-12",
    "px-4", // 1rem padding from LESS (0 1rem)
    getImageWidthClasses(imageWidth),
  ].join(" ");
  
  const textContentClasses = "col-12 col-lg col-md-12"; // Takes remaining width on large screens


  return (
    <section 
      className={`relative article05 ${fullScreen ? "min-h-screen" : ""}`} 
      style={sectionStyle}
    >
      {/* Background Video (Reusing logic) */}
      {bg.type === "video" && (
        <>
          <iframe
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src={bg.value}
            frameBorder={0}
            allow="autoplay; loop; muted"
            allowFullScreen
            style={{ pointerEvents: "none" }}
            title="Background Video"
          />
          {fallBackImage && (
            <div
              style={{ backgroundImage: `url(${fallBackImage})`, backgroundSize: "cover", backgroundPosition: "center center" }}
              className="absolute top-0 left-0 w-full h-full z-0"
            />
          )}
        </>
      )}

      {/* Overlay */}
      {overlay && bg.type !== "color" && (
        <div className="absolute inset-0 z-10" style={overlayStyle} />
      )}

      {/* Content Container */}
      <div className={`relative z-20 ${fullWidth ? "container-fluid" : "container mx-auto"}`}>
        <div className="col-12">
          <div className={cardWrapperClasses} style={{backgroundColor: rowColor}}>
            <div className={rowClasses}>
              
              {/* Image Column */}
              <div className={imageWrapperClasses}>
                <Image
                  src="https://r.mobirisesite.com/2046818/assets/images/photo-1557264337-e8a93017fe92.jpeg"
                  alt="Abstract tech background"
                  className="w-full object-cover max-md:max-h-[350px]"
                  width={600}
                  height={imageHeight * 100}
                  style={imageStyle}
                />
              </div>
              
              {/* Text Column */}
              <div className={textContentClasses}>
                <div className={textWrapperClasses}>
                  
                  {showTitle && (
                    <h1 className="text-4xl font-extrabold mb-4 text-black">
                      **Our Guiding Principles**
                    </h1>
                  )}
                  
                  {showText && (
                    <>
                      <p className="text-base mb-3 text-black">We are driven by a commitment to **Simplicity**, crafting intuitive designs that don't sacrifice power. Our solutions are made to be easily understood and used by everyone.</p>
                      <p className="text-base mb-3 text-black">With a focus on **Security**, we provide enterprise-grade data protection, giving you peace of mind. Your information's safety is our top priority.</p>
                      <p className="text-base text-black">Experience **Performance** like never before, with exceptional speed and unwavering reliability. We ensure our technology works for you, without delay. Our dedication to **Innovation** means we are constantly pushing the boundaries with cutting-edge AI technology, bringing you the future, today.</p>
                    </>
                  )}
                  
                  {showButtons && (
                    <div className="mbr-section-btn mt-6">
                      <a className="btn btn-lg bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition" href="#">Get started</a>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Article05;