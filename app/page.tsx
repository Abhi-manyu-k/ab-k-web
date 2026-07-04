import { HeroSection } from "@/components/sections/HeroSection";
import { CoreConceptSection } from "@/components/sections/CoreConceptSection";
import { PlatformArchitectureSection } from "@/components/sections/PlatformArchitectureSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CoreConceptSection />
      <PlatformArchitectureSection />
      <CTASection />
    </>
  );
}
