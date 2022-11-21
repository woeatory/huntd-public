import { Response } from 'express';
import { MONTH } from '@/constants/time';
import { ACCESS_TOKEN_NAME, ADMIN_TOKEN_NAME } from './auth.constants';

const getCookiesOptions = () => ({
  secure: process.env.API_SSL === 'true',
  httpOnly: true,
  expires: new Date(Date.now() + MONTH),
});

export const setAuthHeaders = (
  res: Response,
  token: string,
  adminToken?: string,
): void => {
  res.cookie(ACCESS_TOKEN_NAME, token, getCookiesOptions());

  if (adminToken) {
    res.cookie(ADMIN_TOKEN_NAME, adminToken, getCookiesOptions());
  }
};

export const setAdminHeaders = (
  res: Response,
  token: string,
): void => {
  res.cookie(ADMIN_TOKEN_NAME, token, getCookiesOptions());
};

export const deleteAuthHeaders = (res: Response) => {
  res.clearCookie(ACCESS_TOKEN_NAME);
};

export const deleteAdminHeaders = (res: Response) => {
  res.clearCookie(ADMIN_TOKEN_NAME);
};
