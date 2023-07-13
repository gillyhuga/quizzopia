import React from 'react';

interface QuestionCardProps {
  category: string;
  question: string;
  answers: string[];
  onSelectAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, answers, category, onSelectAnswer }) => {
  return (
    <div className="p-4 bg-white rounded shadow w-full md:w-3/5">
      <h2 className="text-lg font-semibold mb-4">{category}</h2>
      <h2 className="text-xl font-semibold mb-4">{question}</h2>
      <ul className="space-y-2">
        {answers.map((answer, index) => (
          <li key={index}>
            <button
              className="px-4 py-2 rounded bg-gray-200 hover:bg-primary focus:outline-none w-full text-left"
              onClick={() => onSelectAnswer(answer)}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
