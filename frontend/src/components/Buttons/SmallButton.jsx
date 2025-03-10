import React from 'react';
import { classNames } from '../../utils/utils';

const SmallButton = ({ text, className, ...rest }) => {
  return (
    <button
      className={classNames(
        'min-w-fit w-fit px-4 py-1 h-fit shadow-crisp border-[1px] rounded-xl border-black transition-all duration-300 hover:bg-c2 p-3  whitespace-nowrap',
        className
      )}
      {...rest}
    >
      {text.toUpperCase()}
    </button>
  );
};

export default SmallButton;