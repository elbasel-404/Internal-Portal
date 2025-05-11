'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

interface NotificationProps {
  message: string;
}
export const Notification = ({ message }: NotificationProps) => {
  useEffect(() => {
    if (!message) return;
    toast(message);
  }, [message]);
  return null;
};
