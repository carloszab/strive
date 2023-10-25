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