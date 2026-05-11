import React, { useRef } from "react";
import { Upload } from "lucide-react";

export const Uploader = ({ image, onChange }) => {
    const fileInputRef = useRef(null);

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            onChange(imageUrl);
        }
    };

    return (
        <div className="relative group">
            <label className="absolute -top-2.5 left-4 bg-white px-1 text-[12px] text-slate-400 z-10 font-medium">
                Image
            </label>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />

            <div
                onClick={handleDivClick}
                className="flex items-center justify-between w-full p-3.5 bg-white border-[1.5px] border-slate-200 rounded-2xl text-slate-400 cursor-pointer hover:border-blue-400 transition-all overflow-hidden"
            >
                {image ? (
                    <div className="flex items-center gap-3">
                        <img src={image} alt="preview" className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-sm text-slate-800 italic">Image selected</span>
                    </div>
                ) : (
                    <span className="text-sm">.png / .jpg / .jpeg</span>
                )}
                <Upload size={18} className={image ? "text-blue-500" : ""} />
            </div>
        </div>
    );
};