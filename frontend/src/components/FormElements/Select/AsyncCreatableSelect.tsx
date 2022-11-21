import React from 'react';
import ReactSelect, { Props } from 'react-select/async-creatable';
import SelectModule from '@/components/FormElements/Select/Select.module.scss';
import { IconPlus } from '@/ui/icons/general/IconPlus';
import { IconMinus } from '@/ui/icons/general/IconMinus';
import { withHookFormController } from '@/controllers/form/form.hocs/withHookFormController';

export const AsyncCreatableSelectUi = <O, >(props: Props<O>) => (
  <ReactSelect
    components={{
      DropdownIndicator: () => (
        <>
          <IconPlus />
          <IconMinus />
        </>
      ),
    }}
    {...props}
    ref={props.selectRef}
    className={SelectModule.select}
    classNamePrefix="select"
    instanceId={props.id}
    inputId={props.id}
    id={undefined}
    closeMenuOnSelect={!props.isMulti}
  />
);

export const AsyncCreatableSelect = withHookFormController({})(
  AsyncCreatableSelectUi,
);
