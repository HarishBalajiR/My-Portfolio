import { useEffect, useState } from "react";
import { FileText, Github, Linkedin } from "lucide-react";
import harishPhotoFront from "../../assets/harish-photo-new-optimized.webp";
import harishPhotoBack from "../../assets/harish-photo-back.webp";

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
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
  const buttonsOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.9) * 3));

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

      <section id="top" className="relative min-h-[300vh]">
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
                    transition: "transform 0.1s ease-out",
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
                  className="text-5xl font-display font-bold transition-all duration-700"
                  style={{
                    opacity: headingOpacity,
                    transform: `translateY(${(1 - headingOpacity) * 20}px)`
                  }}
                >
                  Hey!
                </h2>
                <p
                  className="text-lg text-foreground/70 leading-relaxed max-w-[600px] transition-all duration-700"
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
                    <div className="text-3xl font-display font-bold">3rd</div>
                    <div className="text-muted-foreground">Semester</div>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div>
                    <div className="text-3xl font-display font-bold">8.99</div>
                    <div className="text-muted-foreground">CGPA</div>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div>
                    <div className="text-3xl font-display font-bold">300+</div>
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
                    {["C++", "Python", "Data Structures & Algorithms", "React", "TypeScript", "Node.js", "Git & GitHub", "Problem Solving"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div
                  className="flex flex-wrap items-center gap-3 pt-4 transition-all duration-700"
                  style={{
                    opacity: buttonsOpacity,
                    transform: `translateY(${(1 - buttonsOpacity) * 20}px)`
                  }}
                >
                  <a
                    href="/docs/Harish_Balaji_R.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg"
                  >
                    <FileText className="w-4 h-4" />
                    View Resume
                  </a>
                  <a
                    href="https://github.com/HarishBalajiR"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-border hover:border-foreground transition-colors font-semibold"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/harishbalajir/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-border hover:border-foreground transition-colors font-semibold"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
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
                    transition: "transform 0.1s ease-out",
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
