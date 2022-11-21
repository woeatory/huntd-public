export const getOuterHeight = <T extends HTMLElement>(element: T) => {
  const height = element.offsetHeight;
  const style = window.getComputedStyle(element);

  return height
    + parseInt(style.marginTop, 10)
    + parseInt(style.marginBottom, 10);
};
