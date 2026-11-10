import { HeroSection } from "@/components/sections/HeroSection";
import { NotesSection } from "@/components/sections/NotesSection";
import { SituationSection } from "@/components/sections/SituationSection";
import { PracticesSection } from "@/components/sections/PracticesSection";
import { AutonomySection } from "@/components/sections/AutonomySection";
import { TrackRecordSection } from "@/components/sections/TrackRecordSection";
import { CTASection } from "@/components/sections/CTASection";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  description: siteConfig.description,
  path: "/",
  ogTitle: "Agents that act. Governance that holds. — Abhimanyu Kanwar",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <NotesSection />
      <SituationSection />
      <PracticesSection />
      <AutonomySection />
      <TrackRecordSection />
      <CTASection />
    </>
  );
}
