import ngrok from "ngrok";
import { config } from "./config";

const ngrokConfig = config.get("ngrok");

export const connect = async (target: string) => {
  try {
    return await ngrok.connect({
      addr: target,
      bind_tls: true,
      region: ngrokConfig.region as any,
    });
  } catch (err) {
    console.error(`Creating ngrok tunnel failed: ${err.msg}`);
    process.exit(1);
  }
};
