import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Plus, FileText, Upload } from "lucide-react";
import { useI18n } from "../hooks/useI18n.js";
import { useAds } from "../hooks/useAds.js";
import { useAuth } from "../hooks/useAuth.js";
import Container from "../components/layout/Container.jsx";
import FormInput from "../components/forms/FormInput.jsx";
import FormSelect from "../components/forms/FormSelect.jsx";
import FormTextarea from "../components/forms/FormTextarea.jsx";
import FormToggle from "../components/forms/FormToggle.jsx";
import UploadField from "../components/forms/UploadField.jsx";
import Button from "../components/common/Button.jsx";
import Alert from "../components/common/Alert.jsx";
import { categories } from "../utils/mockData.js";
import { omanRegions } from "../utils/regionsOM.js";
import {
  validateAdTitle,
  validateAdDescription,
  validateAdPrice,
} from "../utils/validate.js";
import { usePageAnalytics } from "../hooks/useAnalytics.js";

const CreateAd = () => {
  const navigate = useNavigate();
  const { t, language } = useI18n();
  const { createAd } = useAds();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    categoryId: "",
    locationId: "",
    images: [],
    featured: false,
    delivery: false,
  });

  const [errors, setErrors] = useState({});

  usePageAnalytics("CreateAd");

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!validateAdTitle(formData.title)) {
        newErrors.title = t("validation.adTitle");
      }
      if (!validateAdDescription(formData.description)) {
        newErrors.description = t("validation.adDescription");
      }
      if (!validateAdPrice(formData.price)) {
        newErrors.price = t("validation.adPrice");
      }
      if (!formData.categoryId) {
        newErrors.categoryId = t("validation.category");
      }
      if (!formData.locationId) {
        newErrors.locationId = t("validation.location");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setLoading(true);
    setError("");

    try {
      const adData = {
        ...formData,
        sellerId: user?.id,
        sellerName: user?.name,
        sellerJoined: user?.createdAt,
        phone: user?.phone,
      };

      const newAd = createAd(adData);
      navigate(`/ad/${newAd.id}`);
    } catch {
      setError(t("createAd.error"));
    } finally {
      setLoading(false);
    }
  };

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name[language],
  }));

  const locationOptions = omanRegions.map((region) => ({
    value: region.id,
    label: region.name[language],
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Plus className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-gray-900">
                {t("createAd.title")}
              </h1>
            </div>
            <p className="text-gray-600">{t("createAd.subtitle")}</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div
                className={`w-16 h-1 mx-2 ${
                  step >= 2 ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError("")}
              className="mb-6"
            />
          )}

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">
                  {t("createAd.basicInfo")}
                </h2>
              </div>

              <FormInput
                label={t("createAd.fields.title")}
                name="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder={t("createAd.fields.titlePlaceholder")}
                error={errors.title}
                required
              />

              <FormSelect
                label={t("createAd.fields.category")}
                name="categoryId"
                value={formData.categoryId}
                onChange={(e) =>
                  handleInputChange("categoryId", e.target.value)
                }
                options={categoryOptions}
                placeholder={t("createAd.selectCategory")}
                error={errors.categoryId}
                required
              />

              <FormTextarea
                label={t("createAd.fields.description")}
                name="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder={t("createAd.fields.descriptionPlaceholder")}
                error={errors.description}
                rows={4}
                required
              />

              <FormInput
                label={t("createAd.fields.price")}
                name="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder={t("createAd.fields.pricePlaceholder")}
                error={errors.price}
                required
              />

              <FormSelect
                label={t("createAd.fields.location")}
                name="locationId"
                value={formData.locationId}
                onChange={(e) =>
                  handleInputChange("locationId", e.target.value)
                }
                options={locationOptions}
                placeholder={t("createAd.selectLocation")}
                error={errors.locationId}
                required
              />

              <div className="flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={loading}
                >
                  {t("createAd.next")}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Media & Options */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Upload className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">
                  {t("createAd.mediaOptions")}
                </h2>
              </div>

              <UploadField
                label={t("createAd.fields.images")}
                name="images"
                value={formData.images}
                onChange={(files) => handleInputChange("images", files)}
                accept="image/*"
                multiple
                maxFiles={5}
                required
              />

              <div className="space-y-4">
                <FormToggle
                  label={t("createAd.plan.featured")}
                  name="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    handleInputChange("featured", e.target.checked)
                  }
                  description={t("createAd.featuredDescription")}
                />

                <FormToggle
                  label={t("createAd.fields.delivery")}
                  name="delivery"
                  checked={formData.delivery}
                  onChange={(e) =>
                    handleInputChange("delivery", e.target.checked)
                  }
                  description={t("createAd.deliveryDescription")}
                />
              </div>

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={loading}
                >
                  {t("createAd.back")}
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={loading}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  {t("createAd.publish")}
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </div>
  );
};

export default CreateAd;
