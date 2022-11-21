import { StepperStep } from '@/components/Stepper/typedefs';
import { Speciality } from '@/components/ProfileModule/ProfileFIlling/Candidate/Speciality';
import { JobExpectations } from '@/components/ProfileModule/ProfileFIlling/Candidate/JobExpectations';
import { Experience } from '@/components/ProfileModule/ProfileFIlling/Candidate/Experience';

export const candidateProfileSteps: StepperStep[] = [
  { id: 1, label: 'profile_tab_speciality', Component: Speciality },
  { id: 2, label: 'profile_tab_job-expectations', Component: JobExpectations },
  { id: 3, label: 'profile_tab_experience', Component: Experience },
];

export const recruiterProfileSteps: StepperStep[] = [

];
