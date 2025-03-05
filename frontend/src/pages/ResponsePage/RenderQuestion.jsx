import React from 'react';

const RenderQuestion = ({ question, index, register }) => {
  if (!question) return null;

  switch (question.type) {
    case 'TextQuestion':
      return (
        <div className='max-w-6xl flex flex-col p-8' key={question._id}>
          <label className='text-2xl font-semibold mb-2'>{question.text}</label>
          <p>{question.description}</p>
          <textarea
            className='w-1/2 px-4 pt-4 self-center border focus:border-black bg-white/10 my-8 h-fit outline-none resize-none z-50'
            {...register(`questions.${index}.answer`, { required: true })}
          />
        </div>
      );
    case 'SingleChoiceQuestion':
    case 'MultipleChoiceQuestion':
      return (
        <div className='max-w-6xl flex flex-col' key={question._id}>
          <label className='p-8 self-center text-4xl font-semibold mb-2'>{question.text}</label>
          <p className='text-2xl max-w-6xl font-medium'>{question.description}</p>
          <div className='flex flex-row flex-wrap gap-4 justify-center mt-10 z-50'>
            {question.choices.map((option) => (
              <label
                key={option._id}
                htmlFor={option._id}
                className='flex items-center gap-3 m-4 pr-2 pl-2 py-2 cursor-pointer'
              >
                <input
                  type={question.type === 'MultipleChoiceQuestion' ? 'checkbox' : 'radio'}
                  id={option._id}
                  className='hidden peer'
                  value={option.label}
                  {...register(`questions.${index}.answer`, { required: true })}
                />
                <div className='w-6 h-6 border-2 border-gray-500 rounded-full flex items-center justify-center peer-checked:border-black peer-checked:bg-black transition-all'>
                  {question.type === 'MultipleChoiceQuestion' ? (
                    <div className='w-3 h-3 bg-c1 rounded-full'></div>
                  ) : (
                    <div className='w-3 h-3 bg-c1 rounded-full scale-0 peer-checked:scale-100 transition-all'></div>
                  )}
                </div>
                {option.label}
              </label>
            ))}
          </div>
        </div>
      );
    case 'YesNoQuestion':
      return (
        <div className='max-w-6xl flex flex-col' key={question._id}>
          <label className='text-4xl font-semibold mb-2'>{question.text}</label>
          <p className='text-2xl max-w-6xl font-medium'>{question.description}</p>
          <div className='flex flex-row flex-wrap gap-4 justify-center mt-10 z-50'>
            {['Yes', 'No'].map((value) => (
              <label
                key={`${question._id}-${value}`}
                htmlFor={`${question._id}-${value}`}
                className='flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-c2/30 transition-all text-lg font-medium'
              >
                <input
                  type='radio'
                  id={`${question._id}-${value}`}
                  className='hidden peer'
                  value={value}
                  {...register(`questions.${index}.answer`, { required: true })}
                />
                <div className='w-6 h-6 rounded-full flex items-center justify-center peer-checked:border-black peer-checked:bg-black transition-all'>
                  <div className='w-3 h-3 rounded-full scale-0 peer-checked:scale-100 transition-all'></div>
                </div>
                {value}
              </label>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default RenderQuestion;
