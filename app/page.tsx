import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CoreConceptSection } from "@/components/sections/CoreConceptSection";
import { PlatformArchitectureSection } from "@/components/sections/PlatformArchitectureSection";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { LegacyExpertiseSection } from "@/components/sections/LegacyExpertiseSection";
import { TrustComplianceSection } from "@/components/sections/TrustComplianceSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <CoreConceptSection />
      <PlatformArchitectureSection />
      <UseCasesSection />
      <LegacyExpertiseSection />
      <TrustComplianceSection />
      <CTASection />
    </>
  );
}
