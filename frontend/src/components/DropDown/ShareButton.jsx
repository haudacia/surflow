import React, { useState } from 'react';
import CopyClipboard from './CopyClipboard';
import SmallButton from '../Buttons/SmallButton';

const ShareButton = ({ formId, inDropdown = false, className }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {inDropdown ? (
        <button
          type='button'
          onClick={() => setShowModal(true)}
          className='block w-full px-4 py-1 hover:bg-onHoverColor text-left'
        >
          Publish
        </button>
      ) : (
        <SmallButton
          type='button'
          text='Publish'
          onClick={() => setShowModal(true)}
          className={className}
        />
      )
      }

      {showModal && (
        <>
          <div className='fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none'>
            <div className='relative w-auto mx-auto my-6 max-w-2xl'>
              <div className='relative flex flex-col w-full bg-white shadow-lg outline-none focus:outline-none'>
                <div className='flex items-start justify-between p-5 border-b border-solid border-gray-200'>
                  <h3 className='text-lg font-semibold'>Share form</h3>
                  <button
                    className='p-1 ml-auto text-black bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => setShowModal(false)}
                  >
                    <span className='block w-6 h-6 text-2xl bg-transparent text-black outline-none focus:outline-none'>
                      ×
                    </span>
                  </button>
                </div>
                <div className='relative flex-auto p-6'>
                  <CopyClipboard formId={formId} />
                </div>
              </div>
            </div>
          </div>
          <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
        </>
      )}
    </>
  );
};

export default ShareButton;
