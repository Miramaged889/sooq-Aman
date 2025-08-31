import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, AlertCircle, RotateCcw } from "lucide-react";
import { useI18n } from "../../hooks/useI18n.js";

const VerificationPopup = ({
  isOpen,
  onClose,
  phoneNumber,
  onVerificationComplete,
  onResend,
}) => {
  const { language } = useI18n();
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [randomCode, setRandomCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);

  // Generate random 4-digit code
  useEffect(() => {
    if (isOpen) {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setRandomCode(code);
      setVerificationCode(["", "", "", ""]);
      setError("");
      setSuccess(false);
      setIsVerifying(false);
    }
  }, [isOpen]);

  // Focus first input when popup opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (language === "ar") {
          // Arabic: focus on the rightmost input (index 3)
          inputRefs.current[3]?.focus();
        } else {
          // English: focus on the leftmost input (index 0)
          inputRefs.current[0]?.focus();
        }
      }, 100);
    }
  }, [isOpen, language]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Move to next input if value entered
    if (value) {
      if (language === "ar") {
        // Arabic: move to previous input (right to left)
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        // English: move to next input (left to right)
        if (index < 3) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    }

    // Check if all inputs are filled
    if (
      newCode.every((digit) => digit !== "") &&
      index === (language === "ar" ? 0 : 3)
    ) {
      handleVerify();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace navigation
    if (e.key === "Backspace" && !verificationCode[index]) {
      if (language === "ar") {
        // Arabic: move to next input (right to left)
        if (index < 3) {
          inputRefs.current[index + 1]?.focus();
        }
      } else {
        // English: move to previous input (left to right)
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      }
    }
  };

  const handleVerify = async () => {
    const enteredCode = verificationCode.join("");
    if (enteredCode.length !== 4) return;

    setIsVerifying(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (enteredCode === randomCode) {
        setSuccess(true);
        setTimeout(() => {
          onVerificationComplete(true);
          onClose();
        }, 1500);
      } else {
        setError(
          language === "ar"
            ? "رمز التحقق غير صحيح"
            : "Invalid verification code"
        );
        setVerificationCode(["", "", "", ""]);
        // Focus on the appropriate input based on language
        if (language === "ar") {
          inputRefs.current[3]?.focus();
        } else {
          inputRefs.current[0]?.focus();
        }
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setError(
        language === "ar" ? "حدث خطأ أثناء التحقق" : "Verification failed"
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (onResend) {
      await onResend();
      // Generate new random code
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setRandomCode(code);
      setVerificationCode(["", "", "", ""]);
      setError("");
      // Focus on the appropriate input based on language
      if (language === "ar") {
        inputRefs.current[3]?.focus();
      } else {
        inputRefs.current[0]?.focus();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {language === "ar"
                ? "التحقق من رقم الهاتف"
                : "Phone Verification"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Phone Number Display */}
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                {language === "ar"
                  ? "تم إرسال رمز التحقق إلى:"
                  : "Verification code sent to:"}
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {phoneNumber}
              </p>
            </div>

            {/* Random Code Display */}
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600 mb-2">
                {language === "ar"
                  ? "أدخل الرمز التالي:"
                  : "Enter the following code:"}
              </p>
              <div className="text-3xl font-mono font-bold text-primary tracking-widest">
                {randomCode}
              </div>
            </div>

            {/* Verification Inputs */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                {language === "ar" ? "رمز التحقق" : "Verification Code"}
              </label>

              <div className="flex gap-3 justify-center">
                {(language === "ar"
                  ? [...verificationCode].reverse()
                  : verificationCode
                ).map((digit, displayIndex) => {
                  const actualIndex =
                    language === "ar" ? 3 - displayIndex : displayIndex;
                  return (
                    <input
                      key={actualIndex}
                      ref={(el) => (inputRefs.current[actualIndex] = el)}
                      type="text"
                      value={digit}
                      onChange={(e) =>
                        handleInputChange(
                          actualIndex,
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      onKeyDown={(e) => handleKeyDown(actualIndex, e)}
                      className={`
                        w-12 h-12 text-center text-xl font-bold border-2 rounded-lg
                        focus:ring-2 focus:ring-primary focus:border-transparent
                        transition-all duration-200
                        ${
                          digit
                            ? "border-primary bg-primary/5"
                            : "border-gray-300"
                        }
                        ${error ? "border-red-500" : ""}
                      `}
                      maxLength={1}
                      inputMode="numeric"
                    />
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg"
              >
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg"
              >
                <Check className="h-4 w-4" />
                <p className="text-sm">
                  {language === "ar"
                    ? "تم التحقق بنجاح!"
                    : "Verification successful!"}
                </p>
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleResend}
                disabled={isVerifying}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {language === "ar" ? "إعادة الإرسال" : "Resend"}
                </span>
              </button>

              <button
                onClick={handleVerify}
                disabled={
                  verificationCode.some((digit) => digit === "") || isVerifying
                }
                className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VerificationPopup;
