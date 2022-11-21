import React from 'react';
import ReactSelect, { Props } from 'react-select';
import cn from 'classnames';
import SelectModule from '@/components/FormElements/Select/Select.module.scss';
import { IconPlus } from '@/ui/icons/general/IconPlus';
import { IconMinus } from '@/ui/icons/general/IconMinus';
import { withHookFormController } from '@/controllers/form/form.hocs/withHookFormController';

export const SelectUi = (props: Props) => (
  <ReactSelect
    components={{
      DropdownIndicator: () => (
        <>
          <IconPlus />
          <IconMinus />
        </>
      ),
    }}
    menuPlacement="auto"
    {...props}
    className={cn(SelectModule.select, props.className)}
    classNamePrefix="select"
    instanceId={props.id}
    inputId={props.id}
    id={undefined}
    closeMenuOnSelect={!props.isMulti}
    blurInputOnSelect={!props.isMulti}
  />
);

export const Select = withHookFormController({})(
  SelectUi,
);
