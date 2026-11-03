const About = () => {
  return (
    <section id="about" className="py-12 md:py-16 border-t border-border">
      <div className="max-w-[1080px] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16 animate-fade-up">
          <h2 className="font-display font-black text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.1] tracking-tight mb-4">
            About
          </h2>
        </div>

        {/* Content */}
        <div className="max-w-[620px] space-y-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <p className="text-lg md:text-[22px] text-foreground/70 leading-[1.6]">
            I'm in my second year, third semester of Computer Science and Engineering at{" "}
            <span className="text-foreground font-semibold">St Joseph's College of Engineering, Chennai</span>.
          </p>

          <p className="text-lg md:text-[22px] text-foreground/70 leading-[1.6]">
            My focus is on building a strong foundation in software engineering—strengthening C++ and Python fundamentals,
            practicing DSA, and building web projects that make learning easier.
          </p>

          <p className="text-lg md:text-[22px] text-foreground leading-[1.6] font-medium">
            I believe in learning in public, improving through consistent problem-solving, and turning ideas into
            projects clear enough for others to use.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
