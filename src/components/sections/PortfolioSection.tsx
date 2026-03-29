"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useScrollAnimation, animClass } from "@/hooks/useScrollAnimation";

interface Project {
  id: string; title: string; location: string;
  size: string; tag: string; image_url: string | null;
  is_featured: boolean; sort_order: number;
}

function ProjectCard({ project, idx, isVisible }: { project: Project; idx: number; isVisible: boolean }) {
  const isFeatured = project.is_featured;

  return (
    <div
      className={`relative group overflow-hidden bg-cream-300 ${isFeatured ? "lg:col-span-2" : ""}
                  ${animClass(isVisible, "scale-up", idx * 100)}`}
      style={{ borderRadius: "2px" }}
    >
      {/* Image */}
      <div className="absolute inset-0">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-cream-300 flex items-center justify-center">
            <p className="text-xs text-cream-400 tracking-widest uppercase">Project Image</p>
          </div>
        )}
      </div>

      {/* Overlay slides up on hover */}
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

      {/* Gold line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold group-hover:w-full
                      transition-all duration-500 ease-out z-20" />
    </div>
  );
}

export default function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef,   isVisible: gridVisible   } = useScrollAnimation({ threshold: 0.05 });

  useEffect(() => {
    fetch("/api/admin/portfolio")
      .then((r) => r.json())
      .then((d) => { if (d.success) setProjects(d.data); })
      .catch(console.error);
  }, []);

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

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[300px]">
          {projects.length === 0 ? (
            // Placeholder skeletons while loading
            [...Array(4)].map((_, i) => (
              <div key={i} className={`bg-cream-300 animate-pulse ${i === 0 || i === 3 ? "lg:col-span-2" : ""}`}
                   style={{ borderRadius: "2px" }} />
            ))
          ) : (
            projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} idx={idx} isVisible={gridVisible} />
            ))
          )}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-charcoal-muted mb-4">See more of our work on Instagram</p>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
             className="btn-outline inline-flex">
            @livioninteriors
          </a>
        </div>
      </div>
    </section>
  );
}
