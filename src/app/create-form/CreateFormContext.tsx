import { Dispatch, createContext, useContext, useReducer } from "react";

export enum CreateFormActionKind {
  UPDATE_TITLE = "UPDATE_TITLE",
  UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION",
  UPDATE_QUESTIONS = "UPDATE_QUESTIONS",
}

type CreateFormAction =
  | {
      type:
        | CreateFormActionKind.UPDATE_TITLE
        | CreateFormActionKind.UPDATE_DESCRIPTION;
      payload: string;
    }
  | {
      type: CreateFormActionKind.UPDATE_QUESTIONS;
      payload: string[];
    };

interface CreateFormState {
  title: string;
  description: string;
  questions: string[];
}

const initalFormState: CreateFormState = {
  title: "",
  description: "",
  questions: [],
};

const CreateFormContext = createContext<{
  formData: CreateFormState;
  dispatchFormData: Dispatch<CreateFormAction>;
}>({
  formData: initalFormState,
  dispatchFormData: () => {},
});

interface CreateFormProviderProps {
  children: React.ReactElement;
}

function formDataReducer(state: CreateFormState, action: CreateFormAction) {
  const { type, payload } = action;
  switch (type) {
    case CreateFormActionKind.UPDATE_TITLE:
      return {
        ...state,
        title: payload,
      };
    case CreateFormActionKind.UPDATE_DESCRIPTION:
      return {
        ...state,
        description: payload,
      };
    case CreateFormActionKind.UPDATE_QUESTIONS:
      throw Error("Not Yet Implemented");
      return state;

    default:
      return state;
  }
}

export function useCreateFormData() {
  return useContext(CreateFormContext);
}

const CreateFormProvider = ({ children }: CreateFormProviderProps) => {
  const [formData, dispatchFormData] = useReducer(
    formDataReducer,
    initalFormState
  );

  const value = {
    formData,
    dispatchFormData,
  };

  return (
    <CreateFormContext.Provider value={value}>
      {children}
    </CreateFormContext.Provider>
  );
};

export default CreateFormProvider;
