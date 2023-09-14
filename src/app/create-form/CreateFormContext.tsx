import { Dispatch, createContext, useContext, useReducer } from "react";
import { AnswerType, Question } from "../global";
import { uuidv4 } from "../components/sortable-list/utils";

export enum CreateFormActionKind {
  UPDATE_TITLE = "UPDATE_TITLE",
  UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION",
  ADD_QUESTION = "ADD_QUESTION",
  DELETE_QUESTION = "DELETE_QUESTION",
  UPDATE_QUESTION_TITLE = "UPDATE_QUESTION_TITLE",
  UPDATE_QUESTION_ANSWER_TYPE = "UPDATE_QUESTION_ANSWER_TYPE",
}

type CreateFormAction =
  | {
      type:
        | CreateFormActionKind.UPDATE_TITLE
        | CreateFormActionKind.UPDATE_DESCRIPTION;
      payload: string;
    }
  | {
      type: CreateFormActionKind.ADD_QUESTION;
      payload: Question;
    }
  | {
      type: CreateFormActionKind.UPDATE_QUESTION_TITLE;
      payload: {
        title: string;
        id: string;
      };
    }
  | {
      type: CreateFormActionKind.UPDATE_QUESTION_ANSWER_TYPE;
      payload: {
        id: string;
        answerType: AnswerType;
      };
    }
  | {
      type: CreateFormActionKind.DELETE_QUESTION;
      payload: {
        id: string;
      };
    };

interface CreateFormState {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

const initialFormState: CreateFormState = {
  id: uuidv4(),
  title: "",
  description: "",
  questions: [
    {
      answerType: "short-answer",
      title: "Question 0",
      id: uuidv4(),
    },
    {
      answerType: "long-answer",
      title: "Question 1",
      id: uuidv4(),
    },
    {
      answerType: "radio-answer",
      title: "Question 2",
      id: uuidv4(),
    },
    {
      answerType: "checkbox-answer",
      title: "Question 3",
      id: uuidv4(),
    },
  ],
};

const CreateFormContext = createContext<{
  formData: CreateFormState;
  dispatchFormData: Dispatch<CreateFormAction>;
}>({
  formData: initialFormState,
  dispatchFormData: () => {},
});

interface CreateFormProviderProps {
  children: React.ReactElement;
}

function formDataReducer(
  state: CreateFormState,
  action: CreateFormAction
): CreateFormState {
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
    case CreateFormActionKind.ADD_QUESTION:
      return { ...state, questions: [...state.questions, payload] };

    case CreateFormActionKind.UPDATE_QUESTION_TITLE:
      return {
        ...state,
        questions: state.questions.map((question) => {
          if (question.id === payload.id) {
            question.title = payload.title;
          }
          return question;
        }),
      };
    case CreateFormActionKind.UPDATE_QUESTION_ANSWER_TYPE:
      return {
        ...state,
        questions: state.questions.map((question) => {
          if (question.id === payload.id) {
            question.answerType = payload.answerType;
          }
          return question;
        }),
      };
    case CreateFormActionKind.DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(
          (question) => question.id !== payload.id
        ),
      };

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
    initialFormState
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
