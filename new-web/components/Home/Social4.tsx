// components/Social4.tsx

"use client";
import React from "react";
import Link from 'next/link';

// --- Interfaces ---

interface BackgroundProps {
    type: "image" | "video" | "color";
    value: string;
}

interface SocialLink {
    name: 'facebook' | 'twitter' | 'instagram' | 'pinterest' | 'slack' | 'linkedin' | 'behance' | 'dribbble' | 'tiktok' | 'youtube' | 'twitch';
    href: string;
    iconClass: string; // Placeholder for Socicon class
    bgColor: string;
    hoverColor: string;
}

interface Social4Props {
  paddingTop?: number;
  paddingBottom?: number;
  showTitle?: boolean;
  squareIcons?: boolean;
  // Specific toggles for the links shown in the source HTML
  facebook?: boolean;
  twitter?: boolean;
  instagram?: boolean;
  tiktok?: boolean;
  // Background Props
  bg: BackgroundProps;
  fallBackImage?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}


// --- Social Data Mapping (Replicating LESS colors) ---
const SOCIAL_LINKS_MAP: Record<string, Omit<SocialLink, 'href'>> = {
    facebook: { name: 'facebook', iconClass: 'socicon-facebook', bgColor: '#1778f2', hoverColor: '#0c5cbb' },
    twitter: { name: 'twitter', iconClass: 'socicon-twitter', bgColor: '#1da1f2', hoverColor: '#0c85d0' },
    instagram: { name: 'instagram', iconClass: 'socicon-instagram', bgColor: '#f00075', hoverColor: '#c70062' },
    tiktok: { name: 'tiktok', iconClass: 'socicon-tiktok', bgColor: '#000000', hoverColor: '#1a1a1a' },
    // Add other services if needed, using the LESS color definitions:
    // pinterest: { name: 'pinterest', iconClass: 'socicon-pinterest', bgColor: '#e60023', hoverColor: '#bf001d' },
};


// --- Main Component ---

export const Social4: React.FC<Social4Props> = ({
  paddingTop = 5,
  paddingBottom = 5,
  showTitle = true,
  squareIcons = false,
  facebook = true,
  twitter = true,
  instagram = true,
  tiktok = true,
  bg = { type: "color", value: "#ffffff" },
  fallBackImage,
  overlay = false,
  overlayColor = "#ffffff",
  overlayOpacity = 0.5,
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
    overlay && bg.type !== "color"
      ? {
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }
      : {};

  // 3. Icon Wrapper Styling (Base CSS/LESS replication)
  const iconWrapperBaseClasses = [
      "iconfont-wrapper",
      "inline-block",
      "m-2",
      "text-white", // All icons must be contrast color, assumed white for these BGs
      "transition-all", // transition: all 0.3s ease-in-out;
      "duration-300",
      "text-4xl", // font-size: 32px
      "w-[72px]", // width: 72px
      "h-[72px]", // height: 72px
      "leading-[72px]", // line-height: 72px
      "text-center",
      squareIcons ? "rounded-none" : "rounded-full", // border-radius: 50% or 0
  ].join(" ");
  
  // 4. Filter the links to show based on props
  const enabledLinks = Object.entries({ facebook, twitter, instagram, tiktok })
    .filter(([key, enabled]) => enabled)
    .map(([key]) => ({
      ...SOCIAL_LINKS_MAP[key],
      href: `https://example.com/${key}`, // Placeholder URL
    }));

  
  // 5. Custom Icon Component (To apply complex styles and hover effects)
  const SocialIcon: React.FC<{ link: SocialLink }> = ({ link }) => {
    return (
      <Link 
        href={link.href}
        target="_blank"
        className={iconWrapperBaseClasses}
        // Apply inline styles for background and hover effects
        style={{ 
            backgroundColor: link.bgColor,
            // Custom hover style for the darken effect
            '--tw-bg-hover': link.hoverColor, 
        }}
        // Use a generic group hover utility for the background transition
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = link.hoverColor)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = link.bgColor)}
      >
        {/* Placeholder for Socicon. In a real project, this would be an actual SVG or font icon component */}
        <span className={`socicon ${link.iconClass}`}>{link.name.substring(0, 1).toUpperCase()}</span>
      </Link>
    );
  };


  return (
    <section 
      className="relative social4" 
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
      <div className="relative z-20 container mx-auto">
        <div className="media-container-row flex justify-center">
          <div className="col-12 w-full">
            
            {/* Title */}
            {showTitle && (
              <h3 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
                **Connect With Us**
              </h3>
            )}
            
            {/* Social Icons List */}
            <div className="social-list flex justify-center flex-wrap">
              {enabledLinks.map(link => (
                <SocialIcon key={link.name} link={link} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Social4;