// https://www.npmjs.com/package/@modulbank/sourcebuster
/* eslint-disable camelcase */

declare module 'sourcebuster' {
  interface InitPrefs {
    // Set custom expiration period for cookies in months
    // 6 months is default
    lifetime?: number;

    // Set custom session length in minutes
    // 30 minutes is default
    session_length?: number;

    // Set domain name in cookies
    domain?: string | {
      host?: string;
      isolate?: boolean
    };

    // Set custom referral sources
    referrals?: Array<{
      host?: string;
      medium?: string;
      display?: string
    }>
    // Set custom organic sources
    organics?: Array<{
      host?: string
      param?: string
      display?: string
    }>

    // Set `utm_source` & `utm_medium` values for `typein` traffic
    // Defaults are `(direct)` & `(none)`
    typein_attributes?: {
      source?: string;
      medium?: string;
    };

    // Set time zone
    timezone_offset?: number;

    // Set custom `utm_campaign` param
    campaign_param?: string;

    // Set user ip
    user_ip?: string;

    // Set promocode
    // Default range is [100000..999999]
    promocode?: {
      min?: number;
      max?: number;
    };

    // Set callback-function;
    // It will be executed right after `sbjs` cookies will be set
    callback?: () => any
  }

  interface Get {
    // Params of the latest visitor’s source. If the visitor had more than one source, this will be the latest values.
    current: {
      typ: string // Traffic type. Possible values: utm, organic, referral, typein.
      src: string // Source. utm_source, actually.
      mdm: string // Medium, utm_medium. Values can be customized using utm-params and referrals.
      cmp: string // Campaign. Value of utm_campaign.
      cnt: string // Content. Value of utm_content.
      trm: string // Keyword. Value of utm_term.
    }

    // Additional info about the visit, when the current source was written.
    current_add: {
      fd: string // Date and time of the visit. Format: yyyy-mm-dd hh:mm:ss. Time zone can be customized via timezone_offset.
      ep: string // Entrance point.
      rf: string // Referer URL.
    }

    // Just like sbjs.get.current & sbjs.get.current_add, but holds params of the very first visit. Stored once, never overwritten.
    first: {
      typ: string // Traffic type. Possible values: utm, organic, referral, typein.
      src: string // Source. utm_source, actually.
      mdm: string // Medium, utm_medium. Values can be customized using utm-params and referrals.
      cmp: string // Campaign. Value of utm_campaign.
      cnt: string // Content. Value of utm_content.
      trm: string // Keyword. Value of utm_term.
    }

    first_add: {
      fd: string // Date and time of the visit. Format: yyyy-mm-dd hh:mm:ss. Time zone can be customized via timezone_offset.
      ep: string // Entrance point.
      rf: string // Referer URL.
    }

    // Current opened session data.
    session: {
      pgs: string // How many pages user have seen during the current session.
      cpg: string // Current page URL.
    }

    // Additional user data: visits, ip & user-agent.
    udata: {
      vst: string // How many times user visited site.
      uip: string // Current ip-address.
      uag: string // Current user-agent (browser).
    }

    // Visitor's promocode. Cookie set only if promocode option is present.
    promo: {
      code: string // Promocode.
    }
  }

  export const init: (prefs: InitPrefs) => void;
  export const get: Get;
}
