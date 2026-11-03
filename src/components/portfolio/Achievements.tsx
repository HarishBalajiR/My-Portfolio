import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Trophy, Award, Medal, FileCheck, ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import acmIcpcTeam from "../../assets/acm-icpc-team.webp";
import volunteerPhoto from "../../assets/harish-photo.png";
import gssocPR from "../../assets/gssoc-pr.png";

interface Achievement {
  id: string;
  icon: "trophy" | "award" | "medal" | "certificate";
  title: string;
  date: string;
  description: string;
  category: string;
  image?: string; // Optional image path
  href?: string; // Optional link to post/certificate
}

const achievements: Achievement[] = [
  {
    id: "1",
    icon: "trophy",
    title: "ICPC Prelims",
    date: "October 3, 2026",
    description: "Competed in the ICPC 2026 Amritapuri Region Prelims with my team from St Joseph's College of Engineering. Solved challenging algorithmic problems alongside talented programmers from across the region.",
    category: "Competition",
    image: acmIcpcTeam,
    href: "https://www.linkedin.com/posts/harishbalajir_participated-in-the-icpc-prelims-from-amritapuri-share-7522535912061198336-fLWX",
  },
  {
    id: "2",
    icon: "medal",
    title: "GSSoC '26 Contributor",
    date: "2026",
    description: "Contributed to GirlScript Summer of Code 2026 as an open-source contributor for ajay-dhangar/algo. Wrote comprehensive Java and Python cheatsheets covering DSA fundamentals with commented examples.",
    category: "Open Source",
    image: gssocPR,
    href: "https://github.com/ajay-dhangar/algo/pull/2050",
  },
  {
    id: "3",
    icon: "award",
    title: "Build with AI Volunteer",
    date: "August 2026",
    description: "Volunteered with the Build with AI initiative, helping others learn and build with artificial intelligence technologies. Received recognition for contributions to the community.",
    category: "Volunteer",
    image: volunteerPhoto,
    href: "https://www.linkedin.com/posts/harishbalajir_my-first-volunteering-experience-it-was-ugcPost-7491107530161614848-dbkk",
  },
];

const iconComponents = {
  trophy: Trophy,
  award: Award,
  medal: Medal,
  certificate: FileCheck,
};

const Achievements = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const { sectionRef, cardProgress } = useScrollReveal({
    cardCount: 4,
    scrollPerCard: 120
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
    <section id="achievements" className="py-12 md:py-16 border-t border-border" ref={sectionRef}>
      <div className="max-w-[1080px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 animate-fade-up">
          <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.1] tracking-tight mb-4">
            Achievements
          </h2>
          <p className="text-lg md:text-[22px] text-foreground/70 leading-relaxed max-w-[620px]">
            Milestones and recognitions from my journey in competitive programming and tech communities.
          </p>

          {/* Creative Swipe Indicator */}
          <div
            className={`mt-8 flex items-center justify-center gap-3 transition-opacity duration-500 ${
              showSwipeHint && achievements.length > 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
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

        {/* Achievements Carousel */}
        <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {achievements.map((achievement, index) => {
                const IconComponent = iconComponents[achievement.icon];
                const isCenter = current === index;

                const CardWrapper = achievement.href ? 'a' : 'div';
                const cardProps = achievement.href ? {
                  href: achievement.href,
                  target: "_blank",
                  rel: "noopener noreferrer"
                } : {};

                return (
                  <CarouselItem key={achievement.id} className="pl-4 md:basis-3/5 lg:basis-3/5">
                    <div
                      className={`carousel-slide ${isCenter ? 'carousel-slide-center' : 'carousel-slide-side'}`}
                      style={{
                        opacity: cardProgress[index],
                        transform: `translateY(${(1 - cardProgress[index]) * 80}px)`,
                        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                      }}
                    >
                      <CardWrapper
                        {...cardProps}
                        className="group relative block bg-card border-2 border-border hover:border-accent/40 transition-all duration-500 overflow-hidden"
                        style={{
                          borderRadius: '16px 4px 16px 4px',
                          boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.12)'
                        }}
                      >
                        {/* Image or Icon */}
                        {achievement.image ? (
                          <div className="relative h-56 overflow-hidden bg-secondary/30">
                            <img
                              src={achievement.image}
                              alt={achievement.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              style={
                                achievement.id === "1"
                                  ? { objectPosition: 'center 30%' }
                                  : { objectPosition: 'center 30%' }
                              }
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                            {/* Icon badge overlay */}
                            <div className="absolute top-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/90 backdrop-blur-sm text-white">
                              <IconComponent className="w-6 h-6" />
                            </div>
                            {/* External link indicator */}
                            {achievement.href && (
                              <div className="absolute top-4 right-4">
                                <ExternalLink className="w-5 h-5 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="p-8 pb-4">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent group-hover:scale-110 transition-transform duration-500">
                              <IconComponent className="w-7 h-7" />
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-8 pt-4">
                          {/* Category Tag */}
                          <div className="inline-block px-2.5 py-1 border-l-2 border-accent text-xs font-mono font-semibold text-accent mb-4">
                            {achievement.category}
                          </div>

                          {/* Title */}
                          <h3 className="font-display font-bold text-[clamp(1.25rem,3vw,1.625rem)] leading-tight mb-2">
                            {achievement.title}
                          </h3>

                          {/* Date */}
                          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide mb-4">
                            {achievement.date}
                          </p>

                          {/* Description */}
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>

                        {/* Corner accent */}
                        <div className="absolute bottom-0 right-0 w-12 h-12 bg-accent/5 group-hover:bg-accent/10 transition-colors duration-500" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
                      </CardWrapper>
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

export default Achievements;
