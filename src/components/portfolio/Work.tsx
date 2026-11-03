import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExternalLink, BookOpen, Code2, LayoutDashboard } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const builds = [
  {
    title: "Communication Readiness Platform",
    status: "Featured Project",
    desc: "A full-stack web platform leveraging RAG (Retrieval-Augmented Generation) and AI to help users improve their communication skills through interactive exercises, assessments, and personalized feedback powered by LLMs.",
    stack: ["React", "TypeScript", "Node.js", "Express.js", "RAG", "AI/ML", "MongoDB"],
    href: "https://github.com/HarishBalajiR/communication-readiness-platform",
    icon: LayoutDashboard,
  },
  {
    title: "Learn HTML",
    status: "Side Project",
    desc: "A beginner-friendly website that helps new learners understand HTML basics through simple explanations and examples. Built as a learning resource for others.",
    stack: ["HTML", "Git", "GitHub"],
    href: "https://github.com/HarishBalajiR/Learn-HTML",
    icon: BookOpen,
  },
  {
    title: "Problem Solving Track",
    status: "Ongoing",
    desc: "A steady practice track across LeetCode, Codeforces, and AtCoder, with 1400+ problems solved across all platforms.",
    stack: ["C++", "DSA"],
    href: "https://codolio.com/profile/harishbalajir",
    icon: Code2,
  },
];

const Work = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const { sectionRef, cardProgress } = useScrollReveal({
    cardCount: 3,
    scrollPerCard: 100
  });

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
      // Hide swipe hint after first interaction
      setShowSwipeHint(false);
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <section id="work" className="py-12 md:py-16 border-t border-border" ref={sectionRef}>
      <div className="max-w-[1080px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 animate-fade-up">
          <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.1] tracking-tight mb-4">
            Work
          </h2>
          <p className="text-lg md:text-[22px] text-foreground/70 leading-relaxed max-w-[620px]">
            Projects, practice, and improvements that show how I'm building toward software engineering roles.
          </p>

          {/* Creative Swipe Indicator */}
          <div
            className={`mt-8 flex items-center justify-center gap-3 transition-opacity duration-500 ${
              showSwipeHint && builds.length > 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 backdrop-blur-sm">
              <svg
                className="w-5 h-5 text-accent animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium text-accent">Swipe to see more</span>
              <svg
                className="w-5 h-5 text-accent animate-pulse"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ animationDelay: '0.15s' }}
              >
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Projects Carousel */}
        <div className="animate-fade-up relative" style={{ animationDelay: "0.1s" }}>
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {builds.map((build, index) => {
                const Icon = build.icon;
                const isCenter = current === index;

                return (
                  <CarouselItem key={build.title} className="pl-4 md:basis-3/5 lg:basis-1/2">
                    <div
                      className={`carousel-slide ${isCenter ? 'carousel-slide-center' : 'carousel-slide-side'}`}
                      style={{
                        opacity: cardProgress[index],
                        transform: `translateY(${(1 - cardProgress[index]) * 80}px)`,
                        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                      }}
                    >
                      <a
                        href={build.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative bg-card p-8 border-2 border-border hover:border-accent/40 transition-all duration-500 min-h-[380px] flex flex-col block overflow-hidden"
                        style={{
                          borderRadius: '24px 4px 24px 4px',
                          boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.12)'
                        }}
                      >
                        {/* Corner accent */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 group-hover:bg-accent/10 transition-colors duration-500" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />

                        {/* Icon & External Link */}
                        <div className="relative flex items-start justify-between mb-6">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform duration-500">
                            <Icon className="w-6 h-6" />
                          </div>
                          <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Status Badge */}
                        <div className="inline-block w-fit px-2.5 py-1 border-l-2 border-accent text-xs font-mono font-semibold text-accent mb-4">
                          {build.status}
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-bold text-[clamp(1.5rem,3vw,1.75rem)] leading-tight mb-3">
                          {build.title}
                        </h3>

                        {/* Description */}
                        <p className="text-base text-foreground/70 leading-relaxed mb-6 flex-1">
                          {build.desc}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                          {build.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-lg bg-secondary text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </a>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16" />
            <CarouselNext className="hidden md:flex -right-12 lg:-right-16" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Work;
