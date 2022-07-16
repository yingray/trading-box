export const getQS = (params: { [key: string]: string }) => {
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    urlParams.set(key, val);
  });
  return urlParams.toString();
};
