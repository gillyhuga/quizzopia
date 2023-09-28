import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

interface InitialState {
    questions: Question[];
    currentQuestion: number;
}

const initialState: InitialState = {
    questions: [],
    currentQuestion: 0,
};

export const questions = createSlice({
    name: "question",
    initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
        },
        setCurrentQuestion: (state, action: PayloadAction<number>) => {
            state.currentQuestion = action.payload;
        },
        resetQuestion: (state) => {
            return initialState;
          },
    },
});

export const { setQuestions, setCurrentQuestion, resetQuestion } = questions.actions;
export default questions.reducer;
