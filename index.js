const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const ImgixClient = require("imgix-core-js");
const ngrok = require("ngrok");

for (const varName of ["NGROK_TARGET", "IMGIX_DOMAIN", "IMGIX_TOKEN"]) {
  if (!process.env[varName]) {
    console.error(`Set env variable ${varName}`);
    process.exit(1);
  }
}

(async function () {
  const ngrokUrl = await ngrok.connect({ addr: process.env.NGROK_TARGET });

  const app = express();
  var imgixClient = new ImgixClient({
    domain: process.env.IMGIX_DOMAIN,
    secureURLToken: process.env.IMGIX_TOKEN,
  });
  app.use(
    /\/.+/,
    createProxyMiddleware({
      target: `https://${process.env.IMGIX_DOMAIN}`,
      pathRewrite: (path, req) => {
        const pathWithoutQueryString = path.split("?")[0];
        const newPath = imgixClient.buildURL(
          ngrokUrl + pathWithoutQueryString,
          path.includes("?")
            ? Object.fromEntries(new URLSearchParams(path.split("?")[1]))
            : {}
        );
        return newPath;
      },
      changeOrigin: true,
    })
  );
  app.get("/", (req, res) => {
    res.redirect("https://github.com/neoskop/imgix-ngrok-proxy");
  });
  app.listen(3000);
})();
