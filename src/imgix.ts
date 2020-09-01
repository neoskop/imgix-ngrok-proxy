import ImgixClient from "imgix-core-js";

export const imgixClient = new ImgixClient({
  domain: process.env.IMGIX_DOMAIN!,
  secureURLToken: process.env.IMGIX_TOKEN,
});

export const pathRewrite = (ngrokUrl: string) => (
  path: string,
  req: Express.Request
) => {
  const pathWithoutQueryString = path.split("?")[0];
  const newPath = imgixClient.buildURL(
    ngrokUrl + pathWithoutQueryString,
    path.includes("?")
      ? Object.fromEntries(new URLSearchParams(path.split("?")[1]))
      : {}
  );
  return newPath;
};
