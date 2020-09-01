import convict from "convict";

const checkMappingFormat = (value: string) => {
  try {
    const result = JSON.parse(value);
    const type = Object.prototype.toString.call(result);

    if (type !== "[object Object]") {
      throw new Error("must be an object");
    }

    if (!Object.values(result).every((value) => typeof value === "string")) {
      throw new Error("must be an object with only string values");
    }
  } catch (err) {
    throw new Error("must be valid JSON");
  }
};

convict.addFormat({
  name: "ngrok-mapping",
  validate: checkMappingFormat,
});

export const config = convict({
  ngrok: {
    region: {
      doc: "the region in which to open the tunnel",
      env: "NGROK_REGION",
      default: "eu",
      format: ["us", "eu", "au", "ap"],
    },
    inspect: {
      doc: "Whether to spawn inspect server and to bind it to /ngrok",
      env: "NGROK_INSPECT",
      default: false,
      format: Boolean,
    },
    mapping: {
      doc: "Associate routes with backend services",
      env: "NGROK_MAPPING",
      format: "ngrok-mapping",
      default: "{}",
    },
  },
  imgix: {
    domain: {
      doc: "Name of the Imgix subdomain for the source",
      env: "IMGIX_DOMAIN",
      default: "",
    },
    token: {
      doc: "Secret token of the Imgix source",
      env: "IMGIX_TOKEN",
      sensitive: true,
      default: "",
    },
  },
});
config.validate({ allowed: "strict" });
