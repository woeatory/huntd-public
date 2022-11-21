import passport from 'passport';
import { Request } from 'express';
import {
  VerifyCallback as GoogleVerifyCallback,
  Strategy as GoogleStrategy,
} from 'passport-google-oauth2';
import {
  Strategy as LinkedinStrategy,
} from 'passport-linkedin-oauth2';
import { VerifyCallback as CommonVerifyCallback } from 'passport-oauth2';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { getHostUrl } from '@/helpers/getHostUrl';
import { rootLogger } from '@/modules/logger';

export class PassportService {
  static strategyCallback(
    accessToken: string,
    refreshToken: string,
    profile: any,
    cb: CommonVerifyCallback,
  ) {
    return cb(null, { ...profile, accessToken });
  }

  static strategyGoogleCallback(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: GoogleVerifyCallback,
  ) {
    return done(null, { ...profile, accessToken });
  }

  static strategyLinkedinCallback(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: CommonVerifyCallback,
  ) {
    return done(null, { ...profile, accessToken });
  }

  static getGithubRedirectUri = () => {
    const host = getHostUrl();

    return `${host}/rest/oauth/github/callback`;
  };

  static getGoogleRedirectUri = () => {
    const host = getHostUrl();

    return `${host}/rest/oauth/google/callback`;
  };

  static getLinkedinRedirectUri = () => {
    const host = getHostUrl();

    return `${host}/rest/oauth/linkedin/callback`;
  };

  static init() {
    passport.serializeUser((user, cb) => cb(null, user));
    passport.deserializeUser((obj, cb) => cb(null, obj));

    passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET as string,
      callbackURL: PassportService.getGithubRedirectUri(),
      scope: ['user:email'],
    }, PassportService.strategyCallback));

    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
      callbackURL: PassportService.getGoogleRedirectUri(),
      passReqToCallback: true,
      scope: ['email', 'profile'],
    }, PassportService.strategyGoogleCallback));

    passport.use(new LinkedinStrategy({
      clientID: process.env.LINKEDIN_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_OAUTH_CLIENT_SECRET as string,
      callbackURL: PassportService.getLinkedinRedirectUri(),
      scope: ['r_liteprofile', 'r_emailaddress'],
      passReqToCallback: true,
    }, PassportService.strategyLinkedinCallback));

    rootLogger.info('[PASSPORT]: Service initialized successfully');
  }
}
