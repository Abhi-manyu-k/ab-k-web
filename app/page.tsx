import { HeroSection } from "@/components/sections/HeroSection";
import { SituationSection } from "@/components/sections/SituationSection";
import { PracticesSection } from "@/components/sections/PracticesSection";
import { AutonomySection } from "@/components/sections/AutonomySection";
import { FieldNotesSection } from "@/components/sections/FieldNotesSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SituationSection />
      <PracticesSection />
      <AutonomySection />
      <FieldNotesSection />
      <CTASection />
    </>
  );
}
