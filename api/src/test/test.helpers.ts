import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';

export const getHost = (port: number): string => `http://${process.env.API_HOST_PUBLIC}:${port}`;
export const api = process.env.API_PATH;
export const getGraphQLPath = (): string => `${getHost(global.port)}/${process.env.API_PATH}`;
export const getRestAPIPath = (): string => `${getHost(global.port)}/rest`;
export const createGraphQLClient = (options?: RequestInit): GraphQLClient => {
  const path = getGraphQLPath();

  return new GraphQLClient(path, options);
};
