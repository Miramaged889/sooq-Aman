import React from "react";
import { Filter, X } from "lucide-react";
import { useI18n } from "../../hooks/useI18n.js";
import { categories } from "../../utils/mockData.js";
import { omanRegions } from "../../utils/regionsOM.js";
import Button from "../common/Button.jsx";

const Filters = ({ filters, onFilterChange, onClearFilters, className = "" }) => {
  const { t, language } = useI18n();

  const handleFilterChange = (key, value) => {
    onFilterChange({ [key]: value });
  };

  const handlePriceChange = (type, value) => {
    const newFilters = { ...filters };
    if (type === 'min') {
      newFilters.priceMin = value;
    } else {
      newFilters.priceMax = value;
    }
    onFilterChange(newFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "");

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {t("filters.title")}
          </h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            {t("filters.clear")}
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("filters.category")}
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="input-field w-full"
          >
            <option value="">{t("filters.allCategories")}</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name[language]}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("filters.location")}
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="input-field w-full"
          >
            <option value="">{t("filters.allLocations")}</option>
            {omanRegions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name[language]}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("filters.priceRange")}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder={t("filters.minPrice")}
              value={filters.priceMin || ""}
              onChange={(e) => handlePriceChange("min", e.target.value)}
              className="input-field"
              min="0"
            />
            <input
              type="number"
              placeholder={t("filters.maxPrice")}
              value={filters.priceMax || ""}
              onChange={(e) => handlePriceChange("max", e.target.value)}
              className="input-field"
              min="0"
            />
          </div>
          {(filters.priceMin || filters.priceMax) && (
            <div className="mt-2 text-xs text-gray-500">
              {filters.priceMin && filters.priceMax && (
                <span>{t("filters.priceRange")}: {filters.priceMin} - {filters.priceMax} OMR</span>
              )}
              {filters.priceMin && !filters.priceMax && (
                <span>{t("filters.minPrice")}: {filters.priceMin} OMR</span>
              )}
              {!filters.priceMin && filters.priceMax && (
                <span>{t("filters.maxPrice")}: {filters.priceMax} OMR</span>
              )}
            </div>
          )}
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("filters.sortBy")}
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            className="input-field w-full"
          >
            <option value="newest">{t("filters.newest")}</option>
            <option value="oldest">{t("filters.oldest")}</option>
            <option value="price-low">{t("filters.priceLow")}</option>
            <option value="price-high">{t("filters.priceHigh")}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
