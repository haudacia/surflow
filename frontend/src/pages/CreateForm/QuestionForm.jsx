import QuestionChoices from './QuestionChoices.jsx';
import { useCustomFormProvider } from '../../context/FormContext.jsx';
import TextareaAutoSize from 'react-textarea-autosize';
import YesNoChoices from './YesNoChoices.jsx';
import SmallButton from '../../components/Buttons/SmallButton.jsx';

const QuestionForm = ({ autoSave }) => {
    const { activeQuestion, watch, setValue, control, register } = useCustomFormProvider();

    const type = watch(`questions.${activeQuestion}.type`);
    const hasChoices = ['MultipleChoiceQuestion', 'SingleChoiceQuestion'].includes(type);

    return (
        <main className='h-full min-w-fit p-32 border-l-black border-l my-auto flex flex-col justify-center'>
            <TextareaAutoSize
                className='w-full max-h-40 text-lg outline-none resize-none p-2 bg-transparent hover:bg-white/30 border border-transparent focus:border-gray-900 transition duration-500'
                placeholder='your question here'
                value={watch(`questions.${activeQuestion}.text`)}
                {...register(`questions.${activeQuestion}.text`)}
            />
            <TextareaAutoSize
                className='placeholder-c2 w-full max-h-40 text-sm outline-none resize-none p-2 bg-transparent hover:bg-white/30 border border-transparent focus:border-gray-900 transition duration-500 mt-4'
                placeholder='Description (optional)'
                value={watch(`questions.${activeQuestion}.description`)}
                {...register(`questions.${activeQuestion}.description`)}
                onBlur={autoSave}
            />
            {type === 'TextQuestion' && (
                <div className='mt-2 ml-2 p-2 pb-0 text-sm w-full text-gray-900 border-b border-gray-900'>
                    Answer goes here
                </div>
            )}
            {hasChoices && <QuestionChoices autoSave={autoSave} />}
            {type === 'YesNoQuestion' && <YesNoChoices />}
        </main>
    );
};

export default QuestionForm;
