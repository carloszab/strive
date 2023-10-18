import { View, Text, Button } from 'react-native'
import React from 'react'
import { gql, useMutation } from '@apollo/client';

const InsertExercise = () => {

    const INSERT_WORKOUT = gql`
  mutation InsertWorkout($name: String, $detail: jsonb) {
  insert_workout_one(object: {name: $name, detail: $detail}) {
    id
    name
    detail
  }
}
`;

    const [insertWorkout, { data, loading, error }] = useMutation(INSERT_WORKOUT);

      

  let input;

  if (loading) return <Text>{'Submitting...'}</Text>;
  if (error) return <Text>{`Submission error! ${error.message}`}</Text>;

  return (
    <View>
        
        <Button title="add exercise" onPress={() => {
          insertWorkout({ variables: { name: "test", detail: ""} });
        }}></Button>
      {/* </form> */}
    </View>
  );
}

export default InsertExercise