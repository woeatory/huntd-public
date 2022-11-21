export type LoggerMessage = string | Record<string, any>;

export enum LoggerTypes {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export interface LoggerOptions {
  name?: string;
}

export interface LoggerBody {
  service: string;
  type: LoggerTypes;
  message: string;
  loggerOptions?: LoggerOptions;
}
