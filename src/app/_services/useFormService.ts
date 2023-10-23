import { FormState } from "@/lib/CreateFormStore";
import { useFetch } from "../_helpers/client";
import { create } from "zustand";

const initialState: {
  forms: ({ id: string } & FormState)[];
} = {
  forms: [],
};

const formStore = create(() => initialState);

export default function useFormService() {
  const fetch = useFetch();
  const { forms } = formStore();

  return {
    forms,
    getAll: async () => {
      try {
        const forms = await fetch.get("/api/form");
        formStore.setState({ forms });
      } catch (error: any) {
        console.error(error);
      }
    },
    getAllByUser: async () => {
      try {
        const forms = await fetch.get("/api/form/user");
        formStore.setState({ forms });
      } catch (error: any) {
        console.error(error);
      }
    },
    getById: async (id: string) => {
      try {
        const form = await fetch.get(`/api/form/${id}`);
        formStore.setState({ forms: [form] });
      } catch (error: any) {
        console.error(error);
      }
    },
    create: async (form: FormState, userId: string) => {
      try {
        const res = await fetch.post("/api/form", {
          method: "POST",
          body: JSON.stringify({
            ...form,
            userId,
          }),
        });
        console.log(res);
      } catch (error: any) {
        // FIXME: Error handling
        console.error(error);
      }
    },
  };
}
