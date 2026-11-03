import { useEffect, useState } from "react";
import harishPhotoFront from "../../assets/harish-photo-new-optimized.webp";
import harishPhotoBack from "../../assets/harish-photo-back.webp";

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mobile detection
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        // Calculate scroll progress for the flip (0 to 1)
        // Flip happens in the first 400px of scroll
        const scrollY = window.scrollY;
        const flipDistance = 400;
        const progress = Math.min(scrollY / flipDistance, 1);
        setScrollProgress(progress);

        // Calculate which section is in view for timeline
        // Use simple viewport-based detection
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const maxScroll = docHeight - windowHeight;
        const scrollPercent = scrollY / maxScroll;

        // Map scroll percentage to 5 sections
        // Adjusted for 300vh hero section
        if (scrollPercent < 0.15) setActiveSection(0);       // Top (first 15%)
        else if (scrollPercent < 0.35) setActiveSection(1);  // About (15-35%)
        else if (scrollPercent < 0.6) setActiveSection(2);   // Experience (35-60%)
        else if (scrollPercent < 0.8) setActiveSection(3);   // Work (60-80%)
        else setActiveSection(4);                            // Contact (80-100%)

        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate rotation on Y axis (0deg to 180deg)
  const rotation = scrollProgress * 180;

  // Scale from small to large (200px -> 240px = 1.2x growth)
  const scale = 1 + (scrollProgress * 0.2); // 1.0 to 1.2

  // Fade out the headline text
  const headlineOpacity = Math.max(0, 1 - scrollProgress * 2);

  // Fade in the content after flip
  const contentOpacity = Math.max(0, (scrollProgress - 0.5) * 2);

  // Progressive fade-ins for content sections (staggered reveals)
  const headingOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.5) * 3));
  const paragraphOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.6) * 3));
  const statsOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.7) * 3));
  const skillsOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.8) * 3));

  return (
    <>
      {/* Fixed Timeline - Always visible */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 hidden lg:block z-50">
          <div className="relative h-[400px]">
            {/* Progress line */}
            <div className="absolute left-0 top-0 w-[2px] h-full bg-border/30" />
            <div
              className="absolute left-0 top-0 w-[2px] bg-accent transition-all duration-500"
              style={{ height: `${(activeSection / 4) * 100}%` }}
            />

            {/* Section waypoints */}
            {[
              { label: "Top", index: 0 },
              { label: "About", index: 1 },
              { label: "Experience", index: 2 },
              { label: "Work", index: 3 },
              { label: "Contact", index: 4 }
            ].map((section) => (
              <div
                key={section.label}
                className="absolute -left-[5px] flex items-center gap-3 transition-all duration-300"
                style={{
                  top: `${(section.index / 4) * 100}%`,
                  opacity: activeSection >= section.index ? 1 : 0.3
                }}
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    activeSection >= section.index
                      ? 'bg-accent border-accent scale-110'
                      : 'bg-background border-border'
                  }`}
                />
                <span
                  className={`text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                    activeSection >= section.index
                      ? 'text-foreground opacity-100'
                      : 'text-muted-foreground opacity-60'
                  }`}
                >
                  {section.label}
                </span>
              </div>
            ))}
          </div>
      </div>

      <section id="top" className="relative min-h-[200vh]">
        {/* About anchor target - positioned where the Hey section becomes visible */}
        <div id="about" className="absolute" style={{ top: '50vh' }} />

        {/* Sticky container that holds the animation */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div className="max-w-[1080px] w-full mx-auto px-6 relative">

          {/* Initial state: Headline + Card overlapping */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
            style={{ opacity: headlineOpacity, pointerEvents: headlineOpacity > 0 ? 'auto' : 'none' }}
          >
            {/* Handwritten "SCROLL DOWN" text - positioned on right */}
            <div
              className="hidden lg:block absolute right-[10%] top-[45%] animate-fade-up"
              style={{
                opacity: headlineOpacity,
                animationDelay: '0.5s'
              }}
            >
              <div className="text-[#EF4444] text-5xl font-bold transform rotate-[-5deg]"
                style={{
                  fontFamily: "'Caveat', cursive",
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                SCROLL
                <br />
                Down ↓
              </div>
            </div>

            <div className="text-center">
              <h1 className="font-display font-black text-[clamp(2.2rem,8vw,4.2rem)] leading-[1.15] tracking-tight mb-8">
                NOT YOUR AVERAGE
                <br />
                CS STUDENT
              </h1>

              {/* Card overlapping the text - starts small, flips on Y axis, grows larger */}
              <div
                className="inline-block"
                style={{
                  perspective: "1200px",
                }}
              >
                <div
                  className="relative w-[200px] h-[260px] mx-auto"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${rotation}deg) scale(${scale})`,
                    transition: isMobile ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
                  }}
                >
                  {/* Front Face */}
                  <div
                    className="absolute inset-0 rounded-[20px] overflow-hidden shadow-card border border-border/50 bg-gradient-to-br from-secondary to-background"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={harishPhotoFront}
                      alt="Harish Balaji R"
                      className="h-full w-full object-cover photo-enhanced"
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  {/* Back Face */}
                  <div
                    className="absolute inset-0 rounded-[20px] overflow-hidden shadow-card border border-accent/50 bg-gradient-to-br from-accent/20 to-background"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <img
                      src={harishPhotoBack}
                      alt="Harish Balaji R"
                      className="h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Final state: Two-column layout with content */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
            style={{
              opacity: contentOpacity,
              pointerEvents: contentOpacity > 0 ? 'auto' : 'none',
            }}
          >
            <div className="grid md:grid-cols-[1fr,240px] gap-12 items-start w-full">
              {/* Left Column: Content */}
              <div className="space-y-6">
                <h2
                  className="font-display font-bold text-3xl md:text-[38px] transition-all duration-700"
                  style={{
                    opacity: headingOpacity,
                    transform: `translateY(${(1 - headingOpacity) * 20}px)`
                  }}
                >
                  Hey!
                </h2>
                <p
                  className="text-foreground/70 text-sm md:text-[15px] leading-relaxed max-w-[600px] transition-all duration-700"
                  style={{
                    opacity: paragraphOpacity,
                    transform: `translateY(${(1 - paragraphOpacity) * 20}px)`
                  }}
                >
                  I'm <span className="text-foreground font-semibold">Harish Balaji R</span>, a second-year Computer Science student at St Joseph's College of Engineering, Chennai. I'm building a strong foundation in software engineering, focusing on C++, Python, DSA, and full-stack development.
                </p>

                {/* Stats Row */}
                <div
                  className="flex flex-wrap items-center gap-6 text-sm transition-all duration-700"
                  style={{
                    opacity: statsOpacity,
                    transform: `translateY(${(1 - statsOpacity) * 20}px)`
                  }}
                >
                  <div>
                    <div className="font-display font-bold text-2xl md:text-[25px]">3rd</div>
                    <div className="text-muted-foreground">Semester</div>
                  </div>
                  <div role="presentation" className="w-px h-12 bg-border" />
                  <div>
                    <div className="font-display font-bold text-2xl md:text-[25px]">8.99</div>
                    <div className="text-muted-foreground">CGPA</div>
                  </div>
                  <div role="presentation" className="w-px h-12 bg-border" />
                  <div>
                    <div className="font-display font-bold text-2xl md:text-[25px]">300+</div>
                    <div className="text-muted-foreground">LeetCode</div>
                  </div>
                </div>

                {/* Technical Skills */}
                <div
                  className="pt-4 space-y-3 transition-all duration-700"
                  style={{
                    opacity: skillsOpacity,
                    transform: `translateY(${(1 - skillsOpacity) * 20}px)`
                  }}
                >
                  <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Technical Skills
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "C++", highlight: true },
                      { name: "Python", highlight: true },
                      { name: "Data Structures & Algorithms", highlight: true },
                      { name: "React", highlight: true },
                      { name: "TypeScript", highlight: true },
                      { name: "Node.js", highlight: false },
                      { name: "Express.js", highlight: false },
                      { name: "HTML & CSS", highlight: false },
                      { name: "Tailwind CSS", highlight: false },
                      { name: "RESTful APIs", highlight: false },
                      { name: "MongoDB", highlight: false },
                      { name: "RAG & AI Integration", highlight: true },
                      { name: "Git & Version Control", highlight: false },
                      { name: "Competitive Programming", highlight: true },
                      { name: "Problem Solving", highlight: false }
                    ].map((skill) => (
                      <span
                        key={skill.name}
                        className={`hero-skill-badge px-3 py-1.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md ${
                          skill.highlight ? 'ring-2 ring-accent/50 bg-accent/10 dark:bg-accent/20' : ''
                        }`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons - Asymmetric Layout */}
                <div
                  className="pt-6 transition-all duration-700"
                  style={{
                    opacity: skillsOpacity,
                    transform: `translateY(${(1 - skillsOpacity) * 20}px)`
                  }}
                >
                  <div className="flex flex-wrap gap-4 items-center">
                    {/* Resume Button - Elevated Primary */}
                    <a
                      href="/docs/Harish_Balaji_R.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative px-6 py-3.5 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        See my resume
                      </span>
                    </a>

                    {/* GitHub Button - Outlined with Icon */}
                    <a
                      href="https://github.com/HarishBalajiR"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative px-5 py-3 border-2 border-border hover:border-foreground/30 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 bg-background/50 hover:bg-secondary/50"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">GitHub</span>
                      </span>
                    </a>

                    {/* LinkedIn Button - Outlined with Icon */}
                    <a
                      href="https://linkedin.com/in/HarishBalajiR"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative px-5 py-3 border-2 border-[#0A66C2]/30 hover:border-[#0A66C2] rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 bg-background/50 hover:bg-[#0A66C2]/5"
                    >
                      <span className="flex items-center gap-2 text-foreground group-hover:text-[#0A66C2] transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span className="font-medium">LinkedIn</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Card that rotates in sync */}
              <div
                className="hidden md:block"
                style={{
                  perspective: "1200px",
                }}
              >
                <div
                  className="relative w-[240px] h-[320px]"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${rotation}deg)`,
                    transition: "transform 0.4s ease-out",
                  }}
                >
                  {/* Front Face */}
                  <div
                    className="absolute inset-0 rounded-[20px] overflow-hidden shadow-card border border-border/50 bg-gradient-to-br from-secondary to-background"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={harishPhotoFront}
                      alt="Harish Balaji R"
                      className="h-full w-full object-cover photo-enhanced"
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  {/* Back Face - shows closeup photo */}
                  <div
                    className="absolute inset-0 rounded-[20px] overflow-hidden shadow-card border border-border/50 bg-gradient-to-br from-secondary to-background"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <img
                      src={harishPhotoBack}
                      alt="Harish Balaji R"
                      className="h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
