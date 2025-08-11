import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects, getProjectBySlug } from "../../../lib/project";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const proj = getProjectBySlug(params.slug);
  if (!proj) return { title: "Case study" };
  const title = `${proj.title} · Case Study`;
  const description = proj.overview ?? proj.story ?? proj.tag;
  const og = proj.img?.startsWith("http") ? proj.img : proj.img || "/og.jpg";
  return {
    title,
    description,
    openGraph: { title, description, images: [og] },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const proj = getProjectBySlug(params.slug);
  if (!proj) {
    return (
      <div className="container-px mx-auto py-16">
        <h1 className="text-2xl font-semibold">Project not found</h1>
        <p className="mt-2 text-black/60">The case study you requested does not exist.</p>
        <Link href="/#work" className="btn btn-primary mt-6">Back to work</Link>
      </div>
    );
  }

  return (
    <article className="bg-white">
      {/* Hero */}
      <section className="container-px mx-auto max-w-5xl py-12">
        <div className="mb-3">
          <Link href="/#work" className="text-sm text-black/60 hover:underline">← Back to work</Link>
        </div>

        <div className="badge mb-3">Case study</div>
        <h1 className="text-3xl sm:text-4xl font-bold">{proj.title}</h1>
        <p className="mt-2 text-black/60">{proj.tag}</p>

        {/* Hero media */}
      {/* Hero media */}
<div className="card mt-6 overflow-hidden">
  <div className="relative w-full">
    <Image
      src={proj.img}
      alt={`${proj.title} cover`}
      width={1600} // use a large width so it's sharp
      height={900} // fallback height
      className="w-full h-auto object-contain" // ensures full image shows
      priority
    />
  </div>
</div>


        {/* Quick stats + links */}
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="card p-4">
            <div className="text-xs text-black/60">Category</div>
            <div className="mt-1 font-semibold">{proj.category === "app" ? "App" : "Website"}</div>
          </div>
          <div className="card p-4">
            <div className="text-xs text-black/60">Stack</div>
            <div className="mt-1 font-semibold">{proj.tag}</div>
          </div>
          <div className="card p-4">
            <div className="text-xs text-black/60">Demo</div>
            <div className="mt-1">
              <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-700)] hover:underline">
                Open live demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="container-px mx-auto max-w-5xl pb-12">
        {proj.overview && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-2 text-black/70">{proj.overview}</p>
          </div>
        )}

        {proj.problem && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">The problem</h2>
            <p className="mt-2 text-black/70">{proj.problem}</p>
          </div>
        )}

        {proj.approach?.length ? (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Approach</h2>
            <ul className="mt-3 space-y-2 text-black/70">
              {proj.approach.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--brand-600)]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {proj.tech?.length ? (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Tech stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {proj.tech.map((t) => (
                <span key={t} className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-black/70">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {proj.results?.length ? (
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Results</h2>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {proj.results.map((r) => (
                <div key={r.label} className="card p-4 text-center">
                  <div className="text-2xl font-bold">{r.value}</div>
                  <div className="text-xs text-black/60 mt-1">{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* Gallery */}
      {proj.gallery?.length ? (
        <section className="container-px mx-auto max-w-6xl pb-14">
          <h2 className="text-xl font-semibold">Gallery</h2>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {proj.gallery.map((g) => (
              <div key={g.src} className="card overflow-hidden">
                <div className="relative w-full aspect-[16/10]">
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* CTA */}
      <section className="bg-[var(--ink-800)]">
        <div className="container-px mx-auto max-w-5xl py-10 text-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm text-white/70">Want something similar?</div>
              <h3 className="text-lg font-semibold">Let’s build your next project</h3>
            </div>
            <div className="flex gap-3">
              {proj.demo && (
                <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="btn bg-white text-[var(--ink-800)] hover:bg-white/90">
                  View demo
                </a>
              )}
              <Link href="/contact" className="btn btn-primary">Get a quote</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
