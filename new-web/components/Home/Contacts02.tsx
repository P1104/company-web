// components/Contacts02.tsx

"use client";
import React from "react";
import Link from 'next/link';

// --- Interfaces ---

interface BackgroundProps {
    type: "image" | "color";
    value: string;
}

interface Contacts02Props {
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  showTitle?: boolean; // Main Title
  showSubtitle?: boolean; // Main Subtitle
  showCardTitle?: boolean; // Card Title ("Contact Us")
  cardsBg?: string;
  bg: BackgroundProps;
  transparentBg?: boolean;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  // NOTE: GoogleMap prop is complex, using a placeholder iframe source
  googleMapSrc?: string; 
}


// --- Contact Data (Based on HTML list content) ---
const CONTACT_DETAILS = [
    { label: "Phone", value: "1-800-555-TECH", link: "tel:1-800-555-TECH" },
    { label: "WhatsApp", value: "1-800-555-TECH", link: "tel:1-800-555-TECH" },
    { label: "Email", value: "info@equilibrate.ai", link: "mailto:info@equilibrate.ai" },
    { label: "Address", value: "123 AI Innovation Drive, Silicon Valley, CA 94000", link: "#" },
    { label: "Open Hours", value: "Monday - Friday: 9 AM - 6 PM", link: "#" },
];


// --- Main Component ---

export const Contacts02: React.FC<Contacts02Props> = ({
  fullWidth = false,
  paddingTop = 5,
  paddingBottom = 5,
  showTitle = true,
  showSubtitle = false,
  showCardTitle = false,
  cardsBg = "#ffffff",
  bg = { type: "color", value: "#edefeb" },
  transparentBg = true,
  overlay = false,
  overlayColor = "#ffffff",
  overlayOpacity = 0.5,
  // Placeholder Google Map source
  googleMapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d157303.4916892305!2d-122.18563795!3d37.3323314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f9e0757db6c95%3A0x6b45014b2d354b6c!2sSilicon%20Valley%2C%20CA!5e0!3m2!1sen!2sin!4v1678887771746!5m2!1sen!2sin",
}) => {
  
  // 1. Dynamic Section Style (Background and Padding)
  const sectionStyle: React.CSSProperties = {
    paddingTop: `${paddingTop}rem`,
    paddingBottom: `${paddingBottom}rem`,
  };
  
  // Set background color, handling transparency (LESS logic)
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

  // 3. Card Wrapper Styling (Contact Details Box)
  const cardWrapperClasses = [
    "card-wrapper",
    "w-full",
    "rounded-lg",
    "shadow-lg", // Added subtle shadow for definition
    // Responsive padding based on LESS
    "p-9", // 2.25rem (default)
    "lg:p-6", // 1.5rem (992px-1200px)
    "max-md:px-6 max-md:py-8", // 2rem top/bottom, 1.5rem left/right (max-width 767px)
  ].join(" ");
  
  const cardWrapperStyle: React.CSSProperties = {
      backgroundColor: cardsBg,
  };


  return (
    <section 
      className="relative contacts02 map1" 
      style={sectionStyle}
    >
      {/* Overlay */}
      {overlay && bg.type !== "color" && (
        <div className="absolute inset-0 z-10" style={overlayStyle} />
      )}

      {/* Content Container */}
      <div className={`relative z-20 ${fullWidth ? "container-fluid" : "container mx-auto"}`}>
        
        {/* Main Title and Subtitle */}
        <div className="row justify-center">
            <div className="col-12 content-head text-center mx-auto max-w-2xl mb-12">
                {(showTitle || showSubtitle) && (
                    <div className="mbr-section-head">
                        {showTitle && (
                            <h3 className="text-4xl font-extrabold mb-0 text-gray-900">
                                **Our Location**
                            </h3>
                        )}
                        {showSubtitle && (
                            <h4 className="text-xl mt-4 mb-0 text-gray-700">
                                Contacts Subtitle
                            </h4>
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* Contact Card and Map Row (Side-by-Side) */}
        <div className="row flex flex-wrap justify-center -mx-4">
            
            {/* Contact Details Card (col-lg-6) */}
            <div className="card col-12 col-md-12 lg:w-1/2 px-4">
                <div className={cardWrapperClasses} style={cardWrapperStyle}>
                    <div className="text-wrapper">
                        {showCardTitle && (
                            <h5 className="cardTitle text-xl font-bold mb-4 text-gray-900">
                                **Contact Us**
                            </h5>
                        )}
                        
                        <ul className="list text-base text-gray-700">
                            {CONTACT_DETAILS.map((item, index) => (
                                <li key={index} className="mbr-text item-wrap mb-1">
                                    <span className="font-semibold w-24 inline-block">{item.label}:</span>
                                    {item.link && item.link !== '#' ? (
                                        <Link href={item.link} className="text-black hover:underline ml-2">
                                            {item.value}
                                        </Link>
                                    ) : (
                                        <span className="ml-2">{item.value}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            
            {/* Map Wrapper (col-lg-6) */}
            <div className="map-wrapper col-md-12 lg:w-1/2 px-4 w-full">
                <div 
                    className="google-map relative"
                    // Responsive margin from LESS
                    // margin-top: 2rem (max-width 992px), 1rem (max-width 767px)
                    style={{ marginTop: '2rem'}} 
                >
                    <iframe
                        title="Our Location"
                        src={googleMapSrc}
                        width="100%"
                        style={{
                            height: '100%',
                            minHeight: '350px', // Min-height from LESS
                            width: '100%',
                            border: 0,
                        }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts02;