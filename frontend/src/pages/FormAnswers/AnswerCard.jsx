import React from 'react';
import { questionTypes } from '../../constants/questionTypes.jsx';

const AnswerCard = ({ answer }) => {
    const questionType = questionTypes.find(
        (questionType) => questionType.value === answer.type
    );

    return (
        <div className={'h-fit text-sm'}>
            <p>{answer.answer}</p>
        </div>
    );
};

export default AnswerCard;
