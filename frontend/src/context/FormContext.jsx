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
  const { register, control, watch, setValue, getValues, handleSubmit } = useForm({ defaultValues });

  const {
    fields,
    remove: removeQuestion,
    swap: swapQuestion,
    append: addQuestion,
  } = useFieldArray({
    control,
    name: 'questions',
  });
<<<<<<< Updated upstream
=======
  // const watchFieldArray = watch('questions');
  // const questions = fields.map((field, index) => {
  //   return {
  //     ...field,
  //     ...watchFieldArray[index],
  //   };
  // });
>>>>>>> Stashed changes

  const activeQuestion = watch('active');

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
    activeQuestion,
    setActiveQuestion,
    register,
    control,
<<<<<<< Updated upstream
=======
    // questions,
>>>>>>> Stashed changes
    addQuestion,
    removeQuestion: handleRemoveQuestion,
    swapQuestion,
    setValue,
    getValues,
    watch,
    handleSubmit,
    fields
    // watchFieldArray
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useCustomFormProvider = () => useContext(FormContext);

export const withCustomFormProvider = (Component) => (props) => (
  <CustomFormProvider>
    <Component {...props} />
  </CustomFormProvider>
);

// const { data: formData } = useQuery(
//     ['form', id],
//     () => api().get(`/form/${id}`).then(res => res.data),
//     { enabled: isEditMode }
// );
