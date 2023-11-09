import { gql } from "@apollo/client";

export const GET_WORKOUTS = gql`
  query GetWorkouts {
    workout {
      id
      name
      detail
      timestamp
    }
  }
`;

export const GET_LAST_WORKOUTS = gql`
  query GetWorkouts {
    workout(limit: 5, order_by: {timestamp: desc}) {
      id
      name
      detail
      timestamp
    }
  }
`;

export const GET_WORKOUT_BY_PK = gql`
  query GetWorkoutByPk($id: uuid!) {
    workout_by_pk(id: $id) {
      id
      name
      detail
      timestamp
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
