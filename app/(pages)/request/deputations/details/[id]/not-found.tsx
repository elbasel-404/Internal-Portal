import { paths } from '@lib';
import Link from 'next/link';

const NotFound = () => {
  return (
    <>
      <h2 className='text-red-500 text-3xl'>Invalid Deputations Request ID</h2>
      <Link className='text-2xl text-blue-400 underline' href={paths.Deputations}>
        Go Back
      </Link>
    </>
  );
};

export default NotFound;
