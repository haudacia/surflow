import React, { useState } from 'react';
import ShareButton from './ShareButton';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../Modal/ConfirmationModal';

const Dropdown = ({ form, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
  };

  const confirmDelete = () => {
    handleDelete(form._id);
    setIsModalOpen(false);
  };

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          type='button'
          className='inline-flex bg-white rounded-full justify-center self-center text-lg border-[1px] border-black hover:shadow-vaporwave spy-1 text-black hover:bg-white/50 focus:outline-none transition-shadow duration-800'
          id='options-menu'
          aria-haspopup='true'
          aria-expanded={isOpen}
          onClick={toggleDropdown}
        // onBlur={toggleDropdown}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.4}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          onClick={handleMenuClick}
          className='absolute right-0 mt-0 w-fit bg-white focus:outline-none z-10 border-black border-[1px] grid'
        >
          <div role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
            <ShareButton formId={form._id} inDropdown={true} />
            <button
              onClick={() => {
                navigate(`/formAnswers?form=${form._id}`);
                setIsOpen(false);
              }}
              className='block w-full px-4 py-1 hover:bg-onHoverColor text-left border-t border-black'
            >
              Results
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className='block w-full px-4 py-1 hover:bg-onHoverColor text-left border-t border-black'
            >
              Delete
            </button>
            <ConfirmationModal
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title='Confirm Deletion'
              description='Are you sure you want to delete the form?'
              onConfirm={confirmDelete}
              textOnClose='Cancel'
              textOnConfirm='Yes'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
