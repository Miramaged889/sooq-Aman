import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Crown, CreditCard, Star, CheckCircle } from "lucide-react";
import { useI18n } from "../hooks/useI18n.js";
import { useAuth } from "../hooks/useAuth.js";
import Container from "../components/layout/Container.jsx";
import PlanSelector from "../components/plans/PlanSelector.jsx";
import DurationSelector from "../components/plans/DurationSelector.jsx";
import SummaryCard from "../components/plans/SummaryCard.jsx";
import Button from "../components/common/Button.jsx";
import Alert from "../components/common/Alert.jsx";
import { subscriptionPlans } from "../utils/mockData.js";
import { usePageAnalytics } from "../hooks/useAnalytics.js";

const Subscribe = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("30");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  usePageAnalytics("Subscribe");

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) {
      setError(t("subscribe.selectPlan"));
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Mock subscription process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, this would process payment and update user subscription
      navigate("/", {
        state: { message: t("subscribe.success") },
      });
    } catch {
      setError(t("subscribe.error"));
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container className="py-8">
        <div className="text-center">
          <Alert
            type="warning"
            message={t("subscribe.loginRequired")}
            className="mb-6"
          />
          <Button variant="primary" onClick={() => navigate("/login")}>
            {t("auth.login")}
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Crown className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold text-gray-900">
                {t("subscribe.title")}
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("subscribe.subtitle")}
            </p>
          </div>

          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError("")}
              className="mb-8"
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Plan Selection */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {t("subscribe.choosePlan")}
                  </h2>
                </div>
                <PlanSelector
                  selectedPlan={selectedPlan}
                  onPlanSelect={handlePlanSelect}
                />
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">
                    {t("subscribe.chooseDuration")}
                  </h2>
                </div>
                <DurationSelector
                  selectedDuration={selectedDuration}
                  onDurationSelect={handleDurationSelect}
                />
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <SummaryCard plan={selectedPlan} duration={selectedDuration} />

                <div className="mt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleSubscribe}
                    loading={loading}
                    disabled={!selectedPlan}
                  >
                    <CreditCard className="h-5 w-5" />
                    {t("subscribe.subscribe")}
                  </Button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    {t("subscribe.securePayment")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Comparison */}
          <div className="mt-16">
            <div className="flex items-center justify-center gap-3 mb-12">
              <CheckCircle className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-center">
                {t("subscribe.featuress")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white rounded-lg shadow-sm border p-6"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    {plan.name[t.language]}
                  </h3>
                  <ul className="space-y-3">
                    {plan.features[t.language].map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Subscribe;
