interface InstructionsProps {
  title: string;
  description: string;
}

export const Instructions = ({ title, description }: InstructionsProps) => {
  return (
    <div className='bg-white rounded-lg'>
      <h2 className='text-right text-foreground text-2xl font-semibold mb-3 border-b border-[#ECF0F480] p-4'>
        {title}
      </h2>
      <div className='p-4'>
        <div className='bg-cloudGray text-right text-sm text-foreground p-4 rounded-lg'>
          {description}
        </div>
      </div>
    </div>
  );
};
