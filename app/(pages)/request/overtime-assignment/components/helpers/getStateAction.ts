export const getStateAction = <State>(
  formAction: (formData: FormData) => Promise<State>
) => {
  const stateAction = async (prevState: State, formData: FormData) => {
    const state = await formAction(formData);
    return state;
  };
  return stateAction;
};
