'use server';

export const logToServer = async (text: string) => {
  console.log(
    '%cLOG%c: %s',
    'color: yellow; font-size: 16px; font-weight: bold;',
    'color: inherit; font-size: 14px; font-weight: normal;',
    text
  );
};
