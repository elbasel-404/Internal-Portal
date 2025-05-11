import localFont from 'next/font/local';

export const fonts = localFont({
  src: [
    {
      path: '../fonts/29LTAzer-Bold.woff',
      weight: '600',
    },
    {
      path: '../fonts/29LTAzer-Medium.woff',
      weight: '500',
    },
    {
      path: '../fonts/29LTAzer-Regular.ttf',
      weight: '400',
    },
    {
      path: '../fonts/29LTAzer-Light.woff',
      weight: '300',
    },
    {
      path: '../fonts/29LTAzer-ExtraLight.woff',
      weight: '200',
    },
    {
      path: '../fonts/29LTAzer-Thin.woff',
      weight: '100',
    },
  ],
});
