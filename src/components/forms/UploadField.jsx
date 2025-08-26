import React, { useRef } from "react";
import { Upload, X } from "lucide-react";

const UploadField = ({
  label,
  name,
  value = [],
  onChange,
  accept = "image/*",
  multiple = true,
  maxFiles = 5,
  error,
  required = false,
  disabled = false,
  className = "",
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = multiple ? [...value, ...files] : files;
    
    if (newFiles.length <= maxFiles) {
      onChange(newFiles);
    }
  };

  const removeFile = (index) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newFiles = multiple ? [...value, ...files] : files;
    
    if (newFiles.length <= maxFiles) {
      onChange(newFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}
      
      <div
        className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          {multiple ? "اسحب الصور هنا أو اضغط للاختيار" : "اسحب الصورة هنا أو اضغط للاختيار"}
        </p>
        <p className="text-xs text-gray-500">
          {accept === "image/*" ? "PNG, JPG, GIF حتى 10MB" : "الملفات المدعومة"}
        </p>
        {multiple && (
          <p className="text-xs text-gray-500 mt-1">
            الحد الأقصى: {maxFiles} ملفات
          </p>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />

      {value.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((file, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default UploadField;
