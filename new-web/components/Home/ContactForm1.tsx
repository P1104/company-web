// components/ContactForm1.tsx

"use client";
import React from "react";
import Link from 'next/link'; // Use Link for potential navigation

// --- Interfaces ---

interface ContactForm1Props {
  fullScreen?: boolean;
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  showTitle?: boolean;
  bgColor?: string;
  // NOTE: Assuming this component is part of the "Get In Touch" section
}

// --- Helper Functions (Tailwind mapping) ---

// Maps prop to Tailwind item alignment classes
function getContainerClasses(fullWidth: boolean = false): string {
  return fullWidth ? "container-fluid" : "container mx-auto";
}

// --- Main Component ---

export const ContactForm1: React.FC<ContactForm1Props> = ({
  fullScreen = false,
  fullWidth = false,
  paddingTop = 5, // 5rem
  paddingBottom = 5, // 5rem
  showTitle = true,
  bgColor = "#FFCDB2",
}) => {
  
  // 1. Dynamic Padding and Background Style
  const sectionStyle: React.CSSProperties = {
    backgroundColor: bgColor,
  };
  
  if (!fullScreen) {
    // Convert 'rem' units from props (e.g., 5 * 1rem)
    sectionStyle.paddingTop = `${paddingTop}rem`;
    sectionStyle.paddingBottom = `${paddingBottom}rem`;
  }

  // 2. Form Submission Handler (Basic client-side example)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send data to an API route (Next.js API route)
    console.log("Form Submitted!");
    // For demonstration, you might display a success message here
  };

  return (
    <section
      className={[
        "relative flex",
        fullScreen ? "min-h-screen" : "",
        "form1", // Custom class for potential external CSS if needed
      ].join(" ")}
      style={sectionStyle}
    >
      <div className={`w-full ${getContainerClasses(fullWidth)}`}>
        <div className="row content-wrapper flex justify-center items-center">
          
          {/* Form Wrapper (col-lg-7) */}
          <div className="col-lg-7 w-full lg:w-7/12">
            
            {showTitle && (
              <div className="w-full">
                <h5 className="text-center font-bold mb-12 text-5xl text-black">
                  {/* Title from the original video/HTML: Get In Touch */}
                  **Get In Touch** </h5>
              </div>
            )}

            <div className="text-wrapper text-left lg:px-8">
              <form onSubmit={handleSubmit} method="POST" className="w-full">
                {/* Alert messages hidden initially */}
                <div hidden className="alert alert-success col-12 bg-green-100 text-green-700 p-3 mb-4 rounded">
                  Thanks for filling out the form!
                </div>
                <div hidden className="alert alert-danger col-12 bg-red-100 text-red-700 p-3 mb-4 rounded">
                  Oops...! some problem!
                </div>
                
                {/* Input and Button Row */}
                <div className="flex flex-wrap items-center">
                    
                    {/* Email Input */}
                    {/* The original video/HTML showed two inputs: Name and Email. I'll include both based on common forms, though your specific HTML snippet only showed email. */}
                    
                    <div className="col-lg-6 col-md-6 w-full md:w-1/2 pr-0 md:pr-4 form-group mb-4">
                        {/* Name Input (Inferred from video) */}
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="w-full bg-white text-gray-800 p-4 border-none h-full hover:border-none focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg shadow-sm transition-shadow"
                            style={{ padding: "1.2rem 1.5rem" }} // Custom padding from CSS
                            required
                        />
                    </div>

                    <div data-for="email" className="col-lg-6 col-md-6 w-full md:w-1/2 pl-0 md:pl-4 form-group mb-4">
                        {/* Email Input (From HTML) */}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            data-form-field="email"
                            className="w-full bg-white text-gray-800 p-4 border-none h-full hover:border-none focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg shadow-sm transition-shadow"
                            style={{ padding: "1.2rem 1.5rem" }} // Custom padding from CSS
                            required
                        />
                    </div>
                
                    {/* Message/Comments Area (Inferred from video, but adding for completeness) */}
                    <div className="col-12 w-full form-group mb-4">
                        <textarea
                            name="message"
                            placeholder="Message"
                            className="w-full bg-white text-gray-800 p-4 border-none h-40 hover:border-none focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg shadow-sm transition-shadow resize-none"
                            style={{ padding: "1.2rem 1.5rem" }} // Custom padding from CSS
                            required
                        />
                    </div>

                    {/* Button */}
                    <div className="col-auto mbr-section-btn w-full flex justify-center mt-2">
                        <button
                            type="submit"
                            className="w-full md:w-auto bg-red-600 text-white font-semibold py-4 px-10 rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                            // Custom margin/alignment to match CSS (margin: auto, width: auto on desktop)
                            style={{ height: 'auto', margin: 'auto' }}
                        >
                            Send Message
                        </button>
                    </div>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm1;