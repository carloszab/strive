import { useMutation } from "@apollo/client";

// A generic function to perform mutations
export const performMutation = (mutation, variables, onSuccess, onError) => {
  const [mutate] = useMutation(mutation);

  const executeMutation = async () => {
    try {
      const { data } = await mutate({ variables });
      onSuccess(data);
    } catch (error) {
      onError(error);
    }
  };

  return executeMutation;
};
