import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { RecruiterProfile, RecruiterProfileStatus } from '@/controllers/graphql/generated';

interface UseRecruiterProfileEditable {
  (profile?: RecruiterProfile | null): [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ]
}
export const useRecruiterProfileEditable: UseRecruiterProfileEditable = (
  profile,
) => {
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    if (!profile) {
      return;
    }

    if (profile.status !== RecruiterProfileStatus.Draft) {
      setEditable(false);
    }
  }, [profile]);

  return [editable, setEditable];
};
