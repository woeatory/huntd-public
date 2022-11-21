interface GetImpersonateLoginLink {
  (options: { email: string, redirect?: string}): string
}
export const getImpersonateLoginLink: GetImpersonateLoginLink = (options) => {
  const email = encodeURIComponent(options.email);

  let link = `${window.location.protocol}//${window.location.hostname}/sign-in-as-user?email=${email}`;

  if (options.redirect) {
    link += '&redirect=';
    link += encodeURIComponent(`${options.redirect}`);
  }

  return link;
};
