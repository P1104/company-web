// components/Pricing1.tsx

"use client";
import React from "react";

// --- Data Structure ---

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  buttonUrl: string;
}

const PLANS_DATA: PricingPlan[] = [
  { name: "Basic", price: "19/mo", description: "Ideal for individuals starting out. Get essential features.", buttonUrl: "#basic" },
  { name: "Pro", price: "49/mo", description: "Perfect for growing businesses. Access advanced tools.", buttonUrl: "#pro" },
  { name: "Premium", price: "99/mo", description: "For established enterprises. Full suite of capabilities.", buttonUrl: "#premium" },
  { name: "Enterprise", price: "249/mo", description: "Custom solutions for large organizations. Maximum support.", buttonUrl: "#enterprise" },
];


// --- Interfaces ---

interface BackgroundProps {
    type: "image" | "color";
    value: string;
}

interface Pricing1Props {
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  showTitle?: boolean; // Main Title
  showSubtitle?: boolean; // Main Subtitle
  columns?: 3 | 4 | 6; // 3 is default (lg:w-1/4) in HTML snippet
  showCardTitle?: boolean;
  showCardSubtitle?: boolean; // Price
  showText?: boolean; // Description
  showButtons?: boolean;
  cardsHeadColor?: string; // Corresponds to @primaryColor
  cardsBg?: string; // Corresponds to @cardsBg
  bg: BackgroundProps;
  transparentBg?: boolean;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

// --- Helper Functions ---

// Maps columns prop (Bootstrap size) to Tailwind width classes
function getColumnClasses(columns: number = 3): string {
    // col-12 col-md-6 is the base for mobile/tablet. We map the 'columns' to col-lg-*
    if (columns === 6) return "lg:w-1/2";
    if (columns === 4) return "lg:w-1/3";
    if (columns === 3) return "lg:w-1/4";
    return "lg:w-1/4"; // Default to 4 columns
}


// --- Main Component ---

export const Pricing1: React.FC<Pricing1Props> = ({
  fullWidth = true,
  paddingTop = 5,
  paddingBottom = 4,
  showTitle = true,
  showSubtitle = false,
  columns = 3,
  showCardTitle = true,
  showCardSubtitle = true,
  showText = true,
  showButtons = true,
  cardsHeadColor = "#FFCDB2", // Pink/Red Placeholder
  cardsBg = "#ffffff",
  bg = { type: "color", value: "#edefeb" },
  transparentBg = true,
  overlay = true,
  overlayColor = "#ffffff",
  overlayOpacity = 0.5,
}) => {
  
  // 1. Dynamic Section Style (Background and Padding)
  const sectionStyle: React.CSSProperties = {
    paddingTop: `${paddingTop}rem`,
    paddingBottom: `${paddingBottom}rem`,
  };
  
  if (bg.type === "color") {
    sectionStyle.backgroundColor = transparentBg ? "transparent" : bg.value;
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

  // 3. Card Wrapper Styling (Includes border-radius: 2rem and overflow: hidden)
  const itemWrapperClasses = [
    "item-wrapper",
    "rounded-[2rem]", // border-radius: 2rem
    "overflow-hidden",
    "p-0",
    "h-full",
    "flex",
    "flex-col",
    "mb-8", // margin-bottom: 2rem
    "max-md:mb-4", // margin-bottom: 1rem (max-width 767px)
  ].join(" ");

  // 4. Card Head Styling (Background color, text color, and responsive padding)
  const itemHeadClasses = [
    "item-head",
    "p-9", // 2.25rem (default)
    "lg:px-6 lg:py-8", // 2rem top/bottom, 1.5rem left/right for 992px - 1200px
    "max-md:px-6 max-md:py-8", // 2rem top/bottom, 1.5rem left/right for max-width 767px
    "mb-8", // margin-bottom: 2rem (max-width 1200px)
  ].join(" ");

  // 5. Item Content Padding (Responsive logic)
  const itemContentClasses = [
    "item-content",
    "px-9", // 2.25rem (default)
    "py-9", // padding-top: 2.25rem (default)
    "lg:px-6 lg:py-0", // 0rem top/bottom, 1.5rem left/right (992px-1200px)
    "max-md:px-6 max-md:py-0", // 0rem top/bottom, 1.5rem left/right (max-width 767px)
  ].join(" ");

  // 6. Footer Padding (Responsive logic)
  const itemFooterClasses = [
    "mbr-section-btn item-footer",
    "mt-auto", // margin-top: auto !important
    "p-8", // 2rem (default)
    "lg:px-6 lg:pb-8 lg:pt-0", // 0rem top, 1.5rem left/right, 2rem bottom (992px-1200px)
    "max-lg:px-9 max-lg:pb-8 max-lg:pt-0", // 0rem top, 2.25rem left/right, 2rem bottom (max-width 991px)
    "max-md:px-6 max-md:pb-4 max-md:pt-0", // 0rem top, 1.5rem left/right, 1rem bottom (max-width 767px)
  ].join(" ");
  

  return (
    <section 
      className="relative pricing1" 
      style={sectionStyle}
    >
      {/* Overlay */}
      {overlay && bg.type === "image" && (
        <div className="absolute inset-0 z-10" style={overlayStyle} />
      )}

      {/* Content Container */}
      <div className={`relative z-20 ${fullWidth ? "container-fluid" : "container mx-auto"}`}>
        
        {/* Main Title and Subtitle */}
        <div className="row justify-center">
            <div className="col-12 w-full max-w-2xl content-head text-center">
                {(showTitle || showSubtitle) && (
                    <div className="mb-12">
                        {showTitle && (
                            <h4 className="text-4xl font-extrabold mb-0 text-black">
                                **Flexible Plans**
                            </h4>
                        )}
                        {showSubtitle && (
                            <h5 className="text-base mt-4 mb-0 text-white"> 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </h5>
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* Pricing Grid */}
        <div className="row flex flex-wrap justify-center -mx-4">
          {PLANS_DATA.map((plan, index) => (
            <div
              key={index}
              className={`item features-without-image w-full px-4 col-md-6 ${getColumnClasses(columns)}`}
            >
              <div 
                className={itemWrapperClasses} 
                style={{backgroundColor: cardsBg, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
              >
                
                {/* Item Head (Title and Price) */}
                <div 
                  className={itemHeadClasses} 
                  style={{backgroundColor: cardsHeadColor}}
                >
                    {showCardTitle && (
                        <h5 className="item-title text-3xl font-bold mb-3 text-left" style={{color: 'white'}}>
                            **{plan.name}**
                        </h5>
                    )}
                    {showCardSubtitle && (
                        <h6 className="item-subtitle text-xl mt-0 mb-0 font-bold text-left" style={{color: 'white'}}>
                            **{plan.price.split('/')[0]}**/mo
                        </h6>
                    )}
                </div>
                
                {/* Item Content (Description) */}
                <div 
                  className={itemContentClasses}
                  style={{ backgroundColor: cardsBg }}
                >
                    {showText && (
                        <p className="mbr-text text-base text-left mb-4 text-black">
                            {plan.description}
                        </p>
                    )}
                </div>
                
                {/* Item Footer (Button) */}
                <div 
                  className={itemFooterClasses} 
                  style={{ backgroundColor: cardsBg }}
                >
                    {showButtons && (
                        <a href={plan.buttonUrl} className="btn item-btn bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition w-full">
                            Get Started
                        </a>
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

export default Pricing1;