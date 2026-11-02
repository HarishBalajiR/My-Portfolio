import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useCodeforcesStats,
  useGitHubStats,
  useLeetCodeStats,
} from "@/hooks/useLiveStats";

const HANDLE = "HarishBalajiR";

type CardShellProps = {
  href: string;
  brand: string;
  accentColor: string;
  isLoading: boolean;
  isError: boolean;
  children: React.ReactNode;
};

const CardShell = ({
  href,
  brand,
  accentColor,
  isLoading,
  isError,
  children,
}: CardShellProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative block bg-card border border-border hover:border-foreground/20 transition-all duration-300 overflow-hidden"
    style={{
      borderRadius: '4px 16px 4px 16px',
      borderLeftWidth: '3px',
      borderLeftColor: accentColor,
      boxShadow: '0 2px 12px -3px rgba(0, 0, 0, 0.1)'
    }}
  >
    {/* Terminal-style header bar */}
    <div
      className="h-1 w-full opacity-50 group-hover:opacity-100 transition-opacity"
      style={{ backgroundColor: accentColor }}
    />

    <div className="p-8">
      {/* Platform Badge & Link Icon */}
      <div className="flex items-center justify-between mb-6">
        <span
          className="font-mono text-xs font-bold tracking-wider"
          style={{ color: accentColor }}
        >
          {brand}
        </span>
        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="min-h-[240px] flex flex-col justify-between">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-32 bg-border" />
            <Skeleton className="h-4 w-40 bg-border" />
            <Skeleton className="h-4 w-28 bg-border" />
          </div>
        ) : isError ? (
          <div className="space-y-2">
            <div className="font-display text-2xl font-bold text-foreground/40">
              Unavailable
            </div>
            <div className="text-sm text-muted-foreground">
              Visit profile for latest stats
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>

    {/* Subtle corner bracket decoration on hover */}
    <div
      className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none"
      style={{ borderColor: accentColor }}
    />
  </a>
);

const Stat = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-baseline justify-between py-3 border-t border-border/50">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-semibold">{value}</span>
  </div>
);

const LiveStats = () => {
  const lc = useLeetCodeStats(HANDLE);
  const gh = useGitHubStats(HANDLE);
  const cf = useCodeforcesStats(HANDLE);

  const [cardProgress, setCardProgress] = useState([0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate when section enters viewport
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Start animation when section is 50% in view
      const triggerPoint = windowHeight * 0.5;

      if (sectionTop < triggerPoint && sectionTop > -sectionHeight) {
        // Calculate scroll progress through the section
        const scrollProgress = (triggerPoint - sectionTop) / (sectionHeight + triggerPoint);

        // Each card needs 120px of scrolling to fully appear
        const scrollPerCard = 120;

        const newProgress = cardProgress.map((_, index) => {
          const startScroll = index * scrollPerCard;
          const endScroll = startScroll + scrollPerCard;
          const totalScrolled = scrollProgress * (sectionHeight + triggerPoint);

          if (totalScrolled < startScroll) return 0;
          if (totalScrolled > endScroll) return 1;

          return (totalScrolled - startScroll) / scrollPerCard;
        });

        setCardProgress(newProgress);
      } else if (sectionTop >= triggerPoint) {
        // Reset if scrolled back up
        setCardProgress([0, 0, 0]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="stats" className="py-32 md:py-40 border-t border-border" ref={sectionRef}>
      <div className="max-w-[1080px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 animate-fade-up">
          <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.1] tracking-tight mb-4">
            Live Stats
          </h2>
          <p className="text-lg md:text-[22px] text-foreground/70 leading-relaxed max-w-[620px]">
            Real-time data from my coding platforms, updated automatically.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* LeetCode */}
          <div
            style={{
              opacity: cardProgress[0],
              transform: `translateY(${(1 - cardProgress[0]) * 80}px)`,
              transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
            }}
          >
            <CardShell
              href={`https://leetcode.com/u/${HANDLE}/`}
              brand="LeetCode"
              accentColor="#FFA116"
              isLoading={lc.isLoading}
              isError={lc.isError}
            >
            <div>
              <div
                className="font-mono font-black text-7xl leading-none mb-3 tabular-nums"
                style={{ color: "#FFA116" }}
              >
                {lc.data?.totalSolved ?? 0}
              </div>
              <div className="text-sm text-foreground/60 font-medium tracking-wide">
                Problems Solved
              </div>
            </div>
            <div className="mt-6 space-y-1">
              <Stat
                label="Easy / Med / Hard"
                value={`${lc.data?.easySolved ?? 0} / ${lc.data?.mediumSolved ?? 0} / ${lc.data?.hardSolved ?? 0}`}
              />
              <Stat
                label="Contest Rating"
                value={lc.data?.contestRating ?? "N/A"}
              />
              <Stat
                label="Current Streak"
                value={`${lc.data?.currentStreak ?? 0} days`}
              />
            </div>
          </CardShell>
          </div>

          {/* GitHub */}
          <div
            style={{
              opacity: cardProgress[1],
              transform: `translateY(${(1 - cardProgress[1]) * 80}px)`,
              transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
            }}
          >
            <CardShell
              href={`https://github.com/${HANDLE}`}
              brand="GitHub"
              accentColor="#6e40c9"
              isLoading={gh.isLoading}
              isError={gh.isError}
            >
            <div>
              <div className="font-mono font-black text-7xl leading-none text-foreground mb-3 tabular-nums">
                {gh.data?.contributionsLastYear ?? 0}
              </div>
              <div className="text-sm text-foreground/60 font-medium tracking-wide">
                Contributions Last Year
              </div>
            </div>
            <div className="mt-6 space-y-1">
              <Stat
                label="Public Repos"
                value={gh.data?.publicRepos ?? 0}
              />
              <Stat label="Followers" value={gh.data?.followers ?? 0} />
              <Stat
                label="Top Languages"
                value={
                  gh.data?.topLanguages.length
                    ? gh.data.topLanguages.slice(0, 2).join(", ")
                    : "N/A"
                }
              />
            </div>
          </CardShell>
          </div>

          {/* Codeforces */}
          <div
            style={{
              opacity: cardProgress[2],
              transform: `translateY(${(1 - cardProgress[2]) * 80}px)`,
              transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
            }}
          >
            <CardShell
              href={`https://codeforces.com/profile/${HANDLE}`}
              brand="Codeforces"
              accentColor="#1F8ACB"
              isLoading={cf.isLoading}
              isError={cf.isError}
            >
            <div>
              <div
                className="font-mono font-black text-7xl leading-none mb-3 tabular-nums"
                style={{ color: "#1F8ACB" }}
              >
                {cf.data?.rating || "N/A"}
              </div>
              <div className="text-sm text-foreground/60 font-medium tracking-wide capitalize">
                {cf.data?.rank ?? "Current Rating"}
              </div>
            </div>
            <div className="mt-6 space-y-1">
              <Stat label="Max Rating" value={cf.data?.maxRating || "N/A"} />
              <Stat
                label="Max Rank"
                value={<span className="capitalize">{cf.data?.maxRank ?? "N/A"}</span>}
              />
              <Stat label="Contests" value={cf.data?.contests ?? 0} />
            </div>
          </CardShell>
          </div>
        </div>

        {/* Footer Note */}
        <div
          className="mt-10 text-center text-sm text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Stats refresh automatically via public APIs
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
