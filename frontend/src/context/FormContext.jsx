import { createContext, useCallback, useContext } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export const FormContext = createContext(null);

const defaultValues = {
  title: 'My Form',
  questions: [
    {
      text: '...',
      description: '',
      type: 'TextQuestion',
    },
  ],
  active: 0,
};

export const CustomFormProvider = ({ children }) => {
  const { register, control, watch, setValue, getValues, handleSubmit, formState } = useForm({ defaultValues });

  const {
    fields,
    remove: removeQuestion,
    swap: swapQuestion,
    append: addQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  });

  const activeQuestion = watch('active');
  const questions = watch('questions');

  const setActiveQuestion = (index) => {
    setValue('active', index);
  };

  const handleRemoveQuestion = useCallback(
    (index) => {
      if (activeQuestion === index) {
        setActiveQuestion(activeQuestion - 1);
      }
      removeQuestion(index);
    },
    [activeQuestion],
  );

  const value = {
    questions,
    activeQuestion,
    setActiveQuestion,
    register,
    control,
    addQuestion,
    removeQuestion: handleRemoveQuestion,
    swapQuestion,
    setValue,
    getValues,
    watch,
    handleSubmit,
    fields
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useCustomFormProvider = () => useContext(FormContext);

export const withCustomFormProvider = (Component) => (props) => (
  <CustomFormProvider>
    <Component {...props} />
  </CustomFormProvider>
);