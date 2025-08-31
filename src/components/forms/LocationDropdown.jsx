import React, { useState, useRef, useEffect } from "react";
import { MapPin, ChevronDown, ChevronRight } from "lucide-react";
import { omanGovernorates } from "../../utils/regionsOM.js";
import { useI18n } from "../../hooks/useI18n.js";
import { useDeviceType } from "../../hooks/useResponsive.js";

const LocationDropdown = ({
  value = "",
  onChange,
  placeholder,
  className = "",
}) => {
  const { language } = useI18n();
  const deviceType = useDeviceType();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGovernorates, setExpandedGovernorates] = useState(new Set());
  const [selectedLocation, setSelectedLocation] = useState(value);
  const dropdownRef = useRef(null);

  const isMobile = deviceType.includes("mobile");
  const isRTL = language === "ar";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedLocation(value);
  }, [value]);

  const toggleGovernorate = (governorateId) => {
    const newExpanded = new Set(expandedGovernorates);
    if (newExpanded.has(governorateId)) {
      newExpanded.delete(governorateId);
    } else {
      newExpanded.add(governorateId);
    }
    setExpandedGovernorates(newExpanded);
  };

  const handleLocationSelect = (locationId) => {
    setSelectedLocation(locationId);
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { value: locationId } });
    }
  };

  const getSelectedLocationName = () => {
    if (!selectedLocation) return "";

    // Check if it's a governorate
    const governorate = omanGovernorates.find((g) => g.id === selectedLocation);
    if (governorate) {
      return governorate.name[language];
    }

    // Check if it's a wilayat
    for (const gov of omanGovernorates) {
      const wilayat = gov.wilayats.find((w) => w.id === selectedLocation);
      if (wilayat) {
        return wilayat.name[language];
      }
    }

    return selectedLocation;
  };

  return (
    <div
      className={`relative ${className}`}
      ref={dropdownRef}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Dropdown Trigger */}
      <div
        className={`flex items-center cursor-pointer py-3 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary bg-white hover:border-gray-400 transition-colors ${
          isMobile ? "min-w-[180px] text-sm" : "min-w-[200px]"
        } ${isRTL ? "pr-10 pl-8" : "pl-10 pr-8"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MapPin
          className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 ${
            isRTL ? "right-3" : "left-3"
          }`}
        />
        <span
          className={`flex-1 ${
            !selectedLocation ? "text-gray-500" : "text-gray-900"
          } ${isRTL ? "text-right" : "text-left"}`}
        >
          {selectedLocation ? getSelectedLocationName() : placeholder}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 overflow-y-auto ${
            isMobile ? "max-h-64" : "max-h-80"
          }`}
        >
          {/* All Locations Option */}
          <div
            className={`px-4 py-3 text-gray-900 hover:bg-blue-50 cursor-pointer border-b border-gray-100 ${
              isMobile ? "text-xs" : "text-sm"
            }`}
            onClick={() => handleLocationSelect("")}
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-600">
                {language === "ar" ? "جميع المناطق" : "All Locations"}
              </span>
            </div>
          </div>

          {/* Governorates with Wilayats */}
          {omanGovernorates.map((governorate) => (
            <div
              key={governorate.id}
              className="border-b border-gray-50 last:border-b-0"
            >
              {/* Governorate Header */}
              <div
                className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer group ${
                  isMobile ? "text-xs py-2" : "text-sm py-3"
                }`}
                onClick={() => toggleGovernorate(governorate.id)}
              >
                <div
                  className="flex items-center gap-2 flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocationSelect(governorate.id);
                  }}
                >
                  <span className="font-semibold text-gray-800 group-hover:text-blue-600">
                    {governorate.name[language]}
                  </span>
                </div>
                <ChevronRight
                  className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                    expandedGovernorates.has(governorate.id) ? "rotate-90" : ""
                  }`}
                />
              </div>

              {/* Wilayats List */}
              {expandedGovernorates.has(governorate.id) && (
                <div className="bg-gray-25">
                  {governorate.wilayats.map((wilayat) => (
                    <div
                      key={wilayat.id}
                      className={`flex items-center gap-3 text-gray-700 hover:bg-blue-50 cursor-pointer group border-l-2 border-transparent hover:border-blue-300 transition-all duration-150 ${
                        isMobile ? "px-6 py-2 text-xs" : "px-8 py-2.5 text-sm"
                      }`}
                      onClick={() => handleLocationSelect(wilayat.id)}
                    >
                      <span className="group-hover:text-blue-700 group-hover:font-medium transition-all duration-150">
                        {wilayat.name[language]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationDropdown;
