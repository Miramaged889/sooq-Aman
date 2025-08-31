import React, { useState, useEffect } from "react";
import { Phone, Check, AlertCircle } from "lucide-react";
import { useI18n } from "../../hooks/useI18n.js";
import VerificationPopup from "./VerificationPopup.jsx";

const PhoneInput = ({
  value = "",
  onChange,
  error,
  required = false,
  className = "",
  onVerificationStart,
  onVerificationComplete,
  showVerification = false,
}) => {
  const { language } = useI18n();
  const [phoneNumber, setPhoneNumber] = useState(value);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);

  // Oman country code
  const countryCode = "+968";

  useEffect(() => {
    if (value !== phoneNumber) {
      setPhoneNumber(value);
    }
  }, [value]);

  const formatPhoneNumber = (input) => {
    // Remove all non-digits
    const digits = input.replace(/\D/g, "");

    // Format as 9X XXX XXX for Oman numbers
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    if (digits.length <= 8)
      return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
    return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)}`;
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input);
    setPhoneNumber(formatted);

    if (onChange) {
      // Handle both function and event-based onChange
      if (typeof onChange === "function") {
        onChange(formatted);
      }
    }

    // Reset verification status when phone number changes
    if (isVerified) {
      setIsVerified(false);
    }
  };

  const handleStartVerification = async () => {
    if (!phoneNumber || phoneNumber.replace(/\s/g, "").length !== 8) {
      return;
    }

    setIsVerifying(true);

    try {
      if (onVerificationStart) {
        await onVerificationStart(
          `${countryCode}${phoneNumber.replace(/\s/g, "")}`
        );
      }

      // In a real app, you would call your SMS API here
      console.log(
        `Sending verification code to ${countryCode}${phoneNumber.replace(
          /\s/g,
          ""
        )}`
      );

      // Show verification popup
      setShowVerificationPopup(true);
    } catch (error) {
      console.error("Failed to send verification code:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerificationComplete = async (success) => {
    setIsVerified(success);
    if (success && onVerificationComplete) {
      await onVerificationComplete(true);
    }
  };

  const handleResendCode = async () => {
    if (onVerificationStart) {
      await onVerificationStart(
        `${countryCode}${phoneNumber.replace(/\s/g, "")}`
      );
    }
  };

  const isValidPhoneNumber =
    phoneNumber && phoneNumber.replace(/\s/g, "").length === 8;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Phone Number Input */}
      <div className="relative">
        <label
          className={`block text-sm font-medium text-gray-700 mb-2 ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            {language === "ar" ? "رقم الهاتف" : "Phone Number"}
            {required && <span className="text-red-500">*</span>}
          </div>
        </label>

        <div className="relative flex">
          {/* Country Code */}
          <div className="flex items-center px-3 py-3 bg-gray-50 border border-gray-300 border-r-0 rounded-l-lg">
            {/* Oman Flag */}
            <div className="w-6 h-4 mr-2 bg-white border border-gray-200 rounded-sm overflow-hidden flex">
              {/* Vertical red stripe with emblem */}
              <div className="w-1 bg-red-600 flex items-center justify-center">
                <div className="w-0.5 h-0.5 bg-white rounded-full"></div>
              </div>
              {/* Horizontal stripes */}
              <div className="flex-1 flex flex-col">
                <div className="h-1/3 bg-white"></div>
                <div className="h-1/3 bg-red-600"></div>
                <div className="h-1/3 bg-green-600"></div>
              </div>
            </div>
            <span className="text-gray-700 font-medium">{countryCode}</span>
          </div>

          {/* Phone Input */}
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder={language === "ar" ? "9X XXX XXX" : "9X XXX XXX"}
            className={`
              flex-1 px-4 py-3 border border-gray-300 rounded-r-lg
              focus:ring-2 focus:ring-primary focus:border-transparent
              transition-all duration-200
              ${language === "ar" ? "text-right" : "text-left"}
              ${error ? "border-red-500 focus:ring-red-500" : ""}
              ${isVerified ? "border-green-500 bg-green-50" : ""}
            `}
            required={required}
            maxLength={11}
          />

          {/* Verification Status Icon */}
          {isVerified && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Check className="h-5 w-5 text-green-600" />
            </div>
          )}
        </div>

        {/* Phone Number Info */}
        <p
          className={`mt-1 text-xs text-gray-500 ${
            language === "ar" ? "text-right" : "text-left"
          }`}
        >
          {language === "ar"
            ? "أدخل رقم هاتفك العُماني (8 أرقام تبدأ بـ 9)"
            : "Enter your Omani phone number (8 digits starting with 9)"}
        </p>
      </div>

      {/* Verification Section */}
      {showVerification && isValidPhoneNumber && (
        <div className="space-y-3">
          {!isVerified ? (
            <>
              {/* Send Verification Button */}
              <button
                type="button"
                onClick={handleStartVerification}
                disabled={isVerifying}
                className={`
                   w-full px-4 py-3 border border-primary text-primary
                   rounded-lg hover:bg-primary hover:text-white
                   transition-all duration-200 font-medium
                   disabled:opacity-50 disabled:cursor-not-allowed
                   ${isVerifying ? "bg-gray-100" : ""}
                 `}
              >
                {isVerifying
                  ? language === "ar"
                    ? "جاري الإرسال..."
                    : "Sending..."
                  : language === "ar"
                  ? "إرسال رمز التحقق"
                  : "Send Verification Code"}
              </button>
            </>
          ) : (
            /* Verified Status */
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">
                {language === "ar"
                  ? "تم التحقق من رقم الهاتف بنجاح"
                  : "Phone number verified successfully"}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Verification Popup */}
      <VerificationPopup
        isOpen={showVerificationPopup}
        onClose={() => setShowVerificationPopup(false)}
        phoneNumber={`${countryCode} ${phoneNumber}`}
        onVerificationComplete={handleVerificationComplete}
        onResend={handleResendCode}
      />

      {error && (
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="h-4 w-4" />
          <p
            className={`text-sm ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
