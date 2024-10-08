// global.d.ts
declare namespace JSX {
    interface IntrinsicElements {
      'my-mirage': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { color?: string };
    }
  }
  