import React from 'react';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import typography from '@/ui/typography/typography.module.scss';
import { InputCheckboxUi } from '@/components/FormElements/FormInputs/InputCheckbox';
import { Button } from '@/ui/buttons/Button';
import { CheckboxGroup } from '@/components/FormElements/FormField/CheckboxGroup';

interface MultipleCheckboxFormData {
  englishLevel: string[];
}

interface SingleCheckboxFormData {
  agreement: boolean;
}

const options = [
  { label: 'Elementary', value: 'elementary' },
  { label: 'Pre intermediate', value: 'pre-intermediate' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Upper intermediate', value: 'upper-intermediate' },
  { label: 'Advanced', value: 'advanced' },
];

export const UiKitCheckbox = () => {
  const singleCheckboxForm = useForm<SingleCheckboxFormData>();
  const multipleCheckboxForm = useForm<MultipleCheckboxFormData>();

  return (
    <>
      <div className="cell large-full mb-24">
        <h2 className={typography.accentTitle}>Checkbox</h2>
      </div>
      <div className="cell large-6">
        <form
          onSubmit={singleCheckboxForm.handleSubmit((data) => {
            // eslint-disable-next-line no-alert
            alert(JSON.stringify(data, null, 2));
          })}
        >
          <CheckboxGroup
            className="mb-24"
            error={singleCheckboxForm.errors.agreement}
          >
            <InputCheckboxUi
              label="I don't mind to sell my soul"
              name="agreement"
              ref={singleCheckboxForm.register({
                required: true,
              })}
            />
          </CheckboxGroup>

          <Button
            mode={Button.mode.Primary}
            size={Button.size.Small}
            type="submit"
            text='Submit'
          />
        </form>

      </div>
      <div className="cell large-6">
        <form
          onSubmit={multipleCheckboxForm.handleSubmit((data) => {
            // eslint-disable-next-line no-alert
            alert(JSON.stringify(data, null, 2));
          })}
        >
          {/*
            TODO: typescript says there is an array of erros because englishLevel is array of strings :/
            So we should pass custom error-like object
          */}
          <CheckboxGroup
            className="mb-24"
            error={multipleCheckboxForm.errors.englishLevel
              ? { message: 'Check at least one option', type: 'required' }
              : undefined}
          >
            {options.map(({ label, value }, i) => (
              <div key={value}>
                <InputCheckboxUi
                  className={cn({
                    'mb-8': i < options.length - 1,
                  })}
                  label={label}
                  name="englishLevel"
                  value={value}
                  ref={multipleCheckboxForm.register({
                    required: true,
                  })}
                />
              </div>
            ))}
          </CheckboxGroup>

          <Button
            mode={Button.mode.Primary}
            size={Button.size.Small}
            type="submit"
            text='Submit'
          />
        </form>
      </div>
    </>
  );
};
