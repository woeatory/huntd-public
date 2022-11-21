export interface WorkPlaceFull {
  id: number;
  candidateProfileId: number;
  companyName: string;
  companyUrl: string | null;
  companySizeFrom: number | null;
  companySizeTo: number | null;
  companyIndustry: string | null;
  companyCategories: string | null;
  companySpecialities: string | null;
  companyFundingType: string | null;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
}

export interface CompanyInfo {
  companyName: string;
  companyUrl: string | null;
  companySizeFrom: number | null;
  companySizeTo: number | null;
  companyIndustry: string | null;
  companyCategories: string | null;
  companySpecialities: string | null;
  companyFundingType: string | null;
}

export interface DeleteOptions {
  id: number;
}

export interface UpdateOptions {
  id: number;
  companyName: string;
  companyUrl: string | null;
  companySizeFrom: number | null;
  companySizeTo: number | null;
  companyIndustry: string | null;
  companyCategories: string | null;
  companySpecialities: string | null;
  companyFundingType: string | null;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface CreateOptions {
  candidateProfileId: number;
  companyName: string;
  companyUrl: string | null;
  companySizeFrom: number | null;
  companySizeTo: number | null;
  companyIndustry: string | null;
  companyCategories: string | null;
  companySpecialities: string | null;
  companyFundingType: string | null;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
}
