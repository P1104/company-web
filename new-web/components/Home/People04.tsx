// components/People04.tsx

import React from "react";
import Image from "next/image";

// --- Data Structure ---

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  imageSrc: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "EQUILIBRATE.AI's platform is incredibly powerful and easy to use. It has transformed our workflow.",
    name: "Mark Johnson",
    imageSrc: "https://r.mobirisesite.com/2046818/assets/images/photo-1591084728795-1149f32d9866.jpeg",
  },
  {
    id: 2,
    quote: "The security features are top-notch. I feel completely confident with my data.",
    name: "Sarah Chen",
    imageSrc: "https://r.mobirisesite.com/2046818/assets/images/photo-1568530134868-5d89f49d5a72.jpeg",
  },
  {
    id: 3,
    quote: "The speed and reliability are outstanding. It's a true testament to their innovative approach.",
    name: "David Rodriguez",
    imageSrc: "https://r.mobirisesite.com/2046818/assets/images/photo-1575846171058-979e0c211b54.jpeg",
  },
];


// --- Interfaces ---

interface BackgroundProps {
    type: "image" | "color";
    value: string;
}

interface People04Props {
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  showMainTitle?: boolean;
  showMainSubtitle?: boolean;
  columns?: 3 | 4 | 6 | 12; // 3 is default (lg:w-1/3)
  showImage?: boolean;
  showTitle?: boolean; // Card Name
  cardbg?: string;
  bg: BackgroundProps;
  transparentBg?: boolean;
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

export const People04: React.FC<People04Props> = ({
  fullWidth = false,
  paddingTop = 6,
  paddingBottom = 6,
  showMainTitle = true,
  showMainSubtitle = false,
  columns = 4, // Default to 3 columns (lg:w-1/3) in HTML snippet
  showImage = true,
  showTitle = true,
  cardbg = "#ffffff",
  bg = { type: "color", value: "#edefeb" },
  transparentBg = true,
  overlay = false,
  overlayColor = "#ffffff",
  overlayOpacity = 0.5,
}) => {
  
  // 1. Dynamic Section Style
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
    overlay && bg.type === "image"
      ? {
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }
      : {};

  // 3. Card Wrapper Styling
  const cardWrapperClasses = [
    "item-wrapper",
    "bg-white",
    "mb-8", // margin-bottom: 2rem
    "p-9", // padding: 2.25rem
    "rounded-lg",
    // Responsive padding based on LESS
    "lg:p-6", // 1.5rem for 992px - 1200px
    "max-md:p-6", // 1.5rem for max-width 767px
    "max-md:mb-4", // 1rem for max-width 767px
  ].join(" ");
  
  // Apply dynamic background color to card wrapper style if not default white
  const cardWrapperStyle: React.CSSProperties = {
      backgroundColor: cardbg,
  };


  return (
    <section 
      className="relative people04" 
      style={sectionStyle}
    >
      {/* Overlay */}
      {overlay && bg.type === "image" && (
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
                  **Praise**
                </h3>
              )}
              {showMainSubtitle && (
                <h5 className="text-sm mt-4 mb-0 text-black">
                  List your customers' testimonials in this block.
                </h5>
              )}
            </div>
          </div>
        )}

        {/* Testimonials Grid (Simulating Masonry) */}
        <div className="row flex flex-wrap -mx-4" 
             // Note: Tailwind uses flex-wrap and responsive columns to simulate Masonry
        >
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              // Base classes: col-12 col-md-6 (w-full, md:w-1/2)
              className={`item w-full px-4 md:w-1/2 ${getColumnClasses(columns)}`}
            >
              <div className={cardWrapperClasses} style={cardWrapperStyle}>
                <div className="card-box text-left">
                  {/* Quote Text */}
                  <p className="card-text text-base mb-4 text-black">
                    {testimonial.quote}
                  </p>
                  
                  {/* Profile Image */}
                  {showImage && (
                    <div className="img-wrapper flex justify-center mt-4 mb-3">
                      <Image
                        src={testimonial.imageSrc}
                        alt={testimonial.name}
                        width={80} // 80px from CSS
                        height={80} // 80px from CSS
                        className="rounded-full object-cover"
                        // Note: The !important border-radius: 50% is handled by rounded-full
                      />
                    </div>
                  )}
                  
                  {/* Name */}
                  {showTitle && (
                    <h5 className="card-title text-base font-bold text-center text-black">
                      **{testimonial.name}**
                    </h5>
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

export default People04;