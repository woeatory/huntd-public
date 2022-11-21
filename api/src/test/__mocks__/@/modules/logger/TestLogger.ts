/* eslint-disable no-console, class-methods-use-this */
import { DebugLoggerInterface, LogLevels, Logger } from '@mate-academy/core';

export class TestLogger extends Logger {
  private readonly servicePrefix: string;

  constructor(options: DebugLoggerInterface = {}) {
    super(options);

    const { servicePrefix = '' } = options;

    this.servicePrefix = servicePrefix;
  }

  debug(...logs: any[]): void {
    console.log(this.prepareLogs(
      logs,
      LogLevels.Debug,
      { service: this.servicePrefix },
    ));
  }

  info(): void { /* ignore info messages in test environment */ }

  warning(): void { /* ignore info messages in test environment */ }

  error(...logs: any[]): void {
    console.error(this.prepareLogs(
      logs,
      LogLevels.Error,
      { service: this.servicePrefix },
    ));
  }

  child(name: string): TestLogger {
    return new TestLogger({
      servicePrefix: this.servicePrefix,
      userId: this.userId,
      parents: [...this.parents, name],
    });
  }
}
