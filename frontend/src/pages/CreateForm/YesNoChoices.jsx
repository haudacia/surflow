const YesNoChoices = () => {
  return (
    <div className='flex gap-4 mt-4 justify-between max-w-40 md:flex-col lg:flex-row'>
      <div className='bg-fuchsia-300 flex items-center border-[1px] border-black w-full'>
        <span className='bg-fuchsia-400 min-w-8 h-full flex items-center justify-center'>A</span>
        <input type='text' disabled className='outline-none bg-transparent pl-4' value='Yes' />
      </div>
      <div className='bg-fuchsia-300 flex items-center border-[1px] border-black w-full'>
        <span className='bg-fuchsia-400 min-w-8 h-full flex items-center justify-center'>B</span>
        <input type='text' disabled className='outline-none bg-transparent pl-4' value='No' />
      </div>
    </div>
  );
};

export default YesNoChoices;
