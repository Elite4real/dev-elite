import Reveal from "./Reveal";

const items = [
  { title: "Web design", desc: "Marketing sites & landing pages.", meta: "Figma • Tailwind • Motion" },
  { title: "Mobile app", desc: "React Native apps with smooth UX.", meta: "Expo • RN • Zustand" },
  { title: "UI/UX design", desc: "Design systems & prototypes.", meta: "Figma • Tokens • DS" },
  { title: "Graphics design", desc: "Product visuals & collaterals.", meta: "Illustrator • PS" },
];

export default function Services() {
  return (
    <section id="services" className="container-narrow">
      <Reveal><h2 className="section-title">My services</h2></Reveal>
      <Reveal delay={0.05}><p className="section-sub">I design and build interfaces that convert and scale.</p></Reveal>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.06}>
            <article className="card p-5 card-hover relative overflow-hidden">
              <div className="absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-[#6C63FF] via-[#E879F9] to-[#14B8A6] opacity-70" />
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef0ff] text-[#4b45d1]">
                <span>▢</span>
              </div>
              <h3 className="font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm text-neutral-500">{it.desc}</p>
              <div className="mt-4 text-xs text-neutral-400">{it.meta}</div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
