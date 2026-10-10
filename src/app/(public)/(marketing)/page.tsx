import EquipmentCategories from "@/components/modules/home-page/equipment-categories";
import FeaturedEquipment from "@/components/modules/home-page/featured-equipments";
import HeroSection from "@/components/modules/home-page/hero";
import HowItWorks from "@/components/modules/home-page/how-it-works";
import ProviderCTA from "@/components/modules/home-page/ProviderCTA";
import Testimonials from "@/components/modules/home-page/Testimonials";
import TrustFeatures from "@/components/modules/home-page/trust-features";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <TrustFeatures />
      <EquipmentCategories />
      <FeaturedEquipment />
      <HowItWorks />
      <ProviderCTA />
      <Testimonials />
    </div>
  );
}
