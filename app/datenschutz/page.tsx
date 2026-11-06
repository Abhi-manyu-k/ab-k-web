import Link from "next/link";
import { LegalPage } from "@/components/ui/LegalPage";
import { Tbd } from "@/components/ui/Tbd";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Datenschutz",
  description:
    "Datenschutzerklärung (privacy notice) for ab-k.com: hosting, contact form and e-mail. No cookies, no analytics, no tracking, fonts self-hosted.",
  path: "/datenschutz",
});

/*
 * Based on an audit of this codebase (Nov 2026): the site uses NO cookies, NO analytics or tracking,
 * NO third-party embeds (video, maps, social plugins), NO localStorage, and NO externally loaded fonts or
 * scripts. Fonts are self-hosted from app/fonts. Third parties involved: Netlify (hosting + Netlify Forms)
 * and the e-mail provider for strategy@ab-k.com.
 * If you add analytics, embeds or a newsletter later, this page must be updated first.
 *
 * TODO(launch): fill in every [TBD] and have the final text checked — this is a structure, not legal advice.
 */
export default function DatenschutzPage() {
  return (
    <LegalPage
      sheet="L2"
      eyebrow="Datenschutz · Privacy notice"
      title={<>Datenschutz&shy;erklärung</>}
      description="Kurzfassung: Diese Website setzt keine Cookies, verwendet keine Analyse- oder Tracking-Dienste und lädt keine Inhalte von Drittanbietern. Schriften werden lokal ausgeliefert."
    >
      <h2>1. Verantwortlicher</h2>
      <p>
        <Tbd>Vollständiger Name</Tbd>
        <br />
        <Tbd>Straße und Hausnummer</Tbd>
        <br />
        <Tbd>PLZ und Ort</Tbd>
        <br />
        E-Mail: <Tbd>E-Mail-Adresse</Tbd>
      </p>

      <h2>2. Hosting und Server-Logfiles</h2>
      <p>
        Diese Website wird als statische Website bei Netlify, Inc., USA{" "}
        <Tbd>Anschrift laut Netlify-Impressum/DPA</Tbd>, gehostet. Beim Aufruf der Website verarbeitet Netlify technisch notwendige Daten, insbesondere
        IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Referrer-URL sowie Browser- und
        Betriebssysteminformationen (Server-Logfiles). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an einem sicheren und stabilen Betrieb der Website).
      </p>
      <p>
        Mit Netlify besteht ein Auftragsverarbeitungsvertrag <Tbd>bestätigen</Tbd>. Für Übermittlungen in
        die USA stützt sich Netlify auf das EU-U.S. Data Privacy Framework bzw. Standardvertragsklauseln{" "}
        <Tbd>aktuellen Status prüfen</Tbd>. Speicherdauer der Logfiles: <Tbd>laut Netlify prüfen</Tbd>.
      </p>

      <h2>3. Kontaktformular</h2>
      <p>
        Wenn Sie das <Link href="/contact">Kontaktformular</Link> nutzen, werden Name, E-Mail-Adresse, optional
        Organisation, das gewählte Thema und Ihre Nachricht über den Dienst Netlify Forms übermittelt und
        dort gespeichert. Ich verwende diese Daten ausschließlich zur Beantwortung Ihrer Anfrage.
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anfrage zu einer Zusammenarbeit oder einem Vortrag)
        bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Die Daten
        werden gelöscht, sobald die Anfrage abschließend bearbeitet ist <Tbd>Löschfrist festlegen</Tbd>,
        sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>

      <h2>4. Kontakt per E-Mail</h2>
      <p>
        Wenn Sie mir eine E-Mail schreiben, verarbeite ich Ihre E-Mail-Adresse und den Inhalt Ihrer
        Nachricht zur Beantwortung. Die E-Mails werden bei meinem E-Mail-Anbieter{" "}
        <Tbd>Name und Anschrift des E-Mail-Anbieters</Tbd> gespeichert. Rechtsgrundlage wie unter Ziffer 3.
      </p>

      <h2>5. Schriftarten</h2>
      <p>
        Die Schriften Fraunces, IBM Plex Sans und IBM Plex Mono werden lokal von diesem Server ausgeliefert.
        Es wird keine Verbindung zu Google Fonts oder anderen Schriftanbietern hergestellt.
      </p>

      <h2>6. Keine Cookies, keine Analyse, keine Einbettungen</h2>
      <p>
        Diese Website setzt keine Cookies und verwendet keine Web-Analyse-, Tracking- oder
        Marketing-Dienste. Es werden keine Videos, Karten oder Social-Media-Plugins eingebettet. Links zu
        anderen Websites (z. B. LinkedIn oder Quellenangaben) sind einfache Hyperlinks; erst wenn Sie einen
        solchen Link anklicken, gelten die Datenschutzbestimmungen des jeweiligen Anbieters. Der RSS-Feed
        ist eine statische Datei und erhebt keine personenbezogenen Daten.
      </p>

      <h2>7. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17),
        Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen
        Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21). Wenden Sie sich dazu an die
        oben genannte Adresse.
      </p>
      <p>
        Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, z. B. bei
        der für Ihren Wohnort oder meinen Sitz zuständigen Behörde{" "}
        <Tbd>zuständige Aufsichtsbehörde laut Anschrift, in NRW: LDI NRW</Tbd>.
      </p>

      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
        Stand: <Tbd>Datum</Tbd>
      </p>
    </LegalPage>
  );
}
