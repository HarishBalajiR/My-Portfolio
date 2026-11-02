import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import { useEffect, lazy, Suspense } from "react";

// Lazy load atmospheric background after hero loads
const AtmosphericBackground = lazy(() => import(/* webpackChunkName: "atmosphere" */ "@/components/AtmosphericBackground"));

// Lazy load sections that aren't immediately visible
const LiveStats = lazy(() => import(/* webpackChunkName: "stats" */ "@/components/portfolio/LiveStats"));
const Achievements = lazy(() => import(/* webpackChunkName: "achievements" */ "@/components/portfolio/Achievements"));
const Work = lazy(() => import(/* webpackChunkName: "work" */ "@/components/portfolio/Work"));
const Experience = lazy(() => import(/* webpackChunkName: "experience" */ "@/components/portfolio/Experience"));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ "@/components/portfolio/Contact"));

const Index = () => {
  useEffect(() => {
    document.title = "Harish Balaji R | SWE Candidate";
    const desc = "Portfolio of Harish Balaji R, a second-year B.E. Computer Science student at St Joseph's College of Engineering, Chennai, focused on SWE internships, full-time roles, C++, Python, HTML, Git, GitHub, and problem solving.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    const canonicalHref = window.location.origin + "/";
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalHref);
  }, []);

  return (
    <main className="min-h-screen text-foreground relative">
      <Suspense fallback={null}>
        <AtmosphericBackground />
      </Suspense>
      <Nav />
      <Hero />
      <Suspense fallback={<div className="h-screen" />}>
        <LiveStats />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Achievements />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Work />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Contact />
      </Suspense>
    </main>
  );
};

export default Index;
