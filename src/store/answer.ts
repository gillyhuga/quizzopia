import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AnsweredQuestion {
    category: string;
    question: string;
    correct_answer: string;
    selected_answer: string | null;
}

interface InitialState {
    totalCorrect: number;
    totalWrong: number;
    answeredQuestions: AnsweredQuestion[];
}

const initialState: InitialState = {
    answeredQuestions: [],
    totalCorrect: 0,
    totalWrong: 0,
};

export const answers = createSlice({
    name: "answer",
    initialState,
    reducers: {
        setAnsweredQuestions: (state, action: PayloadAction<AnsweredQuestion[]>) => { 
            state.answeredQuestions = action.payload;
        },
        setTotalCorrect: (state, action: PayloadAction<number>) => {
            state.totalCorrect = action.payload;
        },
        setTotalWrong: (state, action: PayloadAction<number>) => {
            state.totalWrong = action.payload;
        },
        resetState: (state) => {
            return initialState;
          },
    },
});

export const { setAnsweredQuestions, setTotalCorrect, setTotalWrong, resetState } = answers.actions;
export default answers.reducer;
