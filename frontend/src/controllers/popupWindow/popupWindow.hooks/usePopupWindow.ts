import { useCallback } from 'react';

interface UsePopupWindow {
  (params: {
    url: string;
    target?: string;
    callback?: (...args: any[]) => void;
  }): () => Window | null;
}

const WINDOW_WIDTH = 640;
const WINDOW_INDENT = 50;

export const usePopupWindow: UsePopupWindow = (params) => {
  const {
    url,
    target = '',
  } = params;

  return useCallback(() => {
    const windowParams = `
      scrollbars=no,
      resizable=no,
      status=no,
      location=no,
      toolbar=no,
      menubar=no,
      width=${WINDOW_WIDTH},
      height=${window.innerHeight - (WINDOW_INDENT * 2)},
      left=${window.innerWidth - WINDOW_WIDTH - (WINDOW_INDENT * 2)},
      top=${WINDOW_INDENT}
    `;

    try {
      return window.open(url, target, windowParams);
    } catch {
      return null;
    }
  }, [url, target]);
};
