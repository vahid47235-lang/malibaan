import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getFeaturedTestimonials, getTestimonialsForService } from "@/lib/data/testimonials";
import type { Locale } from "@/i18n/config";

export function Testimonials({
  locale,
  eyebrow,
  title,
  serviceSlug,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  serviceSlug?: string;
}) {
  const testimonials = serviceSlug
    ? getTestimonialsForService(locale, serviceSlug)
    : getFeaturedTestimonials(locale);
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} align="center" />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col justify-between rounded-2xl border border-brand-line bg-brand-cream-50 p-7"
            >
              <blockquote className="text-[15px] leading-8 text-brand-ink-900">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-6 text-sm font-semibold text-brand-ink-600">{testimonial.name}</figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
