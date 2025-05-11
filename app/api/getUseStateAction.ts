import { Endpoint, getFormAction, Operation } from "./getFormAction";

export const getUseStateAction = (endpoint: Endpoint, operation: Operation) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const useStateAction = async (prevState: any, formData: FormData) => {
    console.log({ prevState });
    const formAction = getFormAction(endpoint, operation);
    const formReturn = await formAction(formData);
    console.log({ formReturn });
    return formReturn;
  };
  return useStateAction;
};
