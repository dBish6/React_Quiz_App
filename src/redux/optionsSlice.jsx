import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Doesn't need to be inclosed like this.
  // TODO: Selectors is getting state.
  initOptions: {
    loading: false,
    question_category: "",
    question_difficulty: "",
    question_type: "",
    amount_of_questions: 10,
  },
  questions: [],
  index: 0,
  score: 0,
  accessKey: false,
};
const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    CHANGE_LOADING: (state, action) => {
      state.initOptions.loading = action.payload; // Payload is whatever coming in.
    },
    CHANGE_CATEGORY: (state, action) => {
      state.initOptions.question_category = action.payload;
    },
    CHANGE_DIFFICULTY: (state, action) => {
      state.initOptions.question_difficulty = action.payload;
    },
    CHANGE_TYPE: (state, action) => {
      state.initOptions.question_type = action.payload;
    },
    CHANGE_AMOUNT: (state, action) => {
      state.initOptions.amount_of_questions = action.payload;
    },
    SET_QUESTIONS: (state, action) => {
      state.questions = action.payload;
    },
    SET_INDEX: (state, action) => {
      state.index = action.payload;
    },
    SET_SCORE: (state, action) => {
      state.score = action.payload;
    },
    SET_ACCESS: (state, action) => {
      state.accessKey = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function.
export const {
  CHANGE_LOADING,
  CHANGE_CATEGORY,
  CHANGE_DIFFICULTY,
  CHANGE_TYPE,
  CHANGE_AMOUNT,
  SET_QUESTIONS,
  SET_INDEX,
  SET_SCORE,
  SET_ACCESS,
} = optionsSlice.actions;
// Exports the slice's reducer.
export default optionsSlice.reducer;
