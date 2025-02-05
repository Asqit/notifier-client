import type { NextConfig } from "next";
import MillionLint from "@million/lint";

const isDevelopment: boolean = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  poweredByHeader: false,
};

export default isDevelopment
  ? MillionLint.next({ rsc: true })(nextConfig)
  : nextConfig;
