import { Moon, Sun, Menu } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import logoPhoto from "@/assets/logo-photo.webp";

const links = [
  { href: "#about", label: "About" },
  { href: "#stats", label: "Stats" },
  { href: "#achievements", label: "Achievements" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const Nav = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute md:fixed top-6 inset-x-0 z-50 px-6">
      <nav className="max-w-[1280px] mx-auto bg-secondary/80 text-foreground backdrop-blur-md rounded-lg px-6 py-3 flex items-center justify-between shadow-lg border border-border/50 nav-animated-border">
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-3 font-display text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
          aria-label="Top"
        >
          <div className="h-9 w-9 rounded-lg overflow-hidden ring-2 ring-border/50 bg-gradient-to-br from-orange-400 to-purple-500">
            <img
              src={logoPhoto}
              alt="Harish Balaji R"
              width="36"
              height="36"
              className="h-full w-full object-cover"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>
          <span className="hidden sm:inline">Harish Balaji R</span>
        </a>

        {/* Navigation Links */}
        <ul className="hidden lg:flex items-center gap-2 text-sm font-medium">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-4 py-2 rounded-lg hover:bg-foreground/5 transition-all duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu (Hamburger) */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button
                className="p-3 rounded-lg hover:bg-foreground/5 transition-all duration-300"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 pt-4">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const targetId = l.href.substring(1); // Remove #
                      const targetElement = document.getElementById(targetId);

                      setMobileMenuOpen(false);

                      // Wait for sheet to close, then scroll
                      setTimeout(() => {
                        if (targetElement) {
                          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 300);
                    }}
                    className="px-4 py-3 rounded-lg text-lg font-medium hover:bg-foreground/5 transition-all"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-lg hover:bg-foreground/5 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {/* CTA Button */}
          <a
            href="#contact"
            className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Let's talk
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
