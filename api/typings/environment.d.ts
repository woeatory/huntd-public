/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from 'http';
import { Sequelize } from 'sequelize-typescript';
import fetch from 'node-fetch';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { AppEnvironments, NodeEnvironments } from '@mate-academy/core';
import { Sdk } from '@/graphql/generated';

export {};

declare global {
  namespace NodeJS {
    interface Global {
      fetch: typeof fetch;
      apiServer: Server;
      db: Sequelize;
      port: number;
      client: (options?: RequestInit) => Sdk;
    }
    interface ProcessEnv {
      // node
      NODE_ENV: NodeEnvironments;
      APP_ENV: AppEnvironments;

      // redis
      REDIS_HOST: string;
      REDIS_PORT: string;

      // api
      API_SSL: string;
      API_PORT: string;
      API_HOST: string;
      API_HOST_PUBLIC: string;
      API_PATH: string;

      // database
      POSTGRES_USER: string;
      POSTGRES_PWD: string;
      POSTGRES_DB: string;
      POSTGRES_HOST: string;
      FRONTEND_PORT: string;

      // auth
      AUTH_SECRET: string;
      SALT_ROUNDS: string;

      // AWS
      AWS_KEY: string;
      AWS_SECRET: string;
      AWS_REGION: string;
      AWS_SERVERLESS_API_URL: string;
      FILES_HANDLER_BUCKET: string;

      // analytics
      AMPLITUDE_API_KEY: string;

      // create vacancies source
      GET_SINGLE_SOURCE_VACANCIES: string;

      // send users feedback to trello
      SEND_FEEDBACK_TO_TRELLO: string;

      // proxycurl (service for scrapping candidates's linkedin info)
      PROXYCURL_API_KEY: string;
      PROXYCURL_API_ENDPOINT: string;
      PROXYCURL_API_COMPANIES_ENDPOINT: string;

      // send payment request to trello
      SEND_PAYMENT_REQUEST_TO_TRELLO: string;

      // send nft request to trello
      SEND_NFT_REQUEST_TO_TRELLO: string;
    }
  }
}
