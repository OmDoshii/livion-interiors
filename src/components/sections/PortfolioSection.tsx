"use client";

import { useScrollAnimation, animClass } from "@/hooks/useScrollAnimation";

const projects = [
  { title: "Modern 3BHK",   location: "Gachibowli",   size: "1,450 sq ft", tag: "3BHK",  col: "lg:col-span-2" },
  { title: "Compact 2BHK",  location: "Kondapur",     size: "1,050 sq ft", tag: "2BHK",  col: "" },
  { title: "Premium Villa", location: "Jubilee Hills", size: "3,200 sq ft", tag: "Villa", col: "" },
  { title: "Luxury 3BHK",   location: "Banjara Hills", size: "1,800 sq ft", tag: "3BHK",  col: "lg:col-span-2" },
];

function ProjectCard({ project, idx }: { project: typeof projects[0]; idx: number }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`relative group overflow-hidden bg-cream-300 ${project.col}
                  ${animClass(isVisible, "scale-up", idx * 100)}`}
      style={{ borderRadius: "2px" }}
    >
      {/* Image placeholder */}
      <div className="absolute inset-0 bg-cream-300 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xs text-cream-400 tracking-widest uppercase mb-1">Project Image</p>
          <p className="text-xs text-cream-300">1200 × 900px</p>
        </div>
      </div>

      {/* Overlay — slides up on hover */}
      <div className="absolute inset-0 bg-charcoal/75 translate-y-full group-hover:translate-y-0
                      transition-transform duration-500 ease-out flex flex-col justify-end p-6 z-10">
        <span className="text-[10px] tracking-[0.2em] uppercase text-gold mb-2
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
          {project.tag}
        </span>
        <h3 className="font-display text-2xl text-cream-100 mb-1
                       translate-y-4 group-hover:translate-y-0 transition-transform duration-400 delay-100">
          {project.title}
        </h3>
        <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-400 delay-150">
          <p className="text-xs text-cream-300">{project.location}</p>
          <p className="text-xs text-cream-300">{project.size}</p>
        </div>
      </div>

      {/* Tag badge */}
      <div className="absolute top-4 left-4 bg-cream-100/90 backdrop-blur-sm px-3 py-1 z-20
                      group-hover:opacity-0 transition-opacity duration-200">
        <span className="text-[10px] tracking-[0.15em] uppercase text-charcoal">{project.tag}</span>
      </div>

      {/* Corner accent line — grows on hover */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold group-hover:w-full
                      transition-all duration-600 ease-out z-20" />
    </div>
  );
}

export default function PortfolioSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="portfolio" className="py-section bg-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <p className={`section-tag ${animClass(headerVisible, "fade-left", 0)}`}>Our Work</p>
            <h2 className={`font-display text-charcoal ${animClass(headerVisible, "fade-left", 100)}`}>
              Spaces We&apos;ve Transformed
            </h2>
          </div>
          <a href="#contact"
             className={`btn-outline self-start sm:self-auto shrink-0 ${animClass(headerVisible, "fade-right", 150)}`}>
            Start Your Project
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[300px]">
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} idx={idx} />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-charcoal-muted mb-4">See more of our work on Instagram</p>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
             className="btn-outline inline-flex hover:gap-3 transition-all duration-300">
            @livioninteriors
          </a>
        </div>
      </div>
    </section>
  );
}