const cryptoHash = require("node:crypto");

export const createPassWordSha256 = (password: string) => {
  const sha256 = cryptoHash.createHash("sha256")
  .update(password)
  .digest("hex");
  return sha256
};
