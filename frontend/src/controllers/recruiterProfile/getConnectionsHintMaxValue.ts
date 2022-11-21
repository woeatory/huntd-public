interface GetConnectionsHintMaxValue {
  (connectionsCount: number): number
}

export const getConnectionsHintMaxValue:
  GetConnectionsHintMaxValue = (
    connectionsCount,
  ) => (connectionsCount < 10 ? 10 : 20);
