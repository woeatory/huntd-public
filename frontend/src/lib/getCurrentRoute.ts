export const getCurrentRoute = () => {
  const result = {
    route: '',
  };

  try {
    result.route = window.location.href;
  } catch (e) {
    // do nothing
  }

  return result;
};
