import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../utils/api';
import UserNavbar from '../../components/UserNavbar/UserNavbar.jsx';
import { questionTypes } from '../../constants/questionTypes.jsx';
import AnswerCard from './AnswerCard.jsx';
import { useParams } from 'react-router-dom';
import { useForms } from '../../hooks/useForms.js';
import { formatDate } from '../../utils/utils.js';

const FormAnswers = ({ ...rest }) => {
  const { forms, isLoading } = useForms();
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const formId = searchParams.getAll('form');
  const currentForm = forms?.find((form) => form._id === formId[0]);
  const navigate = useNavigate();


  useEffect(() => {
    const formId = searchParams.getAll('form');
    if (!formId) {
      setError('No form ID provided');
      return;
    }

    const fetchAnswers = async () => {
      try {
        const res = await api().get('/formAnswers', { params: { form: formId } });
        setAnswers(res.data);
      } catch (error) {
        setError('Failed to fetch answers');
      }
    };

    fetchAnswers();
  }, [location]);

  const questionType = (question) => questionTypes.find(
    (questionType) => questionType.value === question?.type
  );

  return (
    <div className="grid grid-rows-[12%_88%] grid-cols-1 h-dvh w-screen bg-custom-gradient">
      <UserNavbar>
        <h2 className='px-4'>
          /
        </h2>
        <button className='text-lg' onClick={() => navigate(`/createform/${formId}`)}>
          {currentForm.title}
        </button>
        <h2 className='px-4'>
          /
        </h2>
        <h2 className='text-lg' >
          {'Results'}
        </h2>
      </UserNavbar>
      <div className="overflow-auto px-28">
        <table className="w-full border-spacing-0 border-black border-[1px] border-t-0">
          <thead>
            <tr className="text-left">
              <th className="border-b border-black bg-gray-200 px-4 py-2">DATE</th>
              {currentForm?.questions.map((question, index) => (
                <th key={index} className="border-b border-l border-black bg-gray-200 py-4">
                  <div className="flex items-center gap-4 pl-4">
                    {questionType(question)?.icon}
                    {question.text}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {answers.length > 0 ? (
              answers.map((answerSet, index) => (
                <tr key={index}>
                  {currentForm?.questions.map((question, qIndex) => (
                    <>
                      {qIndex === 0 &&
                        <td className="text-left pl-4 px-2 border-b border-black">{formatDate(answerSet.creationDateTime)}</td>
                      }
                      <td key={qIndex} className="border-b border-l pl-4 border-black">
                        <AnswerCard answer={answerSet.answers[qIndex]} />
                      </td>
                    </>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={currentForm?.questions.length + 1} className="border-black py-2 text-center">No answers to display</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default FormAnswers;