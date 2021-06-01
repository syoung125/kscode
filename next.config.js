const debug = process.env.NODE_ENV !== "production";

module.exports = {
  target: "serverless",
  webpack: function (config) {
    config.module.rules.push({ test: /\.md$/, use: "raw-loader" });
    config.module.rules.push({ test: /\.yml$/, use: "raw-loader" });
    return config;
  },
  assetPrefix: !debug ? "/Ko-Seoyoung-Code/" : "",
};
