interface Candidate {
  avatarUrl: string
  avatarDevUrl: string
  salary: string
  remote: string
  techs: string
  position: string
}

export const CANDIDATES: Candidate[] = [
  {
    avatarUrl: 'https://huntd-files.s3.eu-central-1.amazonaws.com/3_59043a54ad.webp',
    avatarDevUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/3_4694ec3a9e.webp',
    position: 'nft_backend_dev_position',
    salary: 'nft_backend_dev_salary',
    remote: 'nft_backend_dev_remote',
    techs: 'nft_backend_dev_techs',
  },
  {
    avatarUrl: 'https://huntd-files.s3.eu-central-1.amazonaws.com/4_0eceefd8e0.webp',
    avatarDevUrl: 'https://huntd-files-development.s3.eu-central-1.amazonaws.com/4_7f3d734efb.webp',
    position: 'nft_blockchain_dev_position',
    salary: 'nft_blockchain_dev_salary',
    remote: 'nft_blockchain_dev_remote',
    techs: 'nft_blockchain_dev_techs',
  },
];
