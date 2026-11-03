import { Github, Linkedin, Mail } from "lucide-react";

const EMAIL = "harishbalajir2008@gmail.com";

const socials = [
  { icon: Github, label: "GitHub", handle: "HarishBalajiR", href: "https://github.com/HarishBalajiR" },
  { icon: Linkedin, label: "LinkedIn", handle: "harishbalajir", href: "https://www.linkedin.com/in/harishbalajir/" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-12 md:py-16 border-t border-border">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="text-center max-w-[720px] mx-auto">
          {/* Headline */}
          <h2
            className="font-display font-black text-[clamp(2.75rem,8vw,4.25rem)] leading-[1.1] tracking-tight mb-8 animate-fade-up"
          >
            Let's talk about
            <br />
            what's next
          </h2>

          {/* Description */}
          <p
            className="text-lg md:text-[22px] text-foreground/70 leading-[1.6] mb-12 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Open to SWE internships, mentorship, collaboration, and feedback on what I should build next.
          </p>

          {/* Email CTA */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            >
              <Mail className="w-5 h-5" />
              {EMAIL}
            </a>
          </div>

          {/* Social Links */}
          <div
            className="mt-12 flex flex-wrap justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {socials.map((social) => {
              const isLinkedIn = social.label === "LinkedIn";
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center gap-2 px-5 py-3 border-2 rounded-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 bg-background/50 ${
                    isLinkedIn
                      ? 'border-[#0A66C2]/30 hover:border-[#0A66C2] hover:bg-[#0A66C2]/5'
                      : 'border-border hover:border-foreground/30 hover:bg-secondary/50'
                  }`}
                >
                  <social.icon className={`w-5 h-5 ${isLinkedIn ? 'text-foreground group-hover:text-[#0A66C2] transition-colors' : ''}`} />
                  <span className={`font-medium ${isLinkedIn ? 'text-foreground group-hover:text-[#0A66C2] transition-colors' : ''}`}>{social.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer
          className="mt-32 pt-8 border-t border-border text-center text-sm text-muted-foreground animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          © 2026 Harish Balaji R. Built with React, TypeScript, and Tailwind CSS.
        </footer>
      </div>
    </section>
  );
};

export default Contact;
