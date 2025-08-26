import { useContext } from "react";
import { AdsContext } from "../context/AdsContext.jsx";

export const useAds = () => {
  const context = useContext(AdsContext);
  if (!context) {
    throw new Error("useAds must be used within an AdsProvider");
  }
  return context;
};
