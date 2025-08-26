import React from "react";
import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

const Alert = ({ type = "info", title, message, onClose, className = "" }) => {
  const alertStyles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    error: "bg-red-50 border-red-200 text-red-800",
  };

  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle,
  };

  const Icon = icons[type];

  return (
    <div
      className={`border rounded-lg p-4 ${alertStyles[type]} ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 mr-3">
          {title && <h3 className="text-sm font-medium mb-1">{title}</h3>}
          {message && <p className="text-sm">{message}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 h-5 w-5 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close alert"
          >
            <XCircle className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
