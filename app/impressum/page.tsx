import { LegalPage } from "@/components/ui/LegalPage";
import { Tbd } from "@/components/ui/Tbd";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Impressum",
  description: "Impressum (legal notice) for ab-k.com according to § 5 DDG and § 18 Abs. 2 MStV.",
  path: "/impressum",
});

/*
 * TODO(launch): fill in every [TBD] below. Do not publish the site before this page is complete.
 * Have the final text checked — this page is a structure, not legal advice.
 */
export default function ImpressumPage() {
  return (
    <LegalPage
      sheet="L1"
      eyebrow="Impressum · Legal notice"
      title={<>Impressum</>}
      description="Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Abs. 2 Medienstaatsvertrag (MStV)."
    >
      <h2>Diensteanbieter</h2>
      <p>
        <Tbd>Vollständiger Name</Tbd>
        <br />
        {siteConfig.name} <Tbd>Rechtsform / Zusatz, falls zutreffend</Tbd>
        <br />
        <Tbd>Straße und Hausnummer</Tbd>
        <br />
        <Tbd>PLZ und Ort</Tbd>
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <Tbd>E-Mail-Adresse</Tbd>
        <br />
        <Tbd>Zweiter schneller Kontaktweg, z. B. Telefonnummer</Tbd>
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        <Tbd>USt-IdNr. gemäß § 27a UStG — nur falls vorhanden, sonst Abschnitt entfernen</Tbd>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        <Tbd>Name der verantwortlichen Person</Tbd>
        <br />
        <Tbd>Anschrift der verantwortlichen Person</Tbd>
      </p>

      <h2>Hinweis</h2>
      <p>
        Die Inhalte dieser Website geben ausschließlich meine persönliche Meinung wieder und nicht die
        meines Arbeitgebers. Externe Links führen zu Inhalten Dritter, für die deren Anbieter
        verantwortlich sind.
      </p>
    </LegalPage>
  );
}
