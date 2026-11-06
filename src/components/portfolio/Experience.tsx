import { useEffect, useState, useRef } from "react";

const Experience = () => {
  const [cardProgress, setCardProgress] = useState([0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) {
          rafId = null;
          return;
        }

        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const triggerPoint = windowHeight * 0.5;

        if (sectionTop < triggerPoint && sectionTop > -sectionHeight) {
          const scrollProgress = (triggerPoint - sectionTop) / (sectionHeight + triggerPoint);
          setCardProgress([Math.min(scrollProgress * 2, 1)]);
        } else if (sectionTop >= triggerPoint) {
          setCardProgress([0]);
        }

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="experience" className="py-12 md:py-16 border-t border-border" ref={sectionRef}>
      <div className="max-w-[1080px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 animate-fade-up">
          <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.1] tracking-tight mb-4">
            Experience
          </h2>
          <p className="text-lg md:text-[22px] text-foreground/70 leading-relaxed max-w-[620px]">
            My education and the skills I'm building toward a career in software engineering.
          </p>
        </div>

        {/* Education */}
        <div
          className="mb-16"
          style={{
            opacity: cardProgress[0],
            transform: `translateY(${(1 - cardProgress[0]) * 80}px)`,
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
          }}
        >
          <h3 className="font-mono text-xs font-bold text-accent tracking-wider mb-6">
            EDUCATION
          </h3>
          <article
            className="relative bg-card p-8 border-l-4 border-accent"
            style={{
              borderRadius: '0 12px 12px 0',
              boxShadow: '0 2px 16px -4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h4 className="font-display font-bold text-[clamp(1.25rem,3vw,1.5rem)] mb-2">
                  St Joseph's College of Engineering
                </h4>
                <p className="text-base text-foreground/70">
                  B.E. Computer Science and Engineering
                </p>
              </div>
              <div className="text-sm font-semibold text-muted-foreground">
                <time dateTime="2025">2025</time> - <time dateTime="2029">2029</time>
              </div>
            </div>
            <dl className="flex flex-wrap items-center gap-6 pt-4 border-t border-accent/20 m-0">
              <div>
                <dt className="text-xs text-muted-foreground uppercase tracking-wide">Semester</dt>
                <dd className="text-2xl font-mono font-bold tabular-nums m-0">3rd</dd>
              </div>
              <div className="w-px h-12 bg-accent/30" aria-hidden="true" />
              <div>
                <dt className="text-xs text-muted-foreground uppercase tracking-wide">CGPA</dt>
                <dd className="text-2xl font-mono font-bold tabular-nums m-0">8.99</dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Experience;
