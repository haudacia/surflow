import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { HiCheck, HiChevronDown } from 'react-icons/hi';
import { classNames } from '../../utils/utils.js';

const Select = ({ options, onChange, value, label }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div>
        {/* <Label className='text-sm'>{label}</Label> */}
        <div className='relative cursor-pointer'>
          <ListboxButton className='w-full p-4 border-black border-[1px] text-sm sm:leading-6 hover:bg-c2 data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in transition-all'>
            <span>{value?.label}</span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-5'>
              <HiChevronDown className='h-5 w-5' aria-hidden='true' />
            </span>
          </ListboxButton>

          <ListboxOptions
            transition
            className='absolute z-10 t-1 max-h-60 w-full overflow-auto bg-c1 focus:outline-none sm:text-sm'
          >
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                className='text-gray-900 border-black border border-t-0 relative select-none pl-4 focus:bg-neutral-600 focus:text-white hover:bg-c2
              duration-500'
                // className={({ focus }) =>
                //   classNames(
                //     focus ? 'bg-neutral-600 text-white' : '',
                //     !focus ? 'text-gray-900' : '',
                //     'relative cursor-default select-none py-2 pl-3 pr-9',
                //   )
                // }
                value={option.value}
              >
                <>
                  <span
                    className={classNames(
                      option?.value === value ? 'font-semibold' : 'font-normal',
                      'flex truncate items-center gap-2',
                    )}
                  >
                    {option.label}
                  </span>

                  {option?.value === value?.value ? (
                    <span className={classNames('absolute inset-y-0 right-0 flex items-center pr-4')}>
                      <HiCheck />
                    </span>
                  ) : null}
                </>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>


      </div>

    </Listbox >
  );
};

export default Select;
