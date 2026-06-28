import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CoreConceptSection } from "@/components/sections/CoreConceptSection";
import { PlatformArchitectureSection } from "@/components/sections/PlatformArchitectureSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <CoreConceptSection />
      <PlatformArchitectureSection />
      <CTASection />
    </>
  );
}
