import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  UserPlus,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  Phone,
  Globe,
} from "lucide-react";
import { useI18n } from "../hooks/useI18n.js";
import { useAuth } from "../hooks/useAuth.js";
import FormInput from "../components/forms/FormInput.jsx";
import PhoneInput from "../components/forms/PhoneInput.jsx";
import Button from "../components/common/Button.jsx";
import Alert from "../components/common/Alert.jsx";
import { validateEmail } from "../utils/validate.js";
import { usePageAnalytics } from "../hooks/useAnalytics.js";

const Register = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useI18n();
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: { governorate: "", wilayat: "" },
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  usePageAnalytics("Register");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        language === "ar" ? "هذا الحقل مطلوب" : "This field is required";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email =
        language === "ar"
          ? "يرجى إدخال بريد إلكتروني صحيح"
          : "Please enter a valid email";
    }

    if (!formData.phone || formData.phone.replace(/\s/g, "").length !== 8) {
      newErrors.phone =
        language === "ar"
          ? "يرجى إدخال رقم هاتف صحيح"
          : "Please enter a valid phone number";
    }

    if (!isPhoneVerified) {
      newErrors.phone =
        language === "ar"
          ? "يرجى التحقق من رقم الهاتف"
          : "Please verify your phone number";
    }

    if (!formData.location.governorate) {
      newErrors.location =
        language === "ar"
          ? "يرجى اختيار المحافظة"
          : "Please select governorate";
    }

    if (formData.password.length < 6) {
      newErrors.password =
        language === "ar"
          ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
          : "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        language === "ar"
          ? "كلمات المرور غير متطابقة"
          : "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Test button weight - add some delay to simulate processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const result = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        password: formData.password,
      });

      if (result.success) {
        navigate("/");
      } else {
        setErrors({ general: result.error });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhoneVerificationStart = async (phoneNumber) => {
    console.log(`Starting verification for ${phoneNumber}`);
    // In a real app, call your SMS API here
    return Promise.resolve();
  };

  const handlePhoneVerificationComplete = async (success) => {
    setIsPhoneVerified(success);
    if (success && errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
    return Promise.resolve();
  };

  const passwordStrength = formData.password.length >= 6;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${
        language === "ar" ? "rtl" : "ltr"
      }`}
    >
      {/* Top Bar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-sm border-b border-gray-100 px-4 py-3"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo and Website Name */}
          <div className="flex items-center gap-3">
            {/* Oman Flag */}
            <div className="w-8 h-6 bg-white border border-gray-200 rounded-sm overflow-hidden flex">
              {/* Vertical red stripe with emblem */}
              <div className="w-2 bg-red-600 flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
              {/* Horizontal stripes */}
              <div className="flex-1 flex flex-col">
                <div className="h-1/3 bg-white"></div>
                <div className="h-1/3 bg-red-600"></div>
                <div className="h-1/3 bg-green-600"></div>
              </div>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              {language === "ar" ? "سوق عمان" : "Oman Market"}
            </h1>
          </div>

          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <Globe className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              {language === "ar" ? "English" : "العربية"}
            </span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Section */}
            <motion.div
              initial={{ opacity: 0, x: language === "ar" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block"
            >
              <div
                className={`text-center lg:${
                  language === "ar" ? "text-right" : "text-left"
                }`}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className={`w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto ${
                    language === "ar" ? "lg:mr-0" : "lg:ml-0"
                  } mb-6`}
                >
                  <UserPlus className="h-12 w-12 text-white" />
                </motion.div>
                <h1
                  className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-4 ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {language === "ar" ? "انضم إلينا اليوم" : "Join Us Today"}
                </h1>
                <p
                  className={`text-xl text-gray-600 mb-8 leading-relaxed ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {language === "ar"
                    ? "أنشئ حسابك وابدأ في نشر إعلاناتك بسهولة وأمان"
                    : "Create your account and start posting ads easily and securely"}
                </p>

                {/* Features */}
                <div className="space-y-4">
                  <div
                    className={`flex items-center gap-3 ${
                      language === "ar" ? "flex-row" : ""
                    }`}
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-gray-700">
                      {language === "ar"
                        ? "نشر إعلانات مجانية"
                        : "Free ad posting"}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-3 ${
                      language === "ar" ? "flex-row" : ""
                    }`}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700">
                      {language === "ar"
                        ? "حماية وأمان كامل"
                        : "Complete protection & security"}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-3 ${
                      language === "ar" ? "flex-row" : ""
                    }`}
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-purple-600" />
                    </div>
                    <span className="text-gray-700">
                      {language === "ar"
                        ? "إدارة سهلة للحساب"
                        : "Easy account management"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: language === "ar" ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-12"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <UserPlus className="h-8 w-8 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {language === "ar" ? "إنشاء حساب جديد" : "Create Account"}
                </h2>
                <p className="text-gray-600">
                  {language === "ar"
                    ? "ابدأ رحلتك معنا اليوم"
                    : "Start your journey with us today"}
                </p>
              </div>

              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Alert
                    type="error"
                    message={errors.general}
                    onClose={() =>
                      setErrors((prev) => ({ ...prev, general: "" }))
                    }
                    className="mb-6"
                  />
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <FormInput
                    label={language === "ar" ? "الاسم الكامل" : "Full Name"}
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={
                      language === "ar"
                        ? "أدخل اسمك الكامل"
                        : "Enter your full name"
                    }
                    error={errors.name}
                    required
                    icon={User}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FormInput
                    label={
                      language === "ar" ? "البريد الإلكتروني" : "Email Address"
                    }
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder={
                      language === "ar"
                        ? "أدخل بريدك الإلكتروني"
                        : "Enter your email address"
                    }
                    error={errors.email}
                    required
                    icon={Mail}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <PhoneInput
                    value={formData.phone}
                    onChange={(value) => handleInputChange("phone", value)}
                    error={errors.phone}
                    required
                    showVerification={true}
                    onVerificationStart={handlePhoneVerificationStart}
                    onVerificationComplete={handlePhoneVerificationComplete}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <div className="relative">
                    <FormInput
                      label={language === "ar" ? "كلمة المرور" : "Password"}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      placeholder={
                        language === "ar"
                          ? "أدخل كلمة المرور"
                          : "Enter your password"
                      }
                      error={errors.password}
                      required
                      icon={Lock}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute ${
                        language === "ar" ? "left-3" : "right-3"
                      } top-10 text-gray-400 hover:text-gray-600 transition-colors duration-200`}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {formData.password && (
                    <div
                      className={`mt-2 flex items-center gap-2 ${
                        language === "ar" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordStrength ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                      <span
                        className={`text-sm ${
                          passwordStrength ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {passwordStrength
                          ? language === "ar"
                            ? "كلمة المرور قوية"
                            : "Strong password"
                          : language === "ar"
                          ? "كلمة المرور ضعيفة"
                          : "Weak password"}
                      </span>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <div className="relative">
                    <FormInput
                      label={
                        language === "ar"
                          ? "تأكيد كلمة المرور"
                          : "Confirm Password"
                      }
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      placeholder={
                        language === "ar"
                          ? "أعد إدخال كلمة المرور"
                          : "Re-enter your password"
                      }
                      error={errors.confirmPassword}
                      required
                      icon={Lock}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className={`absolute ${
                        language === "ar" ? "left-3" : "right-3"
                      } top-10 text-gray-400 hover:text-gray-600 transition-colors duration-200`}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full text-white flex items-center justify-center gap-2 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    loading={loading || isSubmitting}
                    disabled={loading || isSubmitting || !isPhoneVerified}
                  >
                    <UserPlus className="h-5 w-5" />
                    {loading || isSubmitting
                      ? language === "ar"
                        ? "جاري الإنشاء..."
                        : "Creating..."
                      : language === "ar"
                      ? "إنشاء حساب"
                      : "Create Account"}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="mt-8 text-center"
              >
                <p className="text-gray-600">
                  {language === "ar"
                    ? "لديك حساب بالفعل؟"
                    : "Already have an account?"}{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:text-primary-600 font-medium transition-colors duration-200 hover:underline"
                  >
                    {language === "ar" ? "تسجيل الدخول" : "Sign In"}
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
