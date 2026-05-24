import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { TeaserSections } from "@/components/sections/TeaserSections";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <TeaserSections />
      <CTASection />
    </>
  );
}
