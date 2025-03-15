import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AboutLayout({ children }: Props) {
  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">{children}</main>
  );
}
