import { useEffect, useState } from 'react';
import { api } from '../../utils/api.js';
import { useBlocker, useNavigate, useParams } from 'react-router-dom';
import { QuestionList } from './QuestionList.jsx';
import QuestionForm from './QuestionForm.jsx';
import QuestionOptions from './QuestionOptions.jsx';
import { useCustomFormProvider, withCustomFormProvider } from '../../context/FormContext.jsx';
import { useForms } from '../../hooks/useForms.js';
import { useQueryClient } from 'react-query';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import { useFormState } from 'react-hook-form';
import ConfirmationModal from '../../components/Modal/ConfirmationModal.jsx';
import SmallButton from '../../components/Buttons/SmallButton.jsx';
import Input from '../../components/Form/Input.jsx';
import FormAnswers from '../FormAnswers/FormAnswers.jsx';

export const CreateForm = withCustomFormProvider(() => {
  const { id } = useParams();
  const { forms, isLoading } = useForms();
  const queryClient = useQueryClient();
  const { handleSubmit, setValue, getValues, activeQuestion, watch, control, reset, fillEmptyChoiceLabels, activeIndex, register } = useCustomFormProvider();
  const { dirtyFields, isDirty } = useFormState({ control, });

  const choices = watch(`questions.${activeQuestion}.choices`);
  const [initialChoices, setInitialChoices] = useState([]);

  const type = watch(`questions.${activeQuestion}.type`);
  const [initialType, setInitialType] = useState('');

  const currentForm = forms?.find((form) => form._id === id);
  const isEditMode = !!id && currentForm;

  useEffect(() => {
    if (currentForm) {
      setInitialType(currentForm.questions[activeQuestion].type);
      setInitialChoices(currentForm.questions[activeQuestion].choices || []);

      setValue('title', currentForm.title || '');
      setValue(
        'questions',
        currentForm.questions.map((question) => ({
          ...question,
          choices: question.choices || [],
        })) || [],
      );
    }
  }, [isEditMode, currentForm, setValue]);

  const onSubmit = async (data) => {
    if (!data.title) {
      setValue('title', 'my form');
      data.title = 'my form'
    }
    data = fillEmptyChoiceLabels();
    const res = await api().patch(`/form/${id}`, data);
    reset(data);
    setInitialChoices(res.data.questions[activeQuestion].choices);
    queryClient.invalidateQueries('forms');
  };

  let blocker = useBlocker(({ currentLocation, nextLocation }) => {
    const choicesChanged = JSON.stringify(choices) !== JSON.stringify(initialChoices);
    const typeChanged = JSON.stringify(type) !== JSON.stringify(initialType);

    return (Object.keys(dirtyFields).length > 0 || choicesChanged || typeChanged) &&
      currentLocation.pathname !== nextLocation.pathname;
  });

  return (
    <div className='grid grid-rows-[15%_85%] grid-cols-1 h-dvh w-screen bg- bg-cover'>
      <UserNavbar isCreateMode={true}>
        <Input
          type='text'
          placeholder='Form name'
          className='text-2xl px-6 placeholder-c2'
          {...register('title')}
          onBlur={handleSubmit(onSubmit)}
        />
        <SmallButton
          text='SAVE'
          className='mr-8 bg-gray-800 text-white hover:text-black shadow-vaporwave'
        />
      </UserNavbar>
      {!isLoading && (
        <form className='row-span-2 grid grid-cols-2 px-0 md:pb- ' onSubmit={handleSubmit(onSubmit)}>
          <div className='row-span-2 col-span-1 overflow-y-scroll '>
            <QuestionList autoSave={handleSubmit(onSubmit)} />
          </div>
          <div className='row-span-2'>
            <QuestionForm autoSave={handleSubmit(onSubmit)} />
          </div>

          <ConfirmationModal
            open={blocker.state === 'blocked'}
            onClose={() => blocker.reset()}
            textOnClose='Cancel'
            textOnConfirm='Yes'
            description='Changes will be lost, do you wish to continue?'
            onConfirm={() => blocker.proceed()}
          />
        </form>
      )}
    </div>
  );
});
