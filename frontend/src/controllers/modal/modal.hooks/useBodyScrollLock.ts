import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import scrollBarWidth from 'scrollbar-width';
import { Selectors } from '@/lib/selectors';

interface UseBodyScrollLock {
  (initialValue: boolean) : [
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ]
}

export const useBodyScrollLock: UseBodyScrollLock = (initialValue) => {
  const [active, setActive] = useState(initialValue);

  const toggleScrollbarWidth = useCallback(
    (toggle: boolean) => {
      document.documentElement.style.setProperty(
        '--scrollbar-width',
        toggle ? `${scrollBarWidth()}px` : '0px',
      );
    },
    [],
  );

  const toggleBodyScroll = useCallback(
    (toggle: boolean) => {
      document.documentElement.classList.toggle(Selectors.HasModal, toggle);
    },
    [],
  );

  useEffect(() => {
    toggleScrollbarWidth(active);
    toggleBodyScroll(active);
  },
  [toggleScrollbarWidth, toggleBodyScroll, active]);

  return [active, setActive];
};
