"use client";

import { useEffect } from "react";
import CreateForm from "./CreateForm";
import useCreateFormStore from "@/lib/CreateFormStore";

export default function Page() {
  const { setFormData } = useCreateFormStore();
  useEffect(() => {
    setFormData(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <CreateForm />;
}
