import { useForm, DefaultValues, UseFormReturn } from "react-hook-form";

function useGenerateForm <F>(defaultValues: DefaultValues<F>, values: F | undefined) {
  const form = useForm<F>({
    defaultValues,
    values
  });

  const inputCommonProps = {
    register: form.register,
    errors: form.formState.errors,
  };

  const controlledCommonProps = {
    ...inputCommonProps,
    control: form.control
  };

  return {
    ...form,
    inputCommonProps,
    controlledCommonProps,
  }
};

export default useGenerateForm;
