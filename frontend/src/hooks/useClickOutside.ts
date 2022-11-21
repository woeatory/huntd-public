import {
  useState,
  useEffect,
  useRef,
  Dispatch,
  RefObject,
  SetStateAction,
} from 'react';

interface Output {
  ref: RefObject<any>;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

export const useClickOutside = (
  initialValue: boolean,
  shouldHandle: boolean,
): Output => {
  const [active, setActive] = useState(initialValue);
  const ref = useRef<any>(null);

  const handleClickOutside = (event: Event): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setActive(false);
    }
  };

  useEffect(() => {
    if (!shouldHandle) {
      return () => null;
    }

    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  });

  return { ref, active, setActive };
};
