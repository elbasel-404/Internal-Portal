'use client';

import { useEffect, useState } from 'react';

type User = {
  _id: string;
  name: string;
  email: string;
  gender?: number;
  track?: string;
  role?: string;
  createdAt?: string;
  isActive?: boolean;
  createdBy?: {
    _id: string;
    name: string;
    email: string;
  };
};

const Test1Page = () => {
  //@typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        'https://test.api.techpass.online/users/list?search=&pagination[page]=1&pagination[size]=20',
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDkzMjY1MmMyODk1MzVjOWU0MjMzZSIsImVtYWlsIjoidGVjaHBhc3Muc3VwZXJhZG1pbkB0ZWNocGFzcy5jb20iLCJuYW1lIjoiVGVjaFBhc3Mgc3VwZXJBZG1pbiIsInJvbGVzIjp7InJvbGVJZCI6IjY2Yzk1YTgyMzBhZWM0ZTk1ODA4ZTU4OSIsIm5hbWUiOiJzdXBlci1hZG1pbiJ9LCJnZW5kZXIiOjEsIm9yZ2FuaXphdGlvbklkIjoiNjZkOTMyNjUyYzI4OTUzNWM5ZTQyMzM5IiwiaWF0IjoxNzQ1NDAwNDYxLCJleHAiOjE3NDU1NzMyNjF9.czz_edPENFS0Z3wjMB45sfnROCx_dSX47E_nrnNUm-Q',
          },
        }
      );

      const responseJson = await response.json();

      setUsers(responseJson.items || []);
      console.log('Users:', responseJson.items);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>قائمة المستخدمين</h1>
      {loading ? (
        <div className='text-gray-600'>جارٍ التحميل...</div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto border border-gray-200'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border px-4 py-2'>#</th>
                <th className='border px-4 py-2'>الاسم</th>
                <th className='border px-4 py-2'>البريد الإلكتروني</th>
                <th className='border px-4 py-2'>الهوية</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className='text-center'>
                  <td className='border px-4 py-2'>{index + 1}</td>
                  <td className='border px-4 py-2'>{user.name || '—'}</td>
                  <td className='border px-4 py-2'>{user.email || '—'}</td>
                  <td className='border px-4 py-2'>{user._id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Test1Page;
