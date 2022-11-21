export const cmsGraphqlPath = `${strapi.backendURL}/graphql`;

export const getCmsClientHeaders = () => {
  const token = localStorage.getItem('jwtToken')
  || sessionStorage.getItem('jwtToken')
  || '';

  return {
    authorization: `Bearer ${token.slice(1, -1)}`,
  };
};
