import { useEffect, useState } from 'react';
import './atmospheric-bg.css';

const AtmosphericBackground = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Detect initial theme
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setTheme(isDark ? 'dark' : 'light');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="atmospheric-background" aria-hidden="true">
        {/* SVG Filters */}
        <svg className="atmospheric-svg-defs" aria-hidden="true">
        <defs>
          {/* Gaussian blur for clouds - SIMPLIFIED for performance */}
          <filter id="cloud-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>

          {/* Radial gradient for moon glow */}
          <radialGradient id="moon-glow">
            <stop offset="0%" stopColor="rgba(255, 253, 235, 0.3)" />
            <stop offset="50%" stopColor="rgba(255, 253, 235, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 253, 235, 0)" />
          </radialGradient>

          {/* Radial gradient for sun glow */}
          <radialGradient id="sun-glow">
            <stop offset="0%" stopColor="rgba(255, 200, 100, 0.4)" />
            <stop offset="40%" stopColor="rgba(255, 220, 150, 0.2)" />
            <stop offset="100%" stopColor="rgba(255, 235, 200, 0)" />
          </radialGradient>

          {/* Star glow filter for sparkle effect */}
          <filter id="star-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {theme === 'light' ? (
        // Light Mode: Daytime Sky with Clouds
        <>
          {/* Sky Gradient Base */}
          <div className="sky-gradient light-sky" />

          {/* Hero Glow */}
          <div className="hero-glow light-glow" />

          {/* Horizon Line */}
          <div className="horizon-line light-horizon" />

          {/* Grass at bottom */}
          <svg className="grass-layer" viewBox="0 0 1920 200" preserveAspectRatio="none">
            {/* Ground/dirt base */}
            <rect x="0" y="150" width="1920" height="50" fill="rgba(139, 115, 85, 0.3)" />

            {/* Grass blades - varying heights and shades */}
            <g className="grass-blades">
              {/* Background grass - darker */}
              {Array.from({ length: 120 }).map((_, i) => {
                const x = (i * 16) + (i % 3) * 5;
                const height = 35 + (i % 15);
                const curve = 8 + (i % 5);
                return (
                  <path
                    key={`bg-${i}`}
                    d={`M ${x},150 Q ${x + curve},${150 - height / 2} ${x},${150 - height}`}
                    stroke="rgba(76, 140, 74, 0.7)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Foreground grass - brighter */}
              {Array.from({ length: 100 }).map((_, i) => {
                const x = (i * 19) + (i % 4) * 6;
                const height = 40 + (i % 20);
                const curve = 10 + (i % 6);
                return (
                  <path
                    key={`fg-${i}`}
                    d={`M ${x},150 Q ${x + curve},${150 - height / 2} ${x},${150 - height}`}
                    stroke="rgba(88, 164, 86, 0.85)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Front grass - brightest */}
              {Array.from({ length: 80 }).map((_, i) => {
                const x = (i * 24) + (i % 5) * 7;
                const height = 45 + (i % 25);
                const curve = 12 + (i % 7);
                return (
                  <path
                    key={`front-${i}`}
                    d={`M ${x},150 Q ${x + curve},${150 - height / 2} ${x},${150 - height}`}
                    stroke="rgba(102, 187, 106, 0.95)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                );
              })}
            </g>

            {/* Wildflowers scattered throughout - MUCH BIGGER */}
            <g className="flowers">
              {/* Red/Pink flowers */}
              <g transform="translate(150, 125) scale(3.5)">
                <circle cx="0" cy="0" r="4" fill="#FF6B9D" opacity="0.9" />
                <circle cx="-3" cy="-2" r="3" fill="#FFB3D9" opacity="0.8" />
                <circle cx="3" cy="-2" r="3" fill="#FFB3D9" opacity="0.8" />
                <circle cx="-2" cy="2" r="3" fill="#FFB3D9" opacity="0.8" />
                <circle cx="2" cy="2" r="3" fill="#FFB3D9" opacity="0.8" />
                <circle cx="0" cy="0" r="2" fill="#FFE66D" opacity="0.9" />
              </g>

              {/* Yellow flowers */}
              <g transform="translate(400, 118) scale(3.5)">
                <circle cx="0" cy="0" r="3.5" fill="#FFD93D" opacity="0.95" />
                <circle cx="-2.5" cy="-1.5" r="2.5" fill="#FFE66D" opacity="0.85" />
                <circle cx="2.5" cy="-1.5" r="2.5" fill="#FFE66D" opacity="0.85" />
                <circle cx="-1.5" cy="2" r="2.5" fill="#FFE66D" opacity="0.85" />
                <circle cx="1.5" cy="2" r="2.5" fill="#FFE66D" opacity="0.85" />
                <circle cx="0" cy="0" r="1.5" fill="#FF6B35" opacity="0.9" />
              </g>

              {/* Purple flowers */}
              <g transform="translate(650, 120) scale(3.5)">
                <circle cx="0" cy="0" r="4" fill="#A78BFA" opacity="0.9" />
                <circle cx="-3" cy="-2" r="3" fill="#C4B5FD" opacity="0.85" />
                <circle cx="3" cy="-2" r="3" fill="#C4B5FD" opacity="0.85" />
                <circle cx="-2" cy="2" r="3" fill="#C4B5FD" opacity="0.85" />
                <circle cx="2" cy="2" r="3" fill="#C4B5FD" opacity="0.85" />
                <circle cx="0" cy="0" r="1.8" fill="#6366F1" opacity="0.9" />
              </g>

              {/* Orange flowers */}
              <g transform="translate(920, 128) scale(3.5)">
                <circle cx="0" cy="0" r="3.5" fill="#FF8C42" opacity="0.9" />
                <circle cx="-2.5" cy="-1.5" r="2.5" fill="#FFB380" opacity="0.8" />
                <circle cx="2.5" cy="-1.5" r="2.5" fill="#FFB380" opacity="0.8" />
                <circle cx="-1.5" cy="2" r="2.5" fill="#FFB380" opacity="0.8" />
                <circle cx="1.5" cy="2" r="2.5" fill="#FFB380" opacity="0.8" />
                <circle cx="0" cy="0" r="1.5" fill="#FFEC5C" opacity="0.9" />
              </g>

              {/* Pink flowers */}
              <g transform="translate(1150, 132) scale(3.5)">
                <circle cx="0" cy="0" r="3" fill="#F687B3" opacity="0.85" />
                <circle cx="-2" cy="-1.5" r="2" fill="#FBB6CE" opacity="0.8" />
                <circle cx="2" cy="-1.5" r="2" fill="#FBB6CE" opacity="0.8" />
                <circle cx="-1.5" cy="1.5" r="2" fill="#FBB6CE" opacity="0.8" />
                <circle cx="1.5" cy="1.5" r="2" fill="#FBB6CE" opacity="0.8" />
                <circle cx="0" cy="0" r="1.2" fill="#FBBF24" opacity="0.9" />
              </g>

              {/* Blue/Cyan flowers */}
              <g transform="translate(1400, 115) scale(3.5)">
                <circle cx="0" cy="0" r="3.5" fill="#60A5FA" opacity="0.9" />
                <circle cx="-2.5" cy="-1.5" r="2.5" fill="#93C5FD" opacity="0.85" />
                <circle cx="2.5" cy="-1.5" r="2.5" fill="#93C5FD" opacity="0.85" />
                <circle cx="-1.5" cy="2" r="2.5" fill="#93C5FD" opacity="0.85" />
                <circle cx="1.5" cy="2" r="2.5" fill="#93C5FD" opacity="0.85" />
                <circle cx="0" cy="0" r="1.5" fill="#FBBF24" opacity="0.9" />
              </g>

              {/* Red flowers */}
              <g transform="translate(1650, 127) scale(3.5)">
                <circle cx="0" cy="0" r="3" fill="#EF4444" opacity="0.9" />
                <circle cx="-2" cy="-1.5" r="2" fill="#F87171" opacity="0.8" />
                <circle cx="2" cy="-1.5" r="2" fill="#F87171" opacity="0.8" />
                <circle cx="-1.5" cy="1.5" r="2" fill="#F87171" opacity="0.8" />
                <circle cx="1.5" cy="1.5" r="2" fill="#F87171" opacity="0.8" />
                <circle cx="0" cy="0" r="1.2" fill="#FCD34D" opacity="0.9" />
              </g>

              {/* Additional scattered medium flowers */}
              <g transform="translate(280, 130) scale(2.5)">
                <circle cx="0" cy="0" r="3" fill="#FF6B9D" opacity="0.85" />
                <circle cx="-2" cy="-1" r="2" fill="#FFB3D9" opacity="0.8" />
                <circle cx="2" cy="-1" r="2" fill="#FFB3D9" opacity="0.8" />
              </g>
              <g transform="translate(530, 126) scale(2.5)">
                <circle cx="0" cy="0" r="3" fill="#FFD93D" opacity="0.85" />
                <circle cx="-2" cy="-1" r="2" fill="#FFE66D" opacity="0.8" />
                <circle cx="2" cy="-1" r="2" fill="#FFE66D" opacity="0.8" />
              </g>
              <g transform="translate(780, 133) scale(2.5)">
                <circle cx="0" cy="0" r="3" fill="#A78BFA" opacity="0.85" />
                <circle cx="-2" cy="-1" r="2" fill="#C4B5FD" opacity="0.8" />
                <circle cx="2" cy="-1" r="2" fill="#C4B5FD" opacity="0.8" />
              </g>
              <g transform="translate(1050, 129) scale(2.5)">
                <circle cx="0" cy="0" r="3" fill="#FF8C42" opacity="0.85" />
                <circle cx="-2" cy="-1" r="2" fill="#FFB380" opacity="0.8" />
                <circle cx="2" cy="-1" r="2" fill="#FFB380" opacity="0.8" />
              </g>
              <g transform="translate(1280, 135) scale(2.5)">
                <circle cx="0" cy="0" r="3" fill="#F687B3" opacity="0.85" />
                <circle cx="-2" cy="-1" r="2" fill="#FBB6CE" opacity="0.8" />
                <circle cx="2" cy="-1" r="2" fill="#FBB6CE" opacity="0.8" />
              </g>
              <g transform="translate(1520, 123) scale(2.5)">
                <circle cx="0" cy="0" r="3" fill="#60A5FA" opacity="0.85" />
                <circle cx="-2" cy="-1" r="2" fill="#93C5FD" opacity="0.8" />
                <circle cx="2" cy="-1" r="2" fill="#93C5FD" opacity="0.8" />
              </g>
              <g transform="translate(1750, 131) scale(2.5)">
                <circle cx="0" cy="0" r="3" fill="#EF4444" opacity="0.85" />
                <circle cx="-2" cy="-1" r="2" fill="#F87171" opacity="0.8" />
                <circle cx="2" cy="-1" r="2" fill="#F87171" opacity="0.8" />
              </g>

              {/* More medium flowers in between */}
              <g transform="translate(340, 122) scale(2.8)">
                <circle cx="0" cy="0" r="3.5" fill="#C4B5FD" opacity="0.9" />
                <circle cx="-2.5" cy="-1.5" r="2.5" fill="#DDD6FE" opacity="0.85" />
                <circle cx="2.5" cy="-1.5" r="2.5" fill="#DDD6FE" opacity="0.85" />
                <circle cx="0" cy="0" r="1.5" fill="#FBBF24" opacity="0.9" />
              </g>
              <g transform="translate(590, 134) scale(2.8)">
                <circle cx="0" cy="0" r="3.5" fill="#F687B3" opacity="0.9" />
                <circle cx="-2.5" cy="-1.5" r="2.5" fill="#FBCFE8" opacity="0.85" />
                <circle cx="2.5" cy="-1.5" r="2.5" fill="#FBCFE8" opacity="0.85" />
                <circle cx="0" cy="0" r="1.5" fill="#FFE66D" opacity="0.9" />
              </g>
              <g transform="translate(850, 127) scale(2.8)">
                <circle cx="0" cy="0" r="3.5" fill="#FFE66D" opacity="0.9" />
                <circle cx="-2.5" cy="-1.5" r="2.5" fill="#FEF3C7" opacity="0.85" />
                <circle cx="2.5" cy="-1.5" r="2.5" fill="#FEF3C7" opacity="0.85" />
                <circle cx="0" cy="0" r="1.5" fill="#F59E0B" opacity="0.9" />
              </g>
              <g transform="translate(1180, 124) scale(2.8)">
                <circle cx="0" cy="0" r="3.5" fill="#FB7185" opacity="0.9" />
                <circle cx="-2.5" cy="-1.5" r="2.5" fill="#FDA4AF" opacity="0.85" />
                <circle cx="2.5" cy="-1.5" r="2.5" fill="#FDA4AF" opacity="0.85" />
                <circle cx="0" cy="0" r="1.5" fill="#FCD34D" opacity="0.9" />
              </g>
              <g transform="translate(1450, 136) scale(2.8)">
                <circle cx="0" cy="0" r="3.5" fill="#34D399" opacity="0.9" />
                <circle cx="-2.5" cy="-1.5" r="2.5" fill="#6EE7B7" opacity="0.85" />
                <circle cx="2.5" cy="-1.5" r="2.5" fill="#6EE7B7" opacity="0.85" />
                <circle cx="0" cy="0" r="1.5" fill="#FBBF24" opacity="0.9" />
              </g>

              {/* Small scattered flowers for density */}
              <g transform="translate(220, 135) scale(2)">
                <circle cx="0" cy="0" r="2.5" fill="#FFD93D" opacity="0.8" />
                <circle cx="-1.5" cy="-1" r="1.5" fill="#FFE66D" opacity="0.75" />
                <circle cx="1.5" cy="-1" r="1.5" fill="#FFE66D" opacity="0.75" />
              </g>
              <g transform="translate(470, 132) scale(2)">
                <circle cx="0" cy="0" r="2.5" fill="#A78BFA" opacity="0.8" />
                <circle cx="-1.5" cy="-1" r="1.5" fill="#C4B5FD" opacity="0.75" />
                <circle cx="1.5" cy="-1" r="1.5" fill="#C4B5FD" opacity="0.75" />
              </g>
              <g transform="translate(710, 128) scale(2)">
                <circle cx="0" cy="0" r="2.5" fill="#FF8C42" opacity="0.8" />
                <circle cx="-1.5" cy="-1" r="1.5" fill="#FFB380" opacity="0.75" />
                <circle cx="1.5" cy="-1" r="1.5" fill="#FFB380" opacity="0.75" />
              </g>
              <g transform="translate(980, 136) scale(2)">
                <circle cx="0" cy="0" r="2.5" fill="#F687B3" opacity="0.8" />
                <circle cx="-1.5" cy="-1" r="1.5" fill="#FBB6CE" opacity="0.75" />
                <circle cx="1.5" cy="-1" r="1.5" fill="#FBB6CE" opacity="0.75" />
              </g>
              <g transform="translate(1220, 131) scale(2)">
                <circle cx="0" cy="0" r="2.5" fill="#60A5FA" opacity="0.8" />
                <circle cx="-1.5" cy="-1" r="1.5" fill="#93C5FD" opacity="0.75" />
                <circle cx="1.5" cy="-1" r="1.5" fill="#93C5FD" opacity="0.75" />
              </g>
              <g transform="translate(1360, 129) scale(2)">
                <circle cx="0" cy="0" r="2.5" fill="#EF4444" opacity="0.8" />
                <circle cx="-1.5" cy="-1" r="1.5" fill="#F87171" opacity="0.75" />
                <circle cx="1.5" cy="-1" r="1.5" fill="#F87171" opacity="0.75" />
              </g>
              <g transform="translate(1590, 134) scale(2)">
                <circle cx="0" cy="0" r="2.5" fill="#FFD93D" opacity="0.8" />
                <circle cx="-1.5" cy="-1" r="1.5" fill="#FFE66D" opacity="0.75" />
                <circle cx="1.5" cy="-1" r="1.5" fill="#FFE66D" opacity="0.75" />
              </g>
              <g transform="translate(1820, 125) scale(2)">
                <circle cx="0" cy="0" r="2.5" fill="#A78BFA" opacity="0.8" />
                <circle cx="-1.5" cy="-1" r="1.5" fill="#C4B5FD" opacity="0.75" />
                <circle cx="1.5" cy="-1" r="1.5" fill="#C4B5FD" opacity="0.75" />
              </g>
            </g>
          </svg>

          {/* Cloud Layers */}
          <svg className="cloud-layer layer-1" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            {/* Layer 1: Far clouds (static, large) - increased opacity */}
            <path
              d="M 200 300 C 200 250, 300 220, 400 250 C 450 200, 550 220, 600 270 C 650 250, 700 270, 700 320 C 700 370, 650 390, 600 380 C 550 420, 450 420, 400 390 C 350 400, 250 380, 200 330 Z"
              className="cloud static"
              opacity="0.55"
              filter="url(#cloud-blur)"
            />
            <path
              d="M 1400 200 C 1400 160, 1480 140, 1560 160 C 1600 130, 1680 150, 1720 190 C 1760 170, 1800 190, 1800 230 C 1800 270, 1760 290, 1720 280 C 1680 310, 1600 310, 1560 290 C 1520 300, 1450 280, 1400 240 Z"
              className="cloud static"
              opacity="0.5"
              filter="url(#cloud-blur)"
            />
            <path
              d="M 100 800 C 100 760, 180 740, 260 760 C 300 730, 380 750, 420 790 C 460 770, 500 790, 500 830 C 500 870, 460 890, 420 880 C 380 910, 300 910, 260 890 C 220 900, 150 880, 100 840 Z"
              className="cloud static"
              opacity="0.48"
              filter="url(#cloud-blur)"
            />
            <path
              d="M 800 150 C 800 110, 880 90, 960 110 C 1000 80, 1080 100, 1120 140 C 1160 120, 1200 140, 1200 180 C 1200 220, 1160 240, 1120 230 C 1080 260, 1000 260, 960 240 C 920 250, 850 230, 800 190 Z"
              className="cloud static"
              opacity="0.52"
              filter="url(#cloud-blur)"
            />
          </svg>

          <svg className="cloud-layer layer-2" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            {/* Layer 2: Mid clouds (2 with drift animation) - increased opacity */}
            <path
              d="M 800 400 C 800 370, 860 355, 920 370 C 950 350, 1010 365, 1040 395 C 1070 380, 1100 395, 1100 425 C 1100 455, 1070 470, 1040 462 C 1010 485, 950 485, 920 467 C 890 475, 835 460, 800 430 Z"
              className="cloud drift-slow"
              opacity="0.62"
              filter="url(#cloud-blur)"
            />
            <path
              d="M 600 650 C 600 625, 655 612, 710 625 C 738 608, 790 620, 815 645 C 840 632, 865 645, 865 670 C 865 695, 840 708, 815 701 C 790 721, 738 721, 710 706 C 682 713, 632 700, 600 675 Z"
              className="cloud drift-slow"
              opacity="0.58"
              filter="url(#cloud-blur)"
              style={{ animationDelay: '-40s' }}
            />
            <path
              d="M 1600 500 C 1600 475, 1655 462, 1710 475 C 1738 458, 1790 470, 1815 495 C 1840 482, 1865 495, 1865 520 C 1865 545, 1840 558, 1815 551 C 1790 571, 1738 571, 1710 556 C 1682 563, 1632 550, 1600 525 Z"
              className="cloud static"
              opacity="0.55"
              filter="url(#cloud-blur)"
            />
            <path
              d="M 300 450 C 300 425, 355 412, 410 425 C 438 408, 490 420, 515 445 C 540 432, 565 445, 565 470 C 565 495, 540 508, 515 501 C 490 521, 438 521, 410 506 C 382 513, 332 500, 300 475 Z"
              className="cloud static"
              opacity="0.6"
              filter="url(#cloud-blur)"
            />
          </svg>

          <svg className="cloud-layer layer-3" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            {/* Layer 3: Near wisps (static, small) - increased opacity */}
            <ellipse cx="300" cy="150" rx="90" ry="35" className="cloud static" opacity="0.65" filter="url(#cloud-blur)" />
            <ellipse cx="1500" cy="900" rx="100" ry="40" className="cloud static" opacity="0.68" filter="url(#cloud-blur)" />
            <ellipse cx="1700" cy="300" rx="85" ry="32" className="cloud static" opacity="0.62" filter="url(#cloud-blur)" />
            <ellipse cx="150" cy="600" rx="85" ry="33" className="cloud static" opacity="0.6" filter="url(#cloud-blur)" />
            <ellipse cx="1200" cy="150" rx="80" ry="30" className="cloud static" opacity="0.64" filter="url(#cloud-blur)" />
            <ellipse cx="500" cy="850" rx="75" ry="28" className="cloud static" opacity="0.63" filter="url(#cloud-blur)" />

            {/* Sun - cartoony with static rays */}
            <g className="sun" transform="translate(200, 180)">
              {/* Sun glow - large */}
              <circle cx="0" cy="0" r="120" fill="url(#sun-glow)" opacity="0.7" />

              {/* Sun rays/spikes - 8 static rays */}
              <polygon points="0,-45 -6,-51 0,-80 6,-51" fill="rgba(255, 210, 80, 0.9)" />
              <polygon points="32,-32 26,-38 45,-57 38,-26" fill="rgba(255, 210, 80, 0.9)" />
              <polygon points="45,0 51,-6 80,0 51,6" fill="rgba(255, 210, 80, 0.9)" />
              <polygon points="32,32 38,26 57,45 26,38" fill="rgba(255, 210, 80, 0.9)" />
              <polygon points="0,45 6,51 0,80 -6,51" fill="rgba(255, 210, 80, 0.9)" />
              <polygon points="-32,32 -26,38 -45,57 -38,26" fill="rgba(255, 210, 80, 0.9)" />
              <polygon points="-45,0 -51,6 -80,0 -51,-6" fill="rgba(255, 210, 80, 0.9)" />
              <polygon points="-32,-32 -38,-26 -57,-45 -26,-38" fill="rgba(255, 210, 80, 0.9)" />

              {/* Sun body */}
              <circle cx="0" cy="0" r="45" fill="rgba(255, 220, 100, 0.95)" />

              {/* Inner glow */}
              <circle cx="0" cy="0" r="35" fill="rgba(255, 240, 150, 0.7)" />
            </g>
          </svg>
        </>
      ) : (
        // Dark Mode: Nighttime Sky with Stars
        <>
          {/* Sky Gradient Base */}
          <div className="sky-gradient dark-sky" />

          {/* Hero Glow */}
          <div className="hero-glow dark-glow" />

          {/* Horizon Line */}
          <div className="horizon-line dark-horizon" />

          {/* Star Layers */}
          <svg className="star-layer layer-1" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            {/* Layer 1: Distant stars (static) - REDUCED for performance */}
            {generateStars(50, 'distant', [
              [0, 0, 500, 1080], // Left edge
              [1420, 0, 500, 1080], // Right edge
              [0, 0, 1920, 350], // Top edge
              [0, 730, 1920, 350], // Bottom edge
            ])}
          </svg>

          <svg className="star-layer layer-2" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            {/* Layer 2: Bright stars with pulse - REDUCED for performance */}
            {generateStars(20, 'bright pulse-slow', [
              [0, 0, 600, 1080],
              [1320, 0, 600, 1080],
              [0, 0, 1920, 400],
              [0, 680, 1920, 400],
              [500, 300, 920, 480], // Some in center
            ])}
          </svg>

          <svg className="star-layer layer-3" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            {/* Layer 3: Constellation lines */}
            <g className="constellation" opacity="0.25">
              {/* Top-left constellation */}
              <line x1="200" y1="180" x2="280" y2="220" stroke="#FFFEF2" strokeWidth="0.8" />
              <line x1="280" y1="220" x2="340" y2="160" stroke="#FFFEF2" strokeWidth="0.8" />
              <line x1="340" y1="160" x2="420" y2="200" stroke="#FFFEF2" strokeWidth="0.8" />

              {/* Top-right constellation */}
              <line x1="1520" y1="200" x2="1600" y2="160" stroke="#FFFEF2" strokeWidth="0.8" />
              <line x1="1600" y1="160" x2="1680" y2="220" stroke="#FFFEF2" strokeWidth="0.8" />
              <line x1="1680" y1="220" x2="1720" y2="180" stroke="#FFFEF2" strokeWidth="0.8" />

              {/* Bottom constellation */}
              <line x1="600" y1="880" x2="720" y2="920" stroke="#FFFEF2" strokeWidth="0.8" />
              <line x1="720" y1="920" x2="820" y2="860" stroke="#FFFEF2" strokeWidth="0.8" />
            </g>

            {/* Crescent Moon - in fixed layer so it follows viewport */}
            <g className="moon" transform="translate(1700, 180)">
              {/* Moon glow */}
              <circle cx="0" cy="0" r="100" fill="url(#moon-glow)" opacity="0.8" />

              {/* Moon body */}
              <circle cx="0" cy="0" r="40" fill="rgba(255, 253, 235, 0.95)" />

              {/* Crescent cutout */}
              <circle cx="12" cy="-5" r="35" fill="hsl(0 0% 4%)" />
            </g>
          </svg>
        </>
      )}
      </div>
    </>
  );
};

// Helper function to create 4-pointed star shape path
function createStarPath(cx: number, cy: number, size: number): string {
  const innerSize = size * 0.3;
  return `
    M ${cx},${cy - size}
    L ${cx + innerSize},${cy - innerSize}
    L ${cx + size},${cy}
    L ${cx + innerSize},${cy + innerSize}
    L ${cx},${cy + size}
    L ${cx - innerSize},${cy + innerSize}
    L ${cx - size},${cy}
    L ${cx - innerSize},${cy - innerSize}
    Z
  `;
}

// Helper function to generate deterministic star positions
function generateStars(
  count: number,
  className: string,
  regions: number[][] // [x, y, width, height]
): JSX.Element[] {
  const stars: JSX.Element[] = [];
  let seed = 42; // Deterministic seed

  // Simple seeded random
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const starsPerRegion = Math.ceil(count / regions.length);

  regions.forEach((region, regionIdx) => {
    const [rx, ry, rw, rh] = region;

    for (let i = 0; i < starsPerRegion && stars.length < count; i++) {
      const x = rx + random() * rw;
      const y = ry + random() * rh;
      const size = className.includes('bright')
        ? 2.5 + random() * 1.5  // Increased from 1.5 + 0.8
        : 1.5 + random() * 1;   // Increased from 1 + 0.5
      const opacity = className.includes('bright')
        ? 0.6 + random() * 0.4  // Increased from 0.4 + 0.3
        : 0.4 + random() * 0.3; // Increased from 0.2 + 0.2

      // Random twinkle animation for bright stars
      let style: React.CSSProperties | undefined = undefined;
      if (className.includes('pulse')) {
        const twinkleVariant = Math.floor(random() * 3) + 1; // 1, 2, or 3
        const duration = 2 + random() * 4; // 2-6 seconds
        const delay = random() * 5; // 0-5 second delay
        style = {
          animation: `star-twinkle-${twinkleVariant} ${duration.toFixed(1)}s ease-in-out ${delay.toFixed(1)}s infinite`,
        };
      }

      stars.push(
        <path
          key={`star-${regionIdx}-${i}`}
          d={createStarPath(x, y, size)}
          fill="#FFFEF2"
          opacity={opacity}
          className={className}
          style={style}
          filter="url(#star-glow)"
        />
      );
    }
  });

  return stars;
}

export default AtmosphericBackground;
