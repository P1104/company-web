// components/Clients04.tsx

import React from "react";
import Image from "next/image"; // Use Next.js Image for optimization

// --- Data Structure ---

interface ClientLogo {
  id: number;
  src: string;
  alt: string;
  title?: string;
}

// Example data based on the provided HTML snippet
const CLIENT_LOGOS: ClientLogo[] = [
  { id: 1, src: "https://r.mobirisesite.com/2046818/assets/images/photo-1579041925709-798d7d0fed1d.jpeg", alt: "Recharge Logo", title: "Recharge" },
  { id: 2, src: "https://r.mobirisesite.com/2046818/assets/images/photo-1606136968306-ab2868cc1f21.jpeg", alt: "Border Logo", title: "Border" },
  { id: 3, src: "https://r.mobirisesite.com/2046818/assets/images/photo-1617727553252-65863c156eb0.jpeg", alt: "Snowflake Logo", title: "Snowflake" },
  { id: 4, src: "https://r.mobirisesite.com/2046818/assets/images/photo-1596622723231-b20320c7346b.jpeg", alt: "Sitemark Logo", title: "Sitemark" },
  { id: 5, src: "https://r.mobirisesite.com/2046818/assets/images/photo-1651853082689-706323a31427.jpeg", alt: "Inspire Logo", title: "Inspire" },
  { id: 6, src: "https://r.mobirisesite.com/2046818/assets/images/photo-1651044450619-5ce74d316987.jpeg", alt: "Minty Logo", title: "Minty" },
];


// --- Interfaces ---

interface BackgroundProps {
    type: "image" | "color"; // Simplified as video option is not present here
    value: string;
}

interface Clients04Props {
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  cardsWidth?: 2 | 3 | 4 | 6 | 12; // Corresponding to col-lg-* in Bootstrap
  showTitle?: boolean;
  showSubtitle?: boolean;
  spacing?: boolean; // Control gutter between cards
  showCardTitle?: boolean;
  grayscale?: boolean;
  bg: BackgroundProps;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

// --- Helper Functions ---

// Maps prop to Tailwind column width classes (for desktop/lg screens)
function getColumnClasses(cardsWidth: number = 2): string {
  // col-12 col-md-6 col-sm-6 is the default for mobile/tablet in the HTML.
  // We only change the col-lg-* class based on cardsWidth
  if (cardsWidth === 12) return "lg:w-full";
  if (cardsWidth === 6) return "lg:w-1/2";
  if (cardsWidth === 4) return "lg:w-1/3";
  if (cardsWidth === 3) return "lg:w-1/4";
  if (cardsWidth === 2) return "lg:w-1/6";
  return "lg:w-1/6"; // Default to 6 columns
}

// --- Main Component ---

export const Clients04: React.FC<Clients04Props> = ({
  fullWidth = true,
  paddingTop = 5,
  paddingBottom = 5,
  cardsWidth = 2,
  showTitle = true,
  showSubtitle = false,
  spacing = true,
  showCardTitle = false,
  grayscale = true,
  bg = { type: "color", value: "#ffffff" },
  overlay = false,
  overlayColor = "#edefeb",
  overlayOpacity = 0.6,
}) => {
  
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

  // 3. Spacing Logic
  // The LESS sets row margin to 0 and item padding/margin to 0 when spacing is false.
  // When spacing is true, default Tailwind/Bootstrap spacing is used.
  const rowGutterClass = spacing ? "gap-y-8" : "m-0";
  const itemPaddingClass = spacing ? "" : "p-0";
  const itemMarginClass = spacing ? "mb-8 md:mb-4 max-sm:mb-2" : "m-0";


  return (
    <section 
      className="relative clients04" 
      style={sectionStyle}
    >
      {/* Overlay */}
      {overlay && bg.type === "image" && (
        <div className="absolute inset-0 z-10" style={overlayStyle} />
      )}

      {/* Content Container */}
      <div className={`relative z-20 ${fullWidth ? "container-fluid" : "container mx-auto"}`}>
        
        {/* Title and Subtitle */}
        {(showTitle || showSubtitle) && (
          <div className="row justify-center mb-12">
            <div className="w-full max-w-2xl content-head">
              <div className="text-center">
                {showTitle && (
                  <h4 className="text-4xl font-extrabold mb-0 text-black">
                    **Trusted Partners**
                  </h4>
                )}
                {showSubtitle && (
                  <h5 className="text-sm mt-4 mb-0 text-black">
                    To add more cards, hover on a card and click 'Add items'.
                  </h5>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Logo Grid */}
        <div className={`row flex flex-wrap justify-center ${rowGutterClass}`}>
          {CLIENT_LOGOS.map((client) => (
            <div
              key={client.id}
              // Base classes: col-12, col-md-6, col-sm-6 (w-full, md:w-1/2)
              className={`item w-full sm:w-1/2 md:w-1/2 ${getColumnClasses(cardsWidth)} ${itemPaddingClass} ${itemMarginClass}`}
            >
              <div className="item-wrapper relative flex flex-col h-full rounded-md">
                
                {/* Logo Image */}
                <div className="w-full">
                  <Image
                    src={client.src}
                    alt={client.alt}
                    // Apply grayscale filter conditionally
                    className={grayscale ? "filter grayscale" : ""}
                    width={200} // Placeholder width for layout calculation
                    height={100} // Placeholder height
                    layout="responsive"
                    objectFit="contain" // Ensures logos scale correctly
                  />
                </div>
                
                {/* Logo Title */}
                {showCardTitle && (
                  <div className="item-content text-left mt-3">
                    <h5 className="item-title text-center text-base font-medium mb-3 text-black">
                      {client.title}
                    </h5>
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

export default Clients04;