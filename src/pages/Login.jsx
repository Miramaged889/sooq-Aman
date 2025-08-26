import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  LogIn,
  User,
  Lock,
  Eye,
  EyeOff,
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useI18n } from "../hooks/useI18n.js";
import { useAuth } from "../hooks/useAuth.js";
import FormInput from "../components/forms/FormInput.jsx";
import Button from "../components/common/Button.jsx";
import Alert from "../components/common/Alert.jsx";
import { usePageAnalytics } from "../hooks/useAnalytics.js";

const Login = () => {
  const navigate = useNavigate();
  const { language } = useI18n();
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  usePageAnalytics("Login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(formData.email, formData.password);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Section */}
          <motion.div
            initial={{ opacity: 0, x: language === "ar" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className={`text-center lg:${language === "ar" ? "text-right" : "text-left"}`}>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6"
              >
                <LogIn className="h-12 w-12 text-white" />
              </motion.div>
              <h1 className={`text-4xl lg:text-5xl font-bold text-gray-900 mb-4 ${language === "ar" ? "text-right" : "text-left"}`}>
                {language === "ar" ? "مرحباً بعودتك" : "Welcome Back"}
              </h1>
              <p className={`text-xl text-gray-600 mb-8 leading-relaxed ${language === "ar" ? "text-right" : "text-left"}`}>
                {language === "ar"
                  ? "سجل دخولك للوصول إلى حسابك وإدارة إعلاناتك"
                  : "Sign in to access your account and manage your ads"}
              </p>

              {/* Features */}
              <div className="space-y-4">
                <div className={`flex items-center gap-3 ${language === "ar" ? "flex-row" : ""}`}>
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-gray-700">
                    {language === "ar"
                      ? "وصول سريع وآمن"
                      : "Quick & secure access"}
                  </span>
                </div>
                <div className={`flex items-center gap-3 ${language === "ar" ? "flex-row" : ""}`}>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    {language === "ar"
                      ? "حماية كاملة للبيانات"
                      : "Complete data protection"}
                  </span>
                </div>
                <div className={`flex items-center gap-3 ${language === "ar" ? "flex-row" : ""}`}>
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-gray-700">
                    {language === "ar"
                      ? "إدارة إعلاناتك بسهولة"
                      : "Manage your ads easily"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: language === "ar" ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-12"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <LogIn className="h-8 w-8 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {language === "ar" ? "تسجيل الدخول" : "Sign In"}
              </h2>
              <p className="text-gray-600">
                {language === "ar" ? "سجل دخولك للوصول إلى حسابك وإدارة إعلاناتك" : "Sign in to access your account and manage your ads"}
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Alert
                  type="error"
                  message={error}
                  onClose={() => setError("")}
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
                  label={language === "ar" ? "البريد الإلكتروني" : "Email Address"}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email address"}
                  required
                  icon={User}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
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
                      placeholder={language === "ar" ? "أدخل كلمة المرور" : "Enter your password"}
                    required
                    icon={Lock}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${language === "ar" ? "left-3" : "right-3"} top-10 text-gray-400 hover:text-gray-600 transition-colors duration-200`}
                  >
                    {showPassword ? (
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
                transition={{ delay: 0.3 }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                  loading={loading}
                >
                  <LogIn className="h-5 w-5" />
                  {loading 
                    ? (language === "ar" ? "جاري الدخول..." : "Logging in...")
                    : (language === "ar" ? "تسجيل الدخول" : "Sign In")
                  }
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <p className="text-gray-600">
                  {language === "ar" ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary-600 font-medium transition-colors duration-200 hover:underline inline-flex items-center gap-1 group"
                >
                  {language === "ar" ? "انشئ حسابًا" : "Create Account"}
                  {language === "ar" ? (
                    <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  )}
                </Link>
              </p>
            </motion.div>

            {/* Additional Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-8 border-t border-gray-100"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    {language === "ar" ? "تسجيل سريع" : "Quick Sign Up"}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    {language === "ar" ? "حماية كاملة" : "Full Protection"}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
