interface ComposeFn<R> {
  (a: R): R
}

export const compose = <R>(
  fn1: ComposeFn<R>,
  ...fns: Array<ComposeFn<R>>
): ComposeFn<R> => fns.reduce(
    (prevFn, nextFn) => (value) => prevFn(nextFn(value)),
    fn1,
  );
