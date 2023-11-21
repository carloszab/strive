const initialState = {
  customWorkoutName: "Custom Workout",
  exercises: [],
  customWorkoutStarted: false,
  customWorkoutTime: null,
};

const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CUSTOM_WORKOUT_NAME":
      return {
        ...state,
        customWorkoutName: action.payload,
      };
    case "SET_EXERCISES":
      return {
        ...state,
        exercises: action.payload,
      };
    case "START_CUSTOM_WORKOUT":
      return {
        ...state,
        customWorkoutStarted: true,
        customWorkoutTime: new Date(),
      };
    case "RESET_CUSTOM_WORKOUT":
      return {
        customWorkoutName: "Custom Workout",
        exercises: [],
        customWorkoutStarted: false,
        customWorkoutTime: null,
      };
    default:
      return state;
  }
};

export default workoutReducer;
