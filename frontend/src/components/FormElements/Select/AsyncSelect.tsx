import React from 'react';
import ReactSelect, { Props } from 'react-select/async';
import SelectModule from '@/components/FormElements/Select/Select.module.scss';
import { withHookFormController } from '@/controllers/form/form.hocs/withHookFormController';
import { SelectOption } from './Select.typedefs';

export const AsyncSelectUi = (
  props: Props<SelectOption>,
) => (
  <ReactSelect
    ref={props.selectRef}
    {...props}
    className={SelectModule.select}
    classNamePrefix="select"
    instanceId={props.id}
    inputId={props.id}
    id={undefined}
    components={{
      DropdownIndicator: () => null,
    }}
    closeMenuOnSelect={!props.isMulti}
  />
);

export const AsyncSelect = withHookFormController({})<Props<SelectOption>>(
  AsyncSelectUi,
);
