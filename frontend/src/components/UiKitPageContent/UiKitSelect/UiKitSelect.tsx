import React from 'react';
import { SelectUi } from '@/components/FormElements/Select';
import typography from '@/ui/typography/typography.module.scss';

export const UiKitSelect = () => (
  <>
    <div className="cell large-full mb-24">
      <h2 className={typography.accentTitle}>Select</h2>
    </div>
    <div className="cell large-3 mb-32">
      <SelectUi
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
        placeholder="Single"
      />
    </div>
    <div className="cell large-3 mb-32">
      <SelectUi
        options={[
          {
            label: 'TECH',
            options: [
              { label: 'Frontend', value: 'frontend' },
              { label: 'Java', value: 'java' },
              { label: 'C# / .NET', value: 'c#' },
            ],
          },
          {
            label: 'NON-TECH',
            options: [
              { label: 'HR', value: 'hr' },
              { label: 'QA', value: 'qa' },
            ],
          },
        ]}
        isMulti
        placeholder="Multiple"
      />
    </div>
    <div className="cell large-3 mb-32">
      <SelectUi
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
        isSearchable={false}
        placeholder="Unsearchable"
      />
    </div>
  </>
);
