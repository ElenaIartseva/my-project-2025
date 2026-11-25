'use client';

import { MotionConfig } from 'framer-motion';
import type { PropsWithChildren } from 'react';

export const SiteMotion = ({ children }: PropsWithChildren) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
