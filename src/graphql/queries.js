const GET_WORKOUTS = gql`
  query GetWorkouts {
    workout {
      id
      name
      detail
    }
  }
`;

const GET_WORKOUT_BY_PK = gql`
  query GetWorkoutByPk($id: uuid!) {
    workout_by_pk(id: $id) {
      id
      name
      detail
    }
  }
`;

const INSERT_WORKOUT = gql`
  mutation InsertWorkout($detail: jsonb!, $name: String!) {
    insert_workout(objects: { detail: $detail, name: $name }) {
      affected_rows
      returning {
        detail
        name
        id
      }
    }
  }
`;

const DELETE_WORKOUT = gql`
  mutation DeleteWorkout($id: uuid!) {
    delete_workout(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
