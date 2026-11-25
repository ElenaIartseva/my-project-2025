import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import path from 'path';

type WebpackRule = {
  test?: {
    test?: (value: string) => boolean;
  };
  issuer?: unknown;
  resourceQuery?: RegExp | { not?: unknown[] };
  exclude?: RegExp;
  [key: string]: unknown;
};

const getResourceQueryNot = (resourceQuery: WebpackRule['resourceQuery']) => {
  if (
    resourceQuery &&
    !(resourceQuery instanceof RegExp) &&
    Array.isArray(resourceQuery.not)
  ) {
    return resourceQuery.not;
  }

  return [];
};

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
    deviceSizes: [360, 480, 768, 1024, 1280, 1920, 2560],
    imageSizes: [100, 50, 25],
  },

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@images': path.resolve(__dirname, 'public/images'),
      '@vendor': path.resolve(__dirname, 'src/vendor'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    };

    const fileLoaderRule = config.module.rules.find((rule: WebpackRule) =>
      rule.test?.test?.('.svg'),
    );
    if (fileLoaderRule) {
      config.module.rules.push({
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      });
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [...getResourceQueryNot(fileLoaderRule.resourceQuery), /url/],
        },
        use: ['@svgr/webpack'],
      });
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default function config(phase: string): NextConfig {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...nextConfig,
      distDir: '.next-dev',
      typescript: { tsconfigPath: 'tsconfig.dev.json' },
    };
  }

  return nextConfig;
}
