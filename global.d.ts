declare module '*.scss' {
  const classNames: Record<string, string>;
  export default classNames;
}
declare module '*.svg' {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
