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
}

const initialState: InitialState = {
    questions: [],
};

export const questions = createSlice({
    name: "question",
    initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
        },
    },
});

export const { setQuestions } = questions.actions;
export default questions.reducer;
