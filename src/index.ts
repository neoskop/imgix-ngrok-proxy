import express, { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "./config";
import { pathRewrite } from "./imgix";
import { connect } from "./ngrok";

(async function () {
  const app = express();
  for (const entry of Object.entries(JSON.parse(config.get("ngrok.mapping")))) {
    const ngrokUrl = await connect(entry[1] as string);
    app.use(
      createProxyMiddleware(entry[0], {
        target: `https://${process.env.IMGIX_DOMAIN}`,
        pathRewrite: pathRewrite(ngrokUrl),
        changeOrigin: true,
      })
    );
  }

  if (config.get("ngrok.inspect")) {
    ["inspect", "static", "grpc", "status"].forEach((path) =>
      app.use(
        createProxyMiddleware(`/${path}`, {
          target: `http://127.0.0.1:4040/`,
        })
      )
    );
  }

  app.get("/", (req: Request, res: Response) => {
    res.redirect("https://github.com/neoskop/imgix-ngrok-proxy");
  });
  app.listen(3000);
})();
