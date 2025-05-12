'use client';

import {
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Switch,
} from '@ui';
import Image from 'next/image';
import { useState } from 'react';
import { AngleRightIcon, TableIcon } from '../icons';

const themes = [
  { id: 'r1', value: 'darkBlue', label: 'الأزرق', src: '/dark-blue.svg' },
  { id: 'r2', value: 'default', label: 'الأساسي', src: '/default.svg' },
  { id: 'r3', value: 'green', label: 'الأخضر', src: '/green.svg' },
  { id: 'r4', value: 'night', label: 'الليلي', src: '/night.svg' },
];

export const Preferences = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSideMenuActive, setIsSideMenuActive] = useState(true);
  const [isTopMenuActive, setIsTopMenuActive] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('darkBlue');

  return (
    <div className='fixed left-0 top-32'>
      <Popover onOpenChange={(open) => setIsPopoverOpen(open)}>
        <PopoverTrigger asChild>
          <Button className='flex gap-5 px-5 py-8 rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl bg-white shadow-sm hover:bg-white'>
            <AngleRightIcon className='fill-primary' width={10} height={12} />
            <div
              className={`flex flex-col gap-1 items-center justify-center transition-all duration-300 ease-in-out ${
                isPopoverOpen ? 'w-4 h-4' : 'w-0 h-0 opacity-0 -ml-4'
              }`}
            >
              <TableIcon className='fill-primary' width={24} height={24} />
              <p className='text-foreground font-medium'>السمات</p>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align='start'
          side='right'
          className='flex flex-col justify-center gap-3 px-0 py-4 bg-white rounded-xl shadow-lg w-full'
        >
          <h2 className='text-foreground font-bold text-xl px-4 py-2 text-start'>
            قائمة السمات و الأنماط
          </h2>
          <div className='flex justify-center items-center w-full'>
            {/* Side Menu */}
            <div className='flex flex-col gap-5 justify-center items-center p-10 w-1/2 bg-[#D3E6ED]'>
              <p className='text-foreground text-sm'>
                القائمة الجانبية (افتراضي)
              </p>
              <Image
                width={40}
                height={40}
                src='/side-menu.svg'
                alt='side menu'
                className='w-full'
              />
              <div className='flex justify-between items-center rounded-lg bg-white w-full p-2.5'>
                <p>{isSideMenuActive ? 'تفعيل' : 'غير مفعل'}</p>
                <Switch
                  checked={isSideMenuActive}
                  onCheckedChange={setIsSideMenuActive}
                  disabled={isTopMenuActive}
                />
              </div>
            </div>
            {/* Top Menu */}
            <div className='flex flex-col gap-5 justify-center items-center p-10 w-1/2 bg-[#D3D4ED]'>
              <p className='text-foreground text-sm'>
                القائمة العلوية (قريبًا){' '}
              </p>
              <Image
                width={40}
                height={40}
                src='/top-menu.svg'
                alt='side menu'
                className='w-full'
              />
              <div className='flex justify-between items-center rounded-lg bg-white w-full p-2.5'>
                <p>{isTopMenuActive ? 'تفعيل' : 'غير مفعل'}</p>
                <Switch
                  checked={isTopMenuActive}
                  onCheckedChange={setIsTopMenuActive}
                  disabled={isSideMenuActive}
                />
              </div>
            </div>
          </div>
          <h2 className='text-foreground font-medium text-xl px-4 py-2 text-start'>
            السمات
          </h2>
          <RadioGroup
            value={selectedTheme}
            onValueChange={setSelectedTheme}
            className='flex justify-center items-center gap-12 px-6'
          >
            {themes.map((theme) => (
              <div key={theme.id} className='flex flex-col items-center gap-4'>
                <div className='relative w-full'>
                  <Image
                    width={40}
                    height={40}
                    src={theme.src}
                    alt={theme.label}
                    className='w-full'
                  />
                  {theme.value !== 'darkBlue' && (
                    <p className='absolute inset-0 flex items-center justify-center text-sm font-bold text-white bg-black/20 rounded-lg'>
                      قريبًا
                    </p>
                  )}
                </div>
                <Label htmlFor={theme.id}>{theme.label}</Label>
                <RadioGroupItem
                  value={theme.value}
                  id={theme.id}
                  className={`${
                    theme.value !== selectedTheme && 'border-gray-300'
                  }`}
                />
              </div>
            ))}
          </RadioGroup>
        </PopoverContent>
      </Popover>
    </div>
  );
};
