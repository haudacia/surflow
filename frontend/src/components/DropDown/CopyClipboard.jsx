import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SmallButton from '../Buttons/SmallButton';

const CopyClipboard = ({ formId }) => {
  const [textToCopy, setTextToCopy] = useState('');

  useEffect(() => {
    if (formId) {
      setTextToCopy(`${location.host}/responseform/${formId}`);
    }
  }, [formId]);

  return (
    <div className='flex flex-row border-[1px] border-black z-50 items-center w-full'>
      <p className='p-2 overflow-hidden overflow-ellipsis whitespace-nowrap flex-grow'>{textToCopy}</p>
      <CopyToClipboard text={textToCopy}>
        <SmallButton text='Copy' className='mr-1' />
      </CopyToClipboard>
    </div>
  );
};

export default CopyClipboard;
