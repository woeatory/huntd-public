import { useMemo } from "react";
import { RecruiterProfile } from "@/controllers/graphql/generated";
import { getFilledValue } from "@/lib/getFilledValue";
import { RecruiterProfileMetaItems } from "../recruiterProfile.typedefs";
import { FCIcon } from "@/ui/icons/typedefs";
import { IconLocation } from "@/ui/icons/general/IconLocation";

export interface MetaItem {
  name: RecruiterProfileMetaItems;
  text: string;
  icon?: FCIcon;
}

interface UseRecruiterProfileMetaItems {
  (profile?: RecruiterProfile | null): MetaItem[];
}
export const useRecruiterProfileMetaItems: UseRecruiterProfileMetaItems = (
  profile
) =>
  useMemo(() => {
    if (!profile) {
      return [];
    }

    return [
      {
        name: RecruiterProfileMetaItems.Position,
        text: getFilledValue(profile.position),
      },
      {
        name: RecruiterProfileMetaItems.CompanyName,
        text: getFilledValue(profile.companyName),
      },
      {
        name: RecruiterProfileMetaItems.Location,
        text: getFilledValue(profile.city),
        icon: IconLocation,
      },
    ];
  }, [profile]);
