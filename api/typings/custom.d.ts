import 'passport-linkedin-oauth2';

declare module 'passport-linkedin-oauth2' {
  interface StrategyOptionWithRequest {
    scope?: string[]
  }
}
