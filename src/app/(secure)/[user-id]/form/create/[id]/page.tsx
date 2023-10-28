"use client";

import { useFormService } from "@/app/_services";
import CreateForm from "../CreateForm";
import useCreateFormStore from "@/lib/CreateFormStore";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { forms } = useFormService();
  const { setFormData } = useCreateFormStore();

  useEffect(() => {
    const currentForm = forms.find(({ id }) => params.id === id);
    if (currentForm) setFormData(currentForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forms, params.id]);

  return <CreateForm />;
}
