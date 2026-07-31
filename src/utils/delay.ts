export const delay = (duration: number): Promise<void> => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};
