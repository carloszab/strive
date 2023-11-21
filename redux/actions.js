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

export const startCustomWorkout = () => {
  return {
    type: "START_CUSTOM_WORKOUT",
  };
};

export const resetCustomWorkout = () => {
  return {
    type: "RESET_CUSTOM_WORKOUT",
  };
};
