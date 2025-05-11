'use client';

import { useEffect, useState } from 'react';
import { icons } from './allIcons';
const IconsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const iconKeys = Object.keys(icons) as (keyof typeof icons)[];
  const [keys, setKeys] = useState(iconKeys);

  useEffect(() => {
    if (!searchTerm) return setKeys(iconKeys);
    const filteredKeys = iconKeys.filter((key) =>
      key.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setKeys(filteredKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <main className='py-2 px-4 '>
      <input
        type='text'
        placeholder='Search icons...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='border my-4 border-black/80 rounded-lg p-2 w-full'
      />
      <div className='grid grid-cols-4 gap-2'>
        {keys.map((key) => {
          const Icon = icons[key];
          return (
            <div
              key={key}
              className='flex border border-black/80 rounded-xl gap-2 flex-col justify-center items-center h-32 p-2'
            >
              <h2>{key}</h2>
              <Icon className='w-24 h-24' />
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default IconsPage;
