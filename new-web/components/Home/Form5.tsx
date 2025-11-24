// components/Form5.tsx

"use client";
import React, { useState } from "react";

// --- Interfaces ---

interface BackgroundProps {
    type: "image" | "video" | "color";
    value: string;
}

interface Form5Props {
  fullWidth?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  showTitle?: boolean;
  showSubtitle?: boolean;
  bg: BackgroundProps;
  transparentBg?: boolean;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

// --- Form State Interface ---
interface FormData {
    name: string;
    email: string;
    message: string;
}


// --- Main Component ---

export const Form5: React.FC<Form5Props> = ({
  fullWidth = false,
  paddingTop = 6,
  paddingBottom = 6,
  showTitle = true,
  showSubtitle = false,
  bg = { type: "color", value: "#edefeb" },
  transparentBg = true,
  overlay = true,
  overlayColor = "#ffffff",
  overlayOpacity = 0.4,
}) => {
    
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
    const [alertMessage, setAlertMessage] = useState<{ type: 'success' | 'danger', text: string } | null>(null);

    // 1. Form Handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Basic Validation
        if (!formData.name || !formData.email || !formData.message) {
            setAlertMessage({ type: 'danger', text: "Please fill out all fields." });
            return;
        }

        // Simulate API call success/failure
        try {
            console.log("Form Data Submitted:", formData);
            // In a real application, replace this with fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
            
            setAlertMessage({ type: 'success', text: "Thanks for filling out the form!" });
            setFormData({ name: '', email: '', message: '' }); // Clear form
        } catch (error) {
            setAlertMessage({ type: 'danger', text: "Oops...! some problem!" });
        }
    };


    // 2. Dynamic Section Style (Background and Padding)
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

    // 3. Overlay Style
    const overlayStyle: React.CSSProperties =
        overlay && bg.type !== "color"
            ? {
                backgroundColor: overlayColor,
                opacity: overlayOpacity,
            }
            : {};
            
    // 4. Input/Textarea Base Classes
    const inputClasses = "form-control w-full p-4 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none";


    return (
        <section 
            className="relative form5" 
            style={sectionStyle}
        >
            {/* Background Video/Image and Fallback (Reusing logic for video background) */}
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
                {/* Fallback image logic is typically handled here if provided */}
              </>
            )}

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
                                        **Get In Touch**
                                    </h3>
                                )}
                                {showSubtitle && (
                                    <h4 className="text-base mt-4 mb-0 text-gray-700">
                                        Contacts Subtitle
                                    </h4>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Form Wrapper */}
                <div className="row justify-center">
                    <div className="col-lg-8 mx-auto w-full lg:w-8/12">
                        <form onSubmit={handleSubmit} method="POST" className="w-full">
                            
                            {/* Alert Messages */}
                            {alertMessage && (
                                <div className={`alert col-12 mb-4 p-3 rounded text-center 
                                    ${alertMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                    role="alert"
                                >
                                    {alertMessage.text}
                                </div>
                            )}

                            <div className="dragArea row flex flex-wrap">
                                
                                {/* Name Input */}
                                <div className="col-md w-full md:w-1/2 px-2 form-group mb-3">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="Name" 
                                        className={inputClasses}
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                {/* Email Input */}
                                <div className="col-md w-full md:w-1/2 px-2 form-group mb-3">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="Email" 
                                        className={inputClasses}
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                {/* Message Textarea */}
                                <div className="col-12 w-full px-2 form-group mb-4">
                                    <textarea 
                                        name="message" 
                                        placeholder="Message" 
                                        className={`${inputClasses} h-32 resize-none`}
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                {/* Submit Button */}
                                <div className="col-lg-12 col-md-12 col-sm-12 w-full align-center text-center px-2">
                                    <button 
                                        type="submit" 
                                        className="btn bg-red-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-red-700 transition w-full max-w-sm max-md:max-w-full"
                                        // LESS button style logic: display: inline-flex, full width on mobile
                                        style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Form5;