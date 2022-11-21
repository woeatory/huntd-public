import React, { useRef, useCallback } from 'react';
import cn from 'classnames';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import styles from '@/components/Base/BackToTopButton/BackToTopButton.module.scss';
import { IconArrowUp } from '@/ui/icons/general/IconArrowUp';

export const BackToTopButton = () => {
  const topRef = useRef<HTMLDivElement | null>(null);
  const { inView, element } = useIntersectionObserver({
    initialState: false,
    noUnobserve: true,
  });

  const backToTop = useCallback(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [topRef]);

  return (
    <>
      <div
        className={styles.pageTop}
        ref={topRef}
        id="page-top"
      />
      <div
        className={cn(styles.wrapper, {
          'is-active': !inView,
        })}
      >
        <div
          onClick={backToTop}
          className={styles.link}
          aria-hidden
        >
          <div className={styles.scrollUp}>
            <IconArrowUp />
          </div>
        </div>
      </div>
      <div className={styles.trigger} ref={element} />
    </>
  );
};
