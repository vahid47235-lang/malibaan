import { Container } from "@/components/ui/container";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-green-950 py-16 text-white sm:py-20">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-35deg, white 0px, white 3px, transparent 3px, transparent 26px)",
        }}
      />
      <Container className="relative">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold tracking-wide text-brand-mint-400">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-lg leading-8 text-white/70">{description}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
