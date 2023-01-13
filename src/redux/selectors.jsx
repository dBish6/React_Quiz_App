// store.options.initOptions...
export const selectLoading = (store) => store.options.initOptions.loading;
export const selectCategory = (store) =>
  store.options.initOptions.question_category;
export const selectDifficulty = (store) =>
  store.options.initOptions.question_difficulty;
export const selectType = (store) => store.options.initOptions.question_type;
export const selectAmount = (store) =>
  store.options.initOptions.amount_of_questions;
// store.options...
export const selectQuestions = (store) => store.options.questions;
export const selectIndex = (store) => store.options.index;
export const selectScore = (store) => store.options.score;
export const selectFinalScore = (store) => store.options.final_score;
export const selectAccessKey = (store) => store.options.accessKey;
