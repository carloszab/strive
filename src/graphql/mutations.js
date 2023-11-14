import { gql } from "@apollo/client";

export const INSERT_WORKOUT = gql`
  mutation InsertWorkout($name: String, $detail: jsonb) {
    insert_workout_one(object: { name: $name, detail: $detail }) {
      id
      name
      detail
    }
  }
`;

export const UPDATE_WORKOUT = gql`
  mutation updateWorkout(
    $id: uuid!
    $name: String!
    $detail: jsonb!
    $timestamp: timestamptz!
  ) {
    update_workout_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, detail: $detail, timestamp: $timestamp }
    ) {
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
