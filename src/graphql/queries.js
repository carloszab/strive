import { gql } from "@apollo/client";

export const GET_WORKOUTS = gql`
  query GetWorkouts {
    workout {
      id
      name
      detail
    }
  }
`;

export const GET_WORKOUT_BY_PK = gql`
  query GetWorkoutByPk($id: uuid!) {
    workout_by_pk(id: $id) {
      id
      name
      detail
    }
  }
`;

export const DELETE_WORKOUT = gql`
  mutation DeleteWorkout($id: uuid!) {
    delete_workout(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
