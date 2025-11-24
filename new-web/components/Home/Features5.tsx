// components/Features5.tsx

"use client";
import React from "react";
// Assuming you have a standard icon library or use a component for the icon slot
// For the demo, we'll use a placeholder or generic icon styling.

// --- Data Structure ---

interface SolutionCard {
  title: string;
  text: string;
  iconClass?: string; // Class for the icon (e.g., 'mobi-mbri-idea')
  buttonUrl?: string;
}

const SOLUTIONS_DATA: SolutionCard[] = [
  {
    title: "Simplicity",
    text: "Designs that are easy to use, without sacrificing power.",
    iconClass: "mobi-mbri-idea",
  },
  {
    title: "Security",
    text: "Protecting your data with top-tier security measures.",
    iconClass: "mobi-mbri-shield", // Placeholder icon class
  },
  {
    title: "Performance",
    text: "Experience unmatched speed and dependable operation.",
    iconClass: "mobi-mbri-speed", // Placeholder icon class
  },
];


// --- Interfaces ---

interface BackgroundProps {
    type: "image" | "video" | "color";
    value: string;
}

interface Features5Props {
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  showMainTitle?: boolean;
  showMainSubtitle?: boolean;
  showTitle?: boolean; // Card Title
  showText?: boolean; // Card Text
  showIcon?: boolean;
  showButtons?: boolean;
  iconColor?: string;
  iconbg?: string;
  columns?: 3 | 4 | 6 | 12; // 3 is default (lg:w-1/3)
  cardbg?: string;
  bg: BackgroundProps;
  transparentBg?: boolean;
  fallBackImage?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

// --- Helper Functions ---

// Maps columns prop (Bootstrap size) to Tailwind width classes
function getColumnClasses(columns: number = 4): string {
    // col-12 col-md-6 is the base for mobile/tablet. We map the 'columns' to col-lg-*
    if (columns === 12) return "lg:w-full";
    if (columns === 6) return "lg:w-1/2";
    if (columns === 4) return "lg:w-1/3";
    if (columns === 3) return "lg:w-1/4";
    return "lg:w-1/3"; // Default to 3 columns
}


// --- Main Component ---

export const Features5: React.FC<Features5Props> = ({
  fullWidth = false,
  paddingTop = 5,
  paddingBottom = 3,
  showMainTitle = true,
  showMainSubtitle = false,
  showTitle = true,
  showText = true,
  showIcon = false, // Set to false based on video (no visible icons)
  showButtons = false,
  iconColor = "#2e481a",
  iconbg = "#9fe870",
  columns = 4,
  cardbg = "#ffffff",
  bg = { type: "color", value: "#edefeb" },
  transparentBg = true,
  fallBackImage = "/_images/background1.jpg",
  overlay = true,
  overlayColor = "#ffffff",
  overlayOpacity = 0.5,
}) => {
  
  // 1. Dynamic Section Style (Background and Padding)
  const sectionStyle: React.CSSProperties = {
    paddingTop: `${paddingTop}rem`,
    paddingBottom: `${paddingBottom}rem`,
  };
  
  // Set background color, handling transparency
  if (bg.type === "color") {
    sectionStyle.backgroundColor = transparentBg ? "transparent" : bg.value;
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

  // 3. Card Wrapper Styling
  const cardWrapperClasses = [
    "item-wrapper",
    "p-9", // padding: 2.25rem
    "h-full",
    "flex",
    "flex-col",
    "rounded-lg",
    "shadow-md", // Add a subtle shadow for definition against a white/light background
    // Responsive padding based on LESS
    "lg:px-6 lg:py-8", // 2rem top/bottom, 1.5rem left/right for 992px - 1200px
    "max-md:px-6 max-md:py-8", // 2rem top/bottom, 1.5rem left/right for max-width 767px
  ].join(" ");
  
  // Apply dynamic background color to card wrapper style
  const cardWrapperStyle: React.CSSProperties = {
      backgroundColor: cardbg,
  };
  
  // 4. Icon Wrapper Styling
  const iconWrapperStyle: React.CSSProperties = {
      color: iconColor,
      backgroundColor: iconbg,
      width: '80px',
      height: '80px',
      fontSize: '3rem',
  };


  return (
    <section 
      className="relative features5" 
      style={sectionStyle}
    >
      {/* Background Video/Image and Fallback (Reusing logic) */}
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
        
        {/* Title and Subtitle */}
        {(showMainTitle || showMainSubtitle) && (
          <div className="row mb-12 flex justify-center">
            <div className="w-full max-w-2xl content-head text-center">
              {showMainTitle && (
                <h3 className="text-4xl font-extrabold mb-0 text-black">
                  **AI Powered Solutions**
                </h3>
              )}
              {showMainSubtitle && (
                <h5 className="text-base mt-4 mb-0 text-black">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
                  vitae erat. Integer aliquam, lorem vitae dapibus sollicitudin, nibh
                  nisl egestas enim, ut dapibus odio augue tempus venenatis mi semper.
                </h5>
              )}
            </div>
          </div>
        )}

        {/* Solutions Grid */}
        <div className="row flex flex-wrap -mx-4">
          {SOLUTIONS_DATA.map((solution, index) => (
            <div
              key={index}
              className={`item features-without-image w-full px-4 col-md-6 ${getColumnClasses(columns)} item-mb mb-8 max-md:mb-4`}
            >
              <div className={cardWrapperClasses} style={cardWrapperStyle}>
                <div className="card-box text-left flex flex-col h-full">
                  
                  {/* Icon */}
                  {showIcon && (
                    <div className="iconfont-wrapper flex justify-center items-center rounded-full mx-auto mb-4" style={iconWrapperStyle}>
                      {/* Placeholder for actual icon component */}
                      <span className={`mbr-iconfont ${solution.iconClass || 'mobi-mbri-idea'}`}></span>
                    </div>
                  )}
                  
                  {/* Title */}
                  {showTitle && (
                    <h5 className="card-title text-2xl font-bold text-center mb-3 text-black">
                      **{solution.title}**
                    </h5>
                  )}
                  
                  {/* Text */}
                  {showText && (
                    <p className="card-text text-base text-center mb-4 text-black">
                      {solution.text}
                    </p>
                  )}
                  
                  {/* Button */}
                  {showButtons && (
                    <div className="mbr-section-btn item-footer mt-auto text-center">
                      <a href={solution.buttonUrl || "#"} className="btn item-btn bg-red-600 text-white py-2 px-5 rounded-lg hover:bg-red-700 transition-colors">
                        Learn More
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features5;