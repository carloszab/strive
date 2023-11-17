export const setCustomWorkoutName = (name) => {
  return {
    type: "SET_CUSTOM_WORKOUT_NAME",
    payload: name,
  };
};

export const setExercises = (exercises) => {
  return {
    type: "SET_EXERCISES",
    payload: exercises,
  };
};
