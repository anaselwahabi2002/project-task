import { useState } from "react";

export const useTaskCreateForm = (onCreate) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const reset = () =>
    setForm({ title: "", description: "", dueDate: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await onCreate(form);
    if (ok) reset();
  };

  return { form, handleChange, handleSubmit };
};
