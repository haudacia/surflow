import { useCustomFormProvider } from '../../context/FormContext.jsx';
import { cloneElement, useCallback } from 'react';
import { questionTypes } from '../../constants/questionTypes.jsx';
import { classNames } from '../../utils/utils.js';

const QuestionCard = ({ question, index, onDragStart, onDragOver, onDrop }) => {
  const { setActiveQuestion, activeQuestion, removeQuestion } = useCustomFormProvider();
  const handleSelectQuestion = useCallback(() => {
    setActiveQuestion(index);
  }, [index, setActiveQuestion]);

  const isSelected = activeQuestion === index;

  const icon = questionTypes?.find((questionType) => questionType.value === question.type)?.icon;

  return (
    <div className='relative min-w-fit '>
      <li
        className={classNames(
          'flex border-[1px] border-b-black h-12 w-full items-center pl-4 gap-4 text-sm',
          isSelected ? 'bg-azure/50' : '',
        )}
        draggable
        onDragStart={onDragStart}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={handleSelectQuestion}
      >
        {cloneElement(icon, { number: index + 1 })}
        <p className='truncate'>{question.text}</p>
      </li>
      {index > 0 && (
        <button
          type='button'
          className='rounded-full absolute right-[24px] top-[12px] text-xl bg- hover:text-4xl hover:top-[4px] hover:right-[19px] text-black transition-all duration-400'
          onClick={() => removeQuestion(index)}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default QuestionCard;
