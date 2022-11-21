import { useEffect, useMemo } from 'react';
import { Control, useWatch } from 'react-hook-form';
import deepEqual from 'deep-equal';
import { debounce } from '@/lib/debounce';
import { usePreviousValue } from '@/controllers/form/form.hooks/usePreviousValue';

interface FormAutoSubmitValues {
  onSubmit: () => void;
  control: Control;
}

const submitForm = debounce((handleSubmit) => handleSubmit(), 500);

export const FormAutoSubmit = (props: FormAutoSubmitValues) => {
  const { control, onSubmit } = props;

  const formData = useWatch({
    control,
  });

  const previousFormData = usePreviousValue(formData);

  const shouldSubmit = useMemo(
    () => !deepEqual(formData, previousFormData),
    [formData, previousFormData],
  );

  useEffect(() => {
    if (!shouldSubmit) {
      return;
    }

    submitForm(onSubmit);
  }, [onSubmit, shouldSubmit]);

  return null;
};
