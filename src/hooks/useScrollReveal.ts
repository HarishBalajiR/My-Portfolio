import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  cardCount: number;
  scrollPerCard?: number;
  triggerPoint?: number;
}

/**
 * Custom hook for staggered scroll reveal animations
 * @param cardCount - Number of cards to animate
 * @param scrollPerCard - Pixels of scroll per card (default: 120)
 * @param triggerPoint - Viewport percentage trigger point (default: 0.5)
 * @returns sectionRef and cardProgress array
 */
export const useScrollReveal = ({
  cardCount,
  scrollPerCard = 120,
  triggerPoint = 0.5,
}: UseScrollRevealOptions) => {
  const [cardProgress, setCardProgress] = useState<number[]>(
    Array(cardCount).fill(0)
  );
  const sectionRef = useRef<HTMLDivElement>(null);

  // Handle cardCount changes by resizing the array
  useEffect(() => {
    setCardProgress(prev => {
      if (prev.length === cardCount) return prev;
      return Array(cardCount).fill(0);
    });
  }, [cardCount]);

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
        const trigger = windowHeight * triggerPoint;

        if (sectionTop < trigger && sectionTop > -sectionHeight) {
          const scrollProgress =
            (trigger - sectionTop) / (sectionHeight + trigger);

          setCardProgress(prev =>
            prev.map((_, index) => {
              const startScroll = index * scrollPerCard;
              const endScroll = startScroll + scrollPerCard;
              const totalScrolled =
                scrollProgress * (sectionHeight + trigger);

              if (totalScrolled < startScroll) return 0;
              if (totalScrolled > endScroll) return 1;

              return (totalScrolled - startScroll) / scrollPerCard;
            })
          );
        } else if (sectionTop >= trigger) {
          setCardProgress(prev =>
            prev.every(p => p === 0) ? prev : prev.map(() => 0)
          );
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
  }, [cardCount, scrollPerCard, triggerPoint]);

  return { sectionRef, cardProgress };
};
