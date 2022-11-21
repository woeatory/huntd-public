import React, { createContext, FC, useContext } from 'react';
import { UseFormMethods } from 'react-hook-form';
import { FormDataValues } from '@/components/Profile/ProfilesListModule/Filters/Filters';

interface Props {
  data: FiltersState
}

interface FiltersState {
  formMethods: UseFormMethods<FormDataValues> | null,
  setFormMethods: (value: UseFormMethods<FormDataValues>) => void
}

const initialState: FiltersState = {
  formMethods: null,
  setFormMethods: (formMethods) => {
    initialState.formMethods = formMethods;
  },
};

const FiltersContext = createContext<FiltersState>(initialState);

export const FiltersProvider: FC<Props> = (props) => {
  const { data, children } = props;

  return (
    <FiltersContext.Provider value={data}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => useContext(FiltersContext);
