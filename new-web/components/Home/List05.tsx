// components/List05.tsx

"use client";
import React from "react";

// --- Data Structure ---

interface QuestionAnswer {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: QuestionAnswer[] = [
  {
    id: 1,
    question: "What is Equilibra.AI?",
    answer: "Equilibra.AI is a pioneering company dedicated to making advanced technology accessible to everyone by removing barriers with artificial intelligence.",
  },
  {
    id: 2,
    question: "How does AI help?",
    answer: "Our AI-driven approach simplifies complex technologies, making them user-friendly and efficient for a wide range of applications.",
  },
  {
    id: 3,
    question: "What industries do you serve?",
    answer: "We cater to a diverse array of industries, providing tailored AI solutions to meet unique business needs and drive growth.",
  },
  {
    id: 4,
    question: "Is your technology secure?",
    answer: "Absolutely. We prioritize enterprise-grade data protection, ensuring your information is always safe with us.",
  },
  {
    id: 5,
    question: "How can I get started?",
    answer: "Visit our products page or contact our sales team to learn how Equilibra.AI can transform your business operations.",
  },
];


// --- Interfaces ---

interface List05Props {
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  textWidth?: 4 | 6 | 8 | 12; // Corresponds to col-lg-* width
  showMainTitle?: boolean;
  showMainSubtitle?: boolean;
  showTitle?: boolean; // Card Question Title
  cardbg?: string;
  bgColor?: string;
  transparentBg?: boolean;
}

// --- Helper Functions ---

// Maps textWidth prop (Bootstrap size) to Tailwind width classes
function getTextWidthClasses(textWidth: number = 8): string {
    // Tailwind classes are based on 12-column grid: w-8/12 (w-2/3), etc.
    if (textWidth === 12) return "lg:w-full";
    if (textWidth === 8) return "lg:w-2/3";
    if (textWidth === 6) return "lg:w-1/2";
    if (textWidth === 4) return "lg:w-1/3";
    return "lg:w-2/3"; // Default to 8
}


// --- Main Component ---

export const List05: React.FC<List05Props> = ({
  fullWidth = false,
  paddingTop = 5,
  paddingBottom = 5,
  textWidth = 8,
  showMainTitle = true,
  showMainSubtitle = false,
  showTitle = true,
  cardbg = "#ffffff",
  bgColor = "#edefeb",
  transparentBg = true,
}) => {
  
  // 1. Dynamic Section Style (Background and Padding)
  const sectionStyle: React.CSSProperties = {
    paddingTop: `${paddingTop}rem`,
    paddingBottom: `${paddingBottom}rem`,
  };
  
  // Set background color, handling transparency (LESS logic)
  sectionStyle.backgroundColor = transparentBg ? "transparent" : bgColor;


  // 2. Item Wrapper Styling (Card BG color and responsive padding)
  const itemWrapperClasses = [
    "item-wrapper",
    "w-full",
    "mb-8", // margin-bottom: 2rem
    "p-9", // padding: 2.25rem
    "rounded-lg",
    "shadow-md",
    // Responsive padding based on LESS
    "lg:px-6 lg:py-8", // 2rem top/bottom, 1.5rem left/right for 992px - 1200px
    "max-md:px-6 max-md:py-8", // 2rem top/bottom, 1.5rem left/right for max-width 767px
    "max-md:mb-4", // 1rem for max-width 767px
  ].join(" ");


  return (
    <section 
      className="relative list05" 
      style={sectionStyle}
    >
      {/* Content Container */}
      <div className={`relative z-20 ${fullWidth ? "container-fluid" : "container mx-auto"}`}>
        
        {/* Main Title and Subtitle */}
        {(showMainTitle || showMainSubtitle) && (
          <div className="col-12 mb-12 content-head text-center mx-auto max-w-2xl">
              {showMainTitle && (
                <h3 className="text-4xl font-extrabold mb-0 text-black">
                  **Your Questions Answered**
                </h3>
              )}
              {showMainSubtitle && (
                <h5 className="text-base mt-4 mb-0 text-black">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </h5>
              )}
          </div>
        )}

        {/* FAQ List */}
        <div className="row flex justify-center">
            <div className={`col-12 ${getTextWidthClasses(textWidth)}`}>
                {FAQ_DATA.map((item) => (
                    <div
                        key={item.id}
                        className="item features-without-image w-full"
                    >
                        <div 
                            className={itemWrapperClasses}
                            style={{backgroundColor: cardbg}}
                        >
                            {/* Question Title */}
                            {showTitle && (
                                <h5 className="text-2xl font-bold mt-0 mb-3 text-black">
                                    **{item.question}**
                                </h5>
                            )}
                            {/* Answer Text */}
                            <p className="text-base mt-0 mb-3 text-black text-left">
                                {item.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default List05;