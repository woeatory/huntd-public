export type LogMessage = string | Record<string, any>;

export enum LogTypes {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export interface LoggerOptions {
  name?: string;
  parents?: string[];
  userId?: number | null;
}

export interface LoggerBody {
  service: string
  type: LogTypes
  message: string
  loggerOptions?: LoggerOptions
}
