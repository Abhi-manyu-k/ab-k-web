import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export function LegalPage({
  sheet,
  eyebrow,
  title,
  description,
  children,
}: {
  sheet: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero sheet={sheet} eyebrow={eyebrow} title={title} description={description} />
      <section className="py-16 lg:py-24">
        <Container>
          <div lang="de" className="prose-sheet mx-auto max-w-3xl">
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}
