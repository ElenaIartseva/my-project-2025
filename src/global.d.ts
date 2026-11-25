// Route types are included separately by each tsconfig.
/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare module '*.scss';

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
