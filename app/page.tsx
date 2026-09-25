import { HeroSection } from "@/components/sections/HeroSection";
import { ShiftSection } from "@/components/sections/ShiftSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { RosterSection } from "@/components/sections/RosterSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ShiftSection />
      <PlatformSection />
      <RosterSection />
      <ProofSection />
      <CTASection />
    </>
  );
}
