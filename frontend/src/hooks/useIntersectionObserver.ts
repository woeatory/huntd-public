import { useState, useEffect, useRef } from 'react';

interface ObserverInterface {
  initialState?: boolean;
  rootMargin?: string;
  noUnobserve?: boolean;
}

export const useIntersectionObserver = (
  {
    initialState, rootMargin, noUnobserve,
  }: ObserverInterface = {
    initialState: false,
    rootMargin: '0px 0px 200px 0px',
    noUnobserve: false,
  },
) => {
  const [inView, setInView] = useState(initialState);
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { isIntersecting } = entry;

          if (noUnobserve) {
            setInView(isIntersecting);
          } else if (isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        rootMargin,
      },
    );

    if (element.current) {
      observer.observe(element.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [noUnobserve, rootMargin]);

  return { inView, setInView, element };
};
