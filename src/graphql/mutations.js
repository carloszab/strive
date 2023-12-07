import { gql } from "@apollo/client";

export const INSERT_WORKOUT = gql`
  mutation InsertWorkout($name: String, $detail: jsonb, $duration_seconds: Int!) {
    insert_workout_one(object: { name: $name, detail: $detail, duration_seconds: $duration_seconds }) {
      id
      name
      detail
      timestamp
      duration_seconds
    }
  }
`;

export const UPDATE_WORKOUT = gql`
  mutation updateWorkout(
    $id: uuid!
    $name: String!
    $detail: jsonb!
    $timestamp: timestamptz!
    $duration_seconds: Int!
  ) {
    update_workout_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, detail: $detail, timestamp: $timestamp, duration_seconds: $duration_seconds }
    ) {
      id
      name
      detail
      timestamp
      duration_seconds
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
