interface GetData<P> {
  (data?: P): Promise<P>;
}

export const makeGetData = <P>(getDefaultProps: () => P): GetData<P> => async (
  props?: P,
) => ({ ...getDefaultProps(), ...props });
