import React, { useState, useEffect } from "react";
import { Phone, Check, AlertCircle } from "lucide-react";
import { useI18n } from "../../hooks/useI18n.js";

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
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Oman country code
  const countryCode = "+968";

  useEffect(() => {
    if (value !== phoneNumber) {
      setPhoneNumber(value);
    }
  }, [value]);

  // Countdown timer for resend verification
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

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
      onChange(formatted);
    }

    // Reset verification status when phone number changes
    if (isVerified) {
      setIsVerified(false);
      setVerificationCode("");
    }
  };

  const handleStartVerification = async () => {
    if (!phoneNumber || phoneNumber.length < 11) return;

    setIsVerifying(true);
    setCountdown(60);

    // Simulate API call to send verification code
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
    } catch (error) {
      console.error("Failed to send verification code:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) return;

    setIsVerifying(true);

    try {
      // Simulate API call to verify code
      // In a real app, you would verify the code with your backend
      if (verificationCode === "123456") {
        // Demo code
        setIsVerified(true);
        if (onVerificationComplete) {
          await onVerificationComplete(true);
        }
      } else {
        throw new Error("Invalid verification code");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      if (onVerificationComplete) {
        await onVerificationComplete(false);
      }
    } finally {
      setIsVerifying(false);
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
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAyNCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjE4IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSI2IiBmaWxsPSIjRkY2NjAwIi8+CjxyZWN0IHk9IjEyIiB3aWR0aD0iMjQiIGhlaWdodD0iNiIgZmlsbD0iIzAwOEEwMCIvPgo8L3N2Zz4K"
              alt="Oman Flag"
              className="w-6 h-4 mr-2"
            />
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
                disabled={isVerifying || countdown > 0}
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
                  : countdown > 0
                  ? language === "ar"
                    ? `إعادة الإرسال خلال ${countdown}ث`
                    : `Resend in ${countdown}s`
                  : language === "ar"
                  ? "إرسال رمز التحقق"
                  : "Send Verification Code"}
              </button>

              {/* Verification Code Input */}
              {countdown > 0 && (
                <div className="space-y-3">
                  <label
                    className={`block text-sm font-medium text-gray-700 ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {language === "ar" ? "رمز التحقق" : "Verification Code"}
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) =>
                        setVerificationCode(
                          e.target.value.replace(/\D/g, "").slice(0, 6)
                        )
                      }
                      placeholder={
                        language === "ar"
                          ? "ادخل الرمز المكون من 6 أرقام"
                          : "Enter 6-digit code"
                      }
                      className={`
                        flex-1 px-4 py-3 border border-gray-300 rounded-lg
                        focus:ring-2 focus:ring-primary focus:border-transparent
                        transition-all duration-200 text-center font-mono text-lg
                        ${language === "ar" ? "text-right" : "text-left"}
                      `}
                      maxLength={6}
                    />

                    <button
                      type="button"
                      onClick={handleVerifyCode}
                      disabled={verificationCode.length !== 6 || isVerifying}
                      className={`
                        px-6 py-3 bg-primary text-white rounded-lg
                        hover:bg-primary-600 transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                        font-medium
                      `}
                    >
                      {isVerifying
                        ? language === "ar"
                          ? "جاري التحقق..."
                          : "Verifying..."
                        : language === "ar"
                        ? "تحقق"
                        : "Verify"}
                    </button>
                  </div>

                  <p
                    className={`text-xs text-gray-500 ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {language === "ar"
                      ? `تم إرسال رمز التحقق إلى ${countryCode} ${phoneNumber}`
                      : `Verification code sent to ${countryCode} ${phoneNumber}`}
                  </p>
                </div>
              )}
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
