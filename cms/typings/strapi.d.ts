declare namespace strapi {
  const env: string;
  const backendURL: string;
  const lockApp: () => void;
  const unlockApp: () => void;
  const notification: {
    toggle: ({ type: string, message: string }) => void,
  };
}

declare const API_GRAPHQL_ENDPOINT_LOCAL: string;
declare const API_GRAPHQL_TOKEN: string;
