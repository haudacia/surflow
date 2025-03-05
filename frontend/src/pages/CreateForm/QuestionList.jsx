import React, { useState } from 'react';
import QuestionCard from './QuestionCard.jsx';
import SmallButton from '../../components/Buttons/SmallButton.jsx';
import { useCustomFormProvider } from '../../context/FormContext.jsx';
import { questionTypes } from '../../constants/questionTypes.jsx';
import { useMemo } from 'react';
import Select from '../../components/Form/Select.jsx';

export const QuestionList = () => {
  const { swapQuestion, addQuestion, setActiveQuestion, questions } = useCustomFormProvider();
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      swapQuestion(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const handleAddQuestion = () => {
    addQuestion({ text: '', type: 'TextQuestion', description: '' });
    const newIndex = questions.length;
    setActiveQuestion(newIndex);
  };

  const { setValue, activeQuestion, watch } = useCustomFormProvider();

  const currentType = watch(`questions.${activeQuestion}.type`);
  const type = useMemo(() => questionTypes.find((questionType) => questionType.value === currentType), [currentType]);

  const options = questionTypes.map((questionType) => ({
    value: questionType.value,
    label: (
      <div className='flex items-center'>
        {questionType.icon}
        {questionType.label}
      </div>
    ),
  }));

  const handleOnChangeType = (value) => {
    setValue(`questions.${activeQuestion}.type`, value);
  };

  return (
    <div className='h-full w-full p-28 border-l-black border-l my-auto flex flex-col justify-center'>
      <SmallButton type='button' text='+ Add question' onClick={handleAddQuestion} className='w-full mb-6' />

      <Select
        label='Question Type'
        value={options.find((option) => option.value === currentType)}
        onChange={(value) => handleOnChangeType(value)}
        options={options}
      />
      <div className='border-black border-[1px] border-b-0 border-t-0'>

        <ul>
          {questions.map((question, index) => (
            <QuestionCard
              question={question}
              key={question.id}
              index={index}
              onDragStart={(e) => handleDragStart(e, index)}
              onDrop={(e) => handleOnDrop(e, index)}
              onDragOver={(e) => handleDragOver(e)}
            />
          ))
          }
        </ul >
      </div>
    </div >
  );
};
