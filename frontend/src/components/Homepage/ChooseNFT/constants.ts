export enum Groups {
  topLeft = 'topLeft',
  topRight = 'topRight',
  middleLeft = 'middleLeft',
  middleRight = 'middleRight',
  bottomLeft = 'bottomLeft',
  bottomRight = 'bottomRight',
}

interface NFT {
  id: number;
  url: string;
  devUrl: string;
}

export const NFTS: Record<Groups, NFT[]> = {
  topLeft: [
    {
      id: 0,
      devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/1_7010402796.webp',
      url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/1_c24961c716.webp',
    },
    {
      id: 1,
      devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/2_d1334f2438.webp',
      url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/2_abdca23fff.webp',
    },
  ],
  topRight: [
    {
      id: 2,
      devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/3_4694ec3a9e.webp',
      url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/3_59043a54ad.webp',
    },
    {
      id: 3,
      devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/4_7f3d734efb.webp',
      url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/4_0eceefd8e0.webp',
    },
  ],
  middleLeft: [
    {
      id: 4,
      devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/5_7174cf4d45.webp',
      url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/5_7553b0db5e.webp',
    },
    {
      id: 5,
      devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/6_9109111289.webp',
      url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/6_1140ff6516.webp',
    },
    {
      id: 6,
      devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/7_43db196f96.webp',
      url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/7_561c448188.webp',
    },
  ],
  middleRight: [
    {
      id: 7,
      devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/8_f25cb1cacd.webp',
      url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/8_bd75eb79e8.webp',
    },
    {
      id: 8,
      devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/9_9b7cc86b0b.webp',
      url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/9_e7a05cbf43.webp',
    },
    {
      id: 9,
      devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/10_4a94984349.webp',
      url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/10_4ad64295bc.webp',
    },
  ],
  bottomLeft: [
    {
      id: 10,
      devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/11_514ff988ba.webp',
      url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/11_768212426d.webp',
    },
    {
      id: 11,
      devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/12_bde306ac10.webp',
      url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/12_4461f8300b.webp',
    },
  ],
  bottomRight: [
    {
      id: 12,
      devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/13_0aebb82ddb.webp',
      url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/13_18d6a83899.webp',
    },
    {
      id: 13,
      devUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/14_4a35400534.webp',
      url: 'https://huntd-files.s3.eu-central-1.amazonaws.com/14_2adb024495.webp',
    },
  ],
};
