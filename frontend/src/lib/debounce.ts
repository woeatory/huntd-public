export const debounce = <F extends(...params: any) => void>(
  fn: F,
  delay = 250,
) => {
  let timer: number;

  const debounced = (...args: any) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };

  debounced.force = fn;
  debounced.clear = () => {
    clearTimeout(timer);
  };

  return debounced as {
    (...args: Parameters<F>): ReturnType<F>,
    force: F,
    clear(): void
  };
};
