import { ReactNode } from 'react';
import { Footer } from './footer';
import { Header } from './header';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </>
  );
}
