import { HeroSection } from "../../components/external-pages/HeroSection";
import { FeaturesSection } from "../../components/external-pages/FeaturesSection";
import { StepsSection } from "../../components/external-pages/StepsSection";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <HeroSection />
      <FeaturesSection />
      <StepsSection />
    </div>
  );
}
