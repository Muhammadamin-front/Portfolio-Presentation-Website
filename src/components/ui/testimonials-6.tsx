import type { ComponentProps } from "react";
import { AntiMetalButton } from "@/components/ui/anti-metal-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  image: string;
  name: string;
  role: string;
  company?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Jarayon boshidan oxirigacha aniq bo'ldi. Sayt tez ishlaydi va mobil qurilmalarda ham juda qulay.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80",
    name: "Dilnoza A.",
    role: "Marketing rahbari",
    company: "Xizmatlar sohasi",
  },
  {
    quote:
      "Murakkab g'oyamiz sodda va tushunarli mahsulotga aylandi. Har bir bosqichda natijani ko'rib bordik.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    name: "Sardor K.",
    role: "Loyiha rahbari",
    company: "EdTech",
  },
  {
    quote:
      "Telegram bot kundalik qo'l mehnatini sezilarli kamaytirdi. Admin panel ham jamoamiz uchun qulay.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80",
    name: "Madina R.",
    role: "Operatsion menejer",
    company: "Savdo",
  },
  {
    quote:
      "Dizayn premium ko'rinadi, lekin foydalanish oddiy. Aynan mijozlarimizga kerak bo'lgan muvozanat.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80",
    name: "Javohir T.",
    role: "Mahsulot egasi",
    company: "Fintech",
  },
  {
    quote:
      "Texnik savollar oddiy tilda tushuntirildi. Ishga tushirishdan keyingi yordam ham juda tezkor.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    name: "Nilufar B.",
    role: "Direktor",
    company: "Ta'lim markazi",
  },
  {
    quote:
      "Yangi platforma bilan murojaatlar tartibga tushdi va jamoaning ishlash tezligi oshdi.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    name: "Aziz M.",
    role: "Biznes rivojlantirish",
    company: "B2B",
  },
  {
    quote:
      "Natija biz kutganimizdan ham toza chiqdi. Sahifalar tez ochiladi va kontentni boshqarish oson.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
    name: "Shahnoza E.",
    role: "Kontent menejeri",
    company: "Media",
  },
  {
    quote:
      "Muddat, dizayn va funksiyalar bo'yicha hammasi kelishilganidek yetkazildi. Muloqot doim aniq edi.",
    image:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=160&q=80",
    name: "Temur S.",
    role: "Asoschi",
    company: "Startup",
  },
  {
    quote:
      "Mobil interfeys mijozlarimiz uchun ancha qulaylashdi. Eng muhimi, mahsulot real vazifani yechadi.",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=160&q=80",
    name: "Kamola N.",
    role: "CX mutaxassisi",
    company: "E-commerce",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export function TestimonialsSection() {
  return (
    <section className="testimonials-section relative">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 text-center">
          <div className="testimonial-kicker rounded-full border border-[var(--line-strong)] bg-[var(--accent-dim)] px-4 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--accent-soft)]">
            Mijozlar fikri
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-[-0.035em] text-[var(--ink)] lg:text-4xl">
            Hamkorlar nima deydi
          </h2>
          <p className="max-w-md text-sm leading-6 text-[var(--ink-soft)]">
            Yaxshi mahsulot chiroyli ko'rinishdan tashqari, kundalik vazifani
            ham yengillashtirishi kerak.
          </p>
        </div>

        <div
          className={cn(
            "mt-12 flex max-h-[40rem] justify-center gap-6 overflow-hidden",
            "[mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]",
          )}
        >
          <InfiniteSlider direction="vertical" speed={30} speedOnHover={15}>
            {firstColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>
          <InfiniteSlider
            className="hidden md:block"
            direction="vertical"
            speed={50}
            speedOnHover={25}
          >
            {secondColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>
          <InfiniteSlider
            className="hidden lg:block"
            direction="vertical"
            speed={35}
            speedOnHover={17}
          >
            {thirdColumn.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </InfiniteSlider>
        </div>

        <div className="mt-10 flex justify-center">
          <AntiMetalButton
            className="w-52"
            label="Loyihani boshlash"
            accentFrom="#f4a868"
            accentTo="#e8722e"
            onClick={() =>
              document.getElementById("aloqa")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialsCard({
  testimonial,
  className,
  ...props
}: ComponentProps<"figure"> & {
  testimonial: Testimonial;
}) {
  const { quote, image, name, role, company } = testimonial;

  return (
    <figure
      className={cn(
        "testimonial-card w-full max-w-xs rounded-3xl border border-[var(--line-mid)] bg-[var(--surface)]/90 p-7 text-[var(--ink)] shadow-2xl shadow-black/15 backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      <span className="mb-4 block font-serif text-4xl leading-4 text-[var(--accent)]/70" aria-hidden="true">
        “
      </span>
      <blockquote className="text-[0.92rem] leading-6 text-[var(--ink-soft)]">
        {quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--line)] pt-5">
        <Avatar className="size-9 rounded-full ring-1 ring-[var(--line-strong)]">
          <AvatarImage alt={`${name} profil rasmi`} src={image} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-col">
          <cite className="truncate font-medium not-italic leading-5 tracking-tight">
            {name}
          </cite>
          <span className="truncate text-xs leading-5 text-[var(--ink-mute)]">
            {role} {company && `· ${company}`}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

export default TestimonialsSection;
