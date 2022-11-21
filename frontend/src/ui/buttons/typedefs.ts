import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
} from 'react';

export type ButtonORAnchorCommonAttributes = HTMLAttributes<
  HTMLButtonElement | HTMLAnchorElement
>;

export type ButtonElementProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof HTMLAttributes<HTMLButtonElement>
>;

export type AnchorElementProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof HTMLAttributes<HTMLAnchorElement>
>;
