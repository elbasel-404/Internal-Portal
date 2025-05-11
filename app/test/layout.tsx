// import { Body } from '@components';
import { fonts } from '@lib';
import type { ReactNode } from 'react';
import '../(pages)/globals.css';
// import { DirectionProvider } from '@components/providers';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    // <html lang='en' suppressHydrationWarning={true}>
    <html lang='en'>
      {/* <DirectionProvider dir='rtl'> */}
      <body className={`${fonts.className} antialiased`}>
        {/* <Body className={`${fonts.className} antialiased`}>{children}</Body> */}
        {children}
      </body>
      {/* </DirectionProvider> */}
    </html>
  );
};

export default RootLayout;
