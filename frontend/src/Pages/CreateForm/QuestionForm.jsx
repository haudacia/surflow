// import React, { useEffect, useRef, useContext } from 'react';
// import styles from './FormForm.module.css';
// import { useOutletContext, useParams } from 'react-router-dom';
// import Footer from './Footer';
// import QuestionChoices from './QuestionChoices';
// import { api } from '../../utils/api';
// import { FormContext, useFormProvider } from '../../context/FormContext';

// const questionTypes = [
//     { value: 'TextQuestion', label: 'Text' },
//     { value: 'MultipleChoiceQuestion', label: 'Multiple Choice' },
//     { value: 'SingleChoiceQuestion', label: 'Single Choice' },
//     { value: 'YesNoQuestion', label: 'Yes/No' }
// ];

// const QuestionForm = ({ onSubmit }) => {
//     const {
//         selectedQuestion,
//         setSelectedQuestion,
//         allForms,
//         setAllForms,
//         fields,
//         register,
//         watch,
//         control,
//         handleSubmit
//     } = useFormProvider();

//     const index = selectedQuestion && fields.indexOf(selectedQuestion)
//     const type = selectedQuestion && selectedQuestion.type;
//     console.log(type, index, 'tipo e index');
//     console.log('all forms: ', allForms)

//     // if (!selectedQuestion) return <div>Loading...</div>;

//     return (
//         <div>
//             <form
//                 onSubmit={handleSubmit(onSubmit)}
//                 onBlur={handleSubmit(onSubmit)}
//                 className={styles.form}
//             >
//                 <div>
//                     <select {...register(`allForms[${index}].type`)}>
//                         {questionTypes.map((questionType, index) => (
//                             <option value={questionType.value} key={questionType.id}>
//                                 {questionType.label}
//                             </option>
//                         ))}
//                     </select>
//                     <input
//                         id={styles.inputQuestionText}
//                         type="text"
//                         placeholder='write your question here'
//                         {...register(`questions[${index}].text`)}
//                     />
//                     <p>{selectedQuestion.text}</p>
//                     <h1>{selectedQuestion.type}</h1>
//                     {/* <pre>{JSON.stringify(allForms, null, 2)}</pre> */}


//                     <input
//                         id={styles.inputQuestionDescription}
//                         type="text"
//                         placeholder='optional description'
//                         {...register(`questions[${index}].description`)}
//                     />
//                     {type !== 'TextQuestion' && (
//                         <QuestionChoices
//                             register={register}
//                             control={control}
//                             index={index}
//                             isYesNo={type === 'YesNoQuestion'}
//                         />
//                     )}

//                 </div>
//             </form>
//         </div>
//     );
// };

// export default QuestionForm;
import React, { useEffect, useRef, useContext } from 'react';
import styles from './FormForm.module.css';
import { useOutletContext, useParams } from 'react-router-dom';
import Footer from './Footer';
import QuestionChoices from './QuestionChoices';
import { api } from '../../utils/api';
import { FormContext, useFormProvider } from '../../context/FormContext';

const questionTypes = [
    { value: 'TextQuestion', label: 'Text' },
    { value: 'MultipleChoiceQuestion', label: 'Multiple Choice' },
    { value: 'SingleChoiceQuestion', label: 'Single Choice' },
    { value: 'YesNoQuestion', label: 'Yes/No' }
];

const QuestionForm = ({ fields, register, watch, control, handleSubmit, onSubmit }) => {
    const { selectedQuestion, onEditForm } = useFormProvider();

    // const { selectedQuestion._id } = useParams();
    // const selectedQuestion = fields.find(question => question._id === selectedQuestion._id);
    // const index = fields.indexOf(selectedQuestion)
    const index = selectedQuestion && fields.indexOf(selectedQuestion)

    const type = watch(`questions[${index}].type`);

    console.log(onEditForm, 'on edit now on QuestionForm...')
    console.log('selectedQuestion:', selectedQuestion);

    useEffect(() => {
        console.log('selectedQuestion:', selectedQuestion);
        console.log('index:', index);
        // console.log('type:', type);
        // console.log(selectedQuestion._id);
    }, [selectedQuestion, type]);

    if (!selectedQuestion) return <div>no question selected</div>;

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                // onBlur={handleSubmit(onSubmit)}
                className={styles.form}
            >
                <div>
                    <select {...register(`questions[${index}].type`)}>
                        {questionTypes.map((questionType, index) => (
                            <option value={questionType.value} key={questionType.id}>
                                {questionType.label}
                            </option>
                        ))}
                    </select>
                    <input
                        id={styles.inputQuestionText}
                        type="text"
                        placeholder='write your question here'
                        {...register(`questions[${index}].text`)}
                    />
                    <p>{selectedQuestion.text}</p>
                    <h1>{selectedQuestion.type}</h1>
                    {/* <pre>{JSON.stringify(allForms, null, 2)}</pre> */}

                    <input
                        id={styles.inputQuestionDescription}
                        type="text"
                        placeholder='optional description'
                        {...register(`questions[${index}].description`)}
                    />
                    {type !== 'TextQuestion' && (
                        <QuestionChoices
                            register={register}
                            control={control}
                            index={index}
                            isYesNo={type === 'YesNoQuestion'}
                        />
                    )}

                </div>
            </form>
        </div>
    );
};

export default QuestionForm;