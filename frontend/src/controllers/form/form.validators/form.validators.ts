export const isNotLink = (value: string) => {
  const emailPattern = /.+@.+\..+/g;
  const linkPattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/ig;

  return !value.match(emailPattern) && !value.match(linkPattern);
};
