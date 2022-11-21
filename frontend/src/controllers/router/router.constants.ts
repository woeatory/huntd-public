export enum Routes {
  Home = '/',
  CompaniesHome = '/for-companies',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  ForgotPassword = '/forgot-password',
  Profile = '/profile',
  ChooseProfile = '/choose-profile',
  Candidates = '/candidates',
  Candidate = '/candidate',
  Vacancies = '/jobs',
  ProfilePreview = '/profile-preview',
  Chats = '/chats',
  Recruiter = '/recruiter',
  AboutUs = '/about-us',
  Settings = '/settings',
  Pricing = '/pricing',
  FAQ = '/pricing#faq',
  Join = '/join',
  Engineers = '/engineers',
  Developers = '/developers',
  Web3Companies = '/web3-companies',
  Salaries = '/salaries'
}

export enum MobileAppsRoutes {
  Apple = 'https://apps.apple.com/am/app/huntd-app/id1560379716',
  Google = 'https://play.google.com/store/apps/details?id=com.mateacademy.huntd',
}

export enum TermsAndConditionsRoutes {
  Cookies = '/cookies-policy.pdf',
  Privacy = '/privacy-policy.pdf',
  Terms = '/terms-of-use.pdf'
}

export enum ProfileRoutes {
  Candidate = '/profile/candidate',
  Recruiter = '/profile/recruiter',
  HiringManagement = '/profile/hiring-management',
  Contacts = '/profile/contacts',
  PerfectCandidate = '/profile/perfect-candidate',
  Feedback = '/profile/feedback'
}

export enum HiringManagementRoutes {
  Hirings = '/profile/hiring-management/hirings',
  Connections = '/profile/hiring-management/connections',
  Subscriptions = '/profile/hiring-management/subscriptions',
  Templates = '/profile/hiring-management/message-templates',
}

export enum RecruiterProfileRoutes {
  CompanyInfo = '/profile/recruiter/company-info',
  Contacts = '/profile/recruiter/contacts'
}

export enum CandidateProfileRoutes {
  Speciality = '/profile/candidate/speciality',
  JobExpectations = '/profile/candidate/job-expectations',
  Experience = '/profile/candidate/experience',
  Bio = '/profile/candidate/bio'
}

export enum SearchRoutes {
  AnyCity = 'any-city',
  AnyCountry = 'any-country',
  Technologies = 'technologies',
  SalaryFrom = 'salaryFrom',
  SalaryTo = 'salaryTo',
  TimezoneFrom = 'timezoneFrom',
  TimezoneTo = 'timezoneTo',
  EnglishLevel = 'englishLevels',
  JobExperience = 'jobExperience',
  EmploymentType = 'employmentTypes',
  TimezoneReverseMode = 'timezoneReverseMode',
  SalaryMultiplier = 'salaryMultiplier',
  CandidateLocation = 'candidateLocation'
}

export enum LocationTypes {
  City = 'locality',
  Country = 'country',
}

export enum LocationFilterType {
  CityCountry = 'city-country',
  Timezone = 'timezone',
}

export enum SettingsRoutes {
  SocialProfiles = '/settings/social-profiles',
  ChangePassword = '/settings/change-password',
}

export enum VacanciesRoutes {
  AtsSetup = '/jobs/ats-setup',
  GreenhouseSetup = '/jobs/ats-setup/greenhouse',
  LeverSetup = '/jobs/ats-setup/lever',
  AtsSetupSuccess = '/jobs/ats-success',
  Company = '/jobs/company',
}

export enum Web3VacanciesSearchQuery {
  Backend = 'web3-backend',
  Frontend = 'web3-frontend',
  Mobile = 'web3-mobile',
  FullStack = 'web3-full-stack',
  Defi = 'web3-defi',
  Nft = 'web3-nft',
  Javascript = 'web3-javascript',
  React = 'web3-react',
  SmartContract = 'web3-smart-contract',
  Solidity = 'web3-solidity',
  Solana = 'web3-solana',
}

export enum Web3FilterSearchQuery {
  Web3 = 'web3',
  Frontend = 'web3-frontend',
  Backend = 'web3-backend',
  Fullstack = 'web3-full-stack',
  Mobile = 'web3-mobile',
  SmartContract = 'web3-smart-contract',
  Solidity = 'solidity',
  Solana = 'solana',
  Blockchain = 'blockchain',
  Defi = 'web3-defi',
  Nft = 'web3-nft',
  React = 'web3-react',
}
