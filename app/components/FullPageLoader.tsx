import { Modal } from '@components/modals/Modal';

export const FullPageLoader = () => {
  return (
    <Modal initialContentClassName='bg-black text-white w-screen h-screen flex items-center justify-center text-3xl'>
      <div className='animate animate-pulse'>Loading...</div>
    </Modal>
  );
};
