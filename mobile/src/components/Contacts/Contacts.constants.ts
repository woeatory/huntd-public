export enum SocialLinkPlaceholders {
  Linkedin = 'https://www.linkedin.com/in/name/',
  Behance = 'https://www.behance.net/name',
  Github = 'https://github.com/name/'
}

export enum SocialProviders {
  Linkedin = 'Linkedin',
  Behance = 'Behance',
  Github = 'Github'
}

export const SOCIAL_LINKS_PATTERNS = {
  Linkedin: /http(s)?:\/\/([w]{3}\.)?linkedin\.com\/in\/(?:\/.+)?/,
  Behance: /http(s)?:\/\/([w]{3}\.)?behance\.net(?:\/.+)?/,
  Github: /http(s)?:\/\/([w]{3}\.)?github\.com(?:\/.+)?/,
};
