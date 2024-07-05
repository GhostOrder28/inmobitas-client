import { useForm, DefaultValues, UseFormReturn } from "react-hook-form";

function useGenerateForm <F>(defaultValues: DefaultValues<F>, values: F) {
  const form = useForm<F>({
    defaultValues,
    values
  });

  return {
    ...form,
    inputCommonProps: {
      register: form.register,
      errors: form.formState.errors
    }
  }
};

export default useGenerateForm;
