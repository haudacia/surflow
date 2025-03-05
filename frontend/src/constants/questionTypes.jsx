import { TbListLetters } from 'react-icons/tb';
import { MdShortText } from 'react-icons/md';
import { LuCircleSlash2 } from 'react-icons/lu';
import { RiListCheck3 } from 'react-icons/ri';
import React from 'react';

const SquaredIcon = ({ icon, color, number }) => {
  return (
    <span className={`p-2 ${color} text-black flex items-center gap-4 min-w-16 h-full text-sm`}>
      {icon}
      {number}
    </span>
  );
};

export const questionTypes = [
  {
    value: 'TextQuestion',
    label: 'Simple Text Question',
    icon: <SquaredIcon icon={<MdShortText size={25} />} color='bg-cyan-' />,
  },
  {
    value: 'MultipleChoiceQuestion',
    label: 'Multiple Choice Question',
    icon: <SquaredIcon icon={<TbListLetters size={25} />} color='bg-yellow-' />,
  },
  {
    value: 'SingleChoiceQuestion',
    label: 'Single Choice Question',
    icon: <SquaredIcon icon={<RiListCheck3 size={25} />} color='bg-green-' />,
  },
  {
    value: 'YesNoQuestion',
    label: 'Yes/No Question',
    icon: <SquaredIcon icon={<LuCircleSlash2 size={25} />} color='bg-fuchsia-' />,
  },
];
