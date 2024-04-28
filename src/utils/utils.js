import crypto from "crypto";

export const hash = (str) => {
  const hash = crypto
    .createHmac("sha256", process.env.CRYPTO_SECRET)
    .update(str)
    .digest("hex");

  return hash;
};
