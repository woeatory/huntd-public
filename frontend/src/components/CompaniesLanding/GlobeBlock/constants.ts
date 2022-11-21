export enum CandidateTitles {
  Frontend = 'frontend',
  Ios = 'ios',
  Backend = 'backend',
}
interface Photo {
  id: number;
  title?: CandidateTitles;
  url: string;
  devUrl: string;
}

export const SENIOR_CANDIDATES_PHOTOS: Photo[] = [
  {
    id: 1,
    title: CandidateTitles.Frontend,
    devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/Nm70_U_Rdtf3c_05ea1fd9cd_dfeaca9457.webp',
    url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/Nm70_U_Rdtf3c_05ea1fd9cd_c71f639d4d.webp',
  },
  {
    id: 2,
    title: CandidateTitles.Ios,
    devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/Ri_Dx_Dg_Hg7pw_6485a9f6ca_0428344be0.webp',
    url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/Ri_Dx_Dg_Hg7pw_6485a9f6ca_d8ceaf1f11.webp',
  },
  {
    id: 3,
    title: CandidateTitles.Backend,
    devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/T_Xxi_Fu_QLBKQ_f39347f1c7_93295f99b3.webp',
    url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/T_Xxi_Fu_QLBKQ_f39347f1c7_ad91a6aa2d.webp',
  },
];

export const GLOBE_PHOTO: Photo = {
  id: 1,
  url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/globe_ea2efd9ab2_b1b2756b9e.webp',
  devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/globe_ea2efd9ab2_e5892b4ebd.webp',
};
