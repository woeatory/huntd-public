import {
  AllowNull, BelongsTo,
  Column, ForeignKey, Index,
  Table, DataType, Default,
} from 'sequelize-typescript';
import { ModelBase } from '@/models/ModelBase';
import { CityTypes } from '@/modules/candidateProfileCity/candidateProfileCity.typedefs';
import { CandidateProfile } from '@/models/CandidateProfile';

@Table({
  tableName: 'candidate_profile_cities',
})
export class CandidateProfileCity extends ModelBase<
  CandidateProfileCity
> {
  @AllowNull(false)
  @Index('candidate_profile_cities_candidate_profile_id')
  @ForeignKey(() => CandidateProfile)
  @Column({
    field: 'candidate_profile_id',
  })
  candidateProfileId: number;

  @BelongsTo(() => CandidateProfile)
  candidateProfile: CandidateProfile;

  @AllowNull(false)
  @Column({
    field: 'city_id',
  })
  cityId: string;

  @AllowNull(false)
  @Column({
    field: 'city_name',
  })
  cityName: string;

  @Index('candidate_profile_cities_city_timezone')
  @Column({
    field: 'city_timezone',
  })
  cityTimezone: number;

  @Index('candidate_profile_cities_city_country_slug')
  @Column({
    field: 'city_country_slug',
  })
  cityCountrySlug: string;

  @Index('candidate_profile_cities_city_country_name')
  @Column({
    field: 'city_country_name',
  })
  cityCountryName: string;

  @Default(CityTypes.Office)
  @Column({
    type: DataType.ENUM(...Object.values(CityTypes)),
  })
  type: CityTypes;
}
