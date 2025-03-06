import { useEffect, useState, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { api } from '../../utils/api.js';
import RenderQuestion from './RenderQuestion.jsx';
import { useParams } from 'react-router-dom';
import MediumButton from '../../components/Buttons/MediumButton.jsx';
import RoundButton from '../../components/Buttons/RoundButton.jsx';

import FormSubmitModal from './FormSubmitModal.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import SmallButton from '../../components/Buttons/SmallButton.jsx';

const ResponseForm = () => {
  const { id: formId } = useParams();
  const [formData, setFormData] = useState();
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const getForm = async (formId) => {
      try {
        const res = await api().get(`/form/${formId}`);
        setFormData(res.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };
    getForm(formId);
  }, [formId]);

  const { control, handleSubmit, register, setValue } = useForm({
    defaultValues: {
      questions: [],
    },
  });

  useEffect(() => {
    if (formData) {
      setValue('questions', formData.questions);
    }
  }, [formData, setValue]);

  const { fields } = useFieldArray({
    control,
    name: 'questions',
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const nextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, fields.length - 1));
  };

  const prevQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = (data) => {
    const submissionData = {
      form: formData._id,
      answers: data.questions.map((question) => ({
        question: question._id,
        type: question.type,
        answer: Array.isArray(question.answer) ? question.answer.join(', ') : question.answer,
      })),
      creationDateTime: new Date(),
      updateDateTime: new Date(),
    };
    api().post(`/formAnswers`, submissionData).then(() => setShowModal(true));
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className='flex flex-col items-center px- justify-center h-screen bg-c1'>
      <h1 className='absolute top-6'>{formData.title}</h1>
      <div className='w-full flex flex-col h-3/5 items-center border-black overflow-hidden'>
        <RoundButton onClick={prevQuestion}>
          <img src="/arrow_down_icon_240890.png" alt="Previous" className="w-9 h-9 rotate-180" />
        </RoundButton>
        <form className='w-full h-full flex flex-col justify-between' onSubmit={handleSubmit(onSubmit)}>
          <div ref={containerRef} className='relative w-full h-full overflow-auto bg-white/20 my-8'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className='absolute w-full'
              >
                {fields.length > 0 && (
                  <RenderQuestion question={fields[currentQuestion]} index={currentQuestion} register={register} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          {currentQuestion === fields.length - 1 && (
            <SmallButton onClick={onSubmit} text={'Submit'} className='self-center mb-8 text-2xl' />
          )}
        </form>
        <RoundButton onClick={nextQuestion}>
          <img src="/arrow_down_icon_240890.png" alt="Next" className="w-9 h-9" />
        </RoundButton>
      </div>
      <div className='absolute h-full justify-between flex flex-col items-center py-8'>
      </div>
      <FormSubmitModal showModal={showModal} />
    </div>
  );
};

export default ResponseForm;
