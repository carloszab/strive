const initialState = {
  customWorkoutName: "Custom Workout",
  exercises: [],
};

const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CUSTOM_WORKOUT_NAME":
      return {
        customWorkoutName: action.payload,
        exercises: state.exercises,
      };
    case "SET_EXERCISES":
      return {
        customWorkoutName: state.customWorkoutName,
        exercises: action.payload,
      };
    default:
      return state;
  }
};

export default workoutReducer;
