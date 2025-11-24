// components/Features03.tsx

import React from "react";
import Image from "next/image";

// --- Data Structure ---

interface UpdateCard {
  title: string;
  date: string;
  summary: string;
  imageSrc: string;
  linkUrl: string;
}

const UPDATES_DATA: UpdateCard[] = [
  {
    title: "AI Breakthrough Announced",
    date: "November 20, 2025",
    summary: "We've made a significant advancement in AI technology, setting new industry standards.",
    imageSrc: "https://r.mobirisesite.com/2046818/assets/images/photo-1675334758735-5f989ff8237f.jpeg",
    linkUrl: "#breakthrough",
  },
  {
    title: "New Product Launch",
    date: "November 15, 2025",
    summary: "Introducing our latest product, designed to simplify complex tasks with AI.",
    imageSrc: "https://r.mobirisesite.com/2046818/assets/images/photo-1618005182384-a83a8bd57fbe.jpeg",
    linkUrl: "#launch",
  },
  {
    title: "Security Enhancements",
    date: "November 10, 2025",
    summary: "We've implemented advanced security measures to further protect user data.",
    imageSrc: "https://r.mobirisesite.com/2046818/assets/images/photo-1669295384050-a1d4357bd1d7.jpeg",
    linkUrl: "#security",
  },
  {
    title: "Performance Boost",
    date: "November 5, 2025",
    summary: "Our systems now offer even greater speed and reliability for all users.",
    imageSrc: "https://r.mobirisesite.com/2046818/assets/images/photo-1604011237320-8e0506614fdf.jpeg",
    linkUrl: "#performance",
  },
];


// --- Interfaces ---

interface BackgroundProps {
    type: "image" | "color";
    value: string;
}

interface Features03Props {
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  cardsWidth?: 3 | 4 | 6 | 12; // 3 is default (lg:w-1/4)
  showTitle?: boolean; // Main Title
  showSubtitle?: boolean; // Main Subtitle
  autoSize?: boolean;
  imageHeight?: number; // In units of 100px (e.g., 4 = 400px)
  spacing?: boolean;
  showCardTitle?: boolean;
  showText?: boolean;
  showButtons?: boolean;
  bg: BackgroundProps;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}


// --- Helper Functions ---

// Maps cardsWidth prop (Bootstrap size) to Tailwind width classes
function getColumnClasses(cardsWidth: number = 3): string {
    // col-12 col-md-6 is the base for mobile/tablet. We map the 'cardsWidth' to col-lg-*
    if (cardsWidth === 12) return "lg:w-full";
    if (cardsWidth === 6) return "lg:w-1/2";
    if (cardsWidth === 4) return "lg:w-1/3";
    if (cardsWidth === 3) return "lg:w-1/4";
    return "lg:w-1/4"; // Default to 4 columns
}


// --- Main Component ---

export const Features03: React.FC<Features03Props> = ({
  fullWidth = true,
  paddingTop = 6,
  paddingBottom = 6,
  cardsWidth = 3,
  showTitle = true,
  showSubtitle = false,
  autoSize = true,
  imageHeight = 4,
  spacing = true,
  showCardTitle = true,
  showText = true,
  showButtons = true,
  bg = { type: "color", value: "#ffffff" },
  overlay = false,
  overlayColor = "#edefeb",
  overlayOpacity = 0.6,
}) => {
  
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
    overlay && bg.type === "image"
      ? {
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }
      : {};

  // 3. Image Sizing Logic (Conditional Height based on LESS)
  const imageStyle: React.CSSProperties = {
      // Base style: width: 100%, object-fit: cover
      width: '100%',
      objectFit: 'cover',
  };

  // LESS: & when (@autoSize) { ... }
  if (autoSize && (showCardTitle || showText || showButtons)) {
      // LESS: height: (@imageHeight * 100px);
      imageStyle.height = `${imageHeight * 100}px`;
  }
  
  // 4. Spacing Logic
  const rowGutterClass = spacing ? "" : "m-0";
  const itemPaddingClass = spacing ? "px-4" : "p-0";
  const itemMarginClass = spacing ? "mb-8 max-md:mb-4" : "m-0";


  return (
    <section 
      className={`relative features03 ${fullWidth ? "w-full" : ""}`} 
      style={sectionStyle}
    >
      {/* Overlay */}
      {overlay && bg.type === "image" && (
        <div className="absolute inset-0 z-10" style={overlayStyle} />
      )}

      {/* Content Container */}
      <div className={`relative z-20 ${fullWidth ? "container-fluid" : "container mx-auto"}`}>
        
        {/* Main Title and Subtitle */}
        <div className="row justify-center mb-12">
            <div className="col-12 w-full max-w-2xl content-head text-center mx-auto">
                {(showTitle || showSubtitle) && (
                    <div className="mbr-section-head">
                        {showTitle && (
                            <h4 className="text-4xl font-extrabold mb-0 text-gray-900">
                                **Latest Updates**
                            </h4>
                        )}
                        {showSubtitle && (
                            <h5 className="text-base mt-4 mb-0 text-gray-900">
                                To add more cards, hover on a card and click 'Add items'
                            </h5>
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* Updates Grid */}
        <div className={`row flex flex-wrap ${rowGutterClass}`}>
          {UPDATES_DATA.map((update, index) => (
            <div
              key={index}
              className={`item features-image w-full col-md-6 ${getColumnClasses(cardsWidth)} ${itemPaddingClass} ${itemMarginClass}`}
            >
              <div className="item-wrapper h-full flex flex-col rounded-lg overflow-hidden shadow-md">
                
                {/* Image */}
                <div className="item-img mb-3 w-full">
                  <Image
                    src={update.imageSrc}
                    alt={update.title}
                    width={400} // Placeholder width for Next.js Image
                    height={400} // Placeholder height
                    className="w-full"
                    style={imageStyle} // Apply conditional height and object-fit
                  />
                </div>
                
                {/* Content */}
                {(showCardTitle || showText || showButtons) && (
                    <div className="item-content p-4 text-left flex flex-col flex-grow">
                        
                        {/* Title */}
                        {showCardTitle && (
                            <h5 className="item-title text-xl font-bold mt-0 mb-2 text-gray-900">
                                **{update.title}**
                            </h5>
                        )}
                        
                        {/* Date (First Text block) */}
                        {showText && (
                            <p className="mbr-text text-sm mb-3 text-red-600 font-semibold">
                                {update.date}
                            </p>
                        )}

                        {/* Summary (Second Text block) */}
                        {showText && (
                            <p className="mbr-text text-base mb-3 text-gray-700">
                                {update.summary}
                            </p>
                        )}
                        
                        {/* Button */}
                        {showButtons && (
                            <div className="mbr-section-btn item-footer mt-auto pt-2">
                                <a href={update.linkUrl} className="btn item-btn bg-red-600 text-white py-2 px-5 rounded-lg hover:bg-red-700 transition">
                                    Read
                                </a>
                            </div>
                        )}
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features03;