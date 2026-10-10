import EquipmentCategories from "@/components/modules/home-page/equipment-categories";
import HeroSection from "@/components/modules/home-page/hero";
import TrustFeatures from "@/components/modules/home-page/trust-features";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <TrustFeatures />
      <EquipmentCategories />
    </div>
  );
}
