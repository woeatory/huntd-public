import React, { FC, useMemo } from 'react';
import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { CandidateProfile, CityTypes } from '@/controllers/graphql/generated';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';
import { ProfilePreviewLink } from '@/components/ProfileModule/ProfilePreviewLink';
import { SocialProviders } from '@/components/Contacts/Contacts.constants';

interface Props {
  profile: CandidateProfile;
}

export const CandidateProfileDetails: FC<Props> = (props) => {
  const { profile } = props;

  const { t } = useTranslation([
    Namespaces.Profile,
    Namespaces.Form,
  ]);

  const [user] = useAuthUser();

  const technologies = useMemo(() => {
    if (!profile.technologies) {
      return '';
    }

    return profile.technologies
      .map((technology) => technology.name)
      .join(', ');
  }, [profile.technologies]);

  const locationCity = useMemo(
    () => profile.cities?.find(
      (city) => city.type === CityTypes.CandidateCity,
    )?.cityName,
    [profile.cities],
  );

  const employmentCities = useMemo(
    () => profile.cities?.filter(
      (city) => city.type === CityTypes.OfficeCity,
    ).map((city) => city.cityName),
    [profile.cities],
  );

  const withSocialNetworks = Boolean(
    user?.linkedinUrl
    || user?.behanceUrl
    || user?.githubUrl,
  );

  const userCV = user?.cv || null;

  const withAdditionalInfo = Boolean(withSocialNetworks || userCV);

  return (
    <ScrollView style={profileDetailsStyles.container}>
      <View style={{ height: 24 }} />
      {withAdditionalInfo && (
        <View style={profileDetailsStyles.additionalInfoContainer}>
          {userCV && (
            <View style={profileDetailsStyles.item}>
              <Text style={[profileDetailsStyles.title, typography.text]}>
                {t(`${Namespaces.Form}:cv_label`)}
              </Text>
              <ProfilePreviewLink title={userCV.name} link={userCV.url} />
            </View>
          )}
          {withSocialNetworks && (
            <View style={profileDetailsStyles.item}>
              <Text style={[
                profileDetailsStyles.title,
                typography.text,
                { marginBottom: 8 },
              ]}
              >
                {t(`${Namespaces.Profile}:social_profiles`)}
              </Text>
              {!!user?.linkedinUrl && (
              <ProfilePreviewLink
                title={SocialProviders.Linkedin}
                link={user.linkedinUrl}
              />
              )}
              {!!user?.behanceUrl && (
                <ProfilePreviewLink
                  title={SocialProviders.Behance}
                  link={user.behanceUrl}
                />
              )}
              {!!user?.githubUrl && (
                <ProfilePreviewLink
                  title={SocialProviders.Github}
                  link={user.githubUrl}
                />
              )}
            </View>
          )}
        </View>
      )}
      {profile.specialization && (
        <View style={profileDetailsStyles.item}>
          <Text style={[profileDetailsStyles.title, typography.text]}>
            {t(`${Namespaces.Profile}:specialization_label`)}
          </Text>
          <Text style={[profileDetailsStyles.text, typography.text]}>
            {profile.specialization.name}
          </Text>
        </View>
      )}
      <View style={profileDetailsStyles.item}>
        <Text style={[profileDetailsStyles.title, typography.text]}>
          {t(`${Namespaces.Profile}:position_label`)}
        </Text>
        <Text style={[profileDetailsStyles.text, typography.text]}>
          {profile.position}
        </Text>
      </View>
      {technologies.length > 0 && (
        <View style={profileDetailsStyles.item}>
          <Text style={[profileDetailsStyles.title, typography.text]}>
            {t(`${Namespaces.Profile}:technologies_label`, {
              count: profile.technologies?.length,
            })}
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text
              style={[profileDetailsStyles.text, typography.text]}
            >
              {technologies}
            </Text>
          </View>
        </View>
      )}
      {profile.salary && (
        <View style={profileDetailsStyles.item}>
          <Text style={[profileDetailsStyles.title, typography.text]}>
            {t(`${Namespaces.Profile}:salary_label`)}
          </Text>
          <Text style={[profileDetailsStyles.text, typography.text]}>
            {profile.salary}
          </Text>
        </View>
      )}
      {profile.jobExperience && (
        <View style={profileDetailsStyles.item}>
          <Text style={[profileDetailsStyles.title, typography.text]}>
            {t(`${Namespaces.Form}:job_experience_label`)}
          </Text>
          <Text style={[profileDetailsStyles.text, typography.text]}>
            {t(`${Namespaces.Form}:${profile.jobExperience.slug}`)}
          </Text>
        </View>
      )}
      {locationCity && (
        <View style={profileDetailsStyles.item}>
          <Text style={[profileDetailsStyles.title, typography.text]}>
            {t(`${Namespaces.Profile}:job_city_label`)}
          </Text>
          <Text style={[profileDetailsStyles.text, typography.text]}>
            {locationCity}
          </Text>
        </View>
      )}
      {employmentCities && employmentCities.length > 0 && (
        <View style={profileDetailsStyles.item}>
          <Text style={[profileDetailsStyles.title, typography.text]}>
            {t(`${Namespaces.Form}:cities_label`)}
          </Text>
          <Text style={[profileDetailsStyles.text, typography.text]}>
            {employmentCities.join((', '))}
          </Text>
        </View>
      )}
      {Boolean(profile.achievements) && (
        <View style={profileDetailsStyles.item}>
          <Text style={[profileDetailsStyles.title, typography.text]}>
            {t(`${Namespaces.Form}:achievements_label`)}
          </Text>
          <Text style={[profileDetailsStyles.text, typography.text]}>
            {profile.achievements}
          </Text>
        </View>
      )}
      {Boolean(profile.experienceDescription) && (
        <View style={profileDetailsStyles.item}>
          <Text style={[profileDetailsStyles.title, typography.text]}>
            {t(`${Namespaces.Profile}:experience_label`)}
          </Text>
          <Text style={[profileDetailsStyles.text, typography.text]}>
            {profile.experienceDescription}
          </Text>
        </View>
      )}
      {Boolean(profile.workExpectations) && (
        <View style={profileDetailsStyles.item}>
          <Text style={[profileDetailsStyles.title, typography.text]}>
            {t(`${Namespaces.Profile}:expectations_label`)}
          </Text>
          <Text style={[profileDetailsStyles.text, typography.text]}>
            {profile.workExpectations}
          </Text>
        </View>
      )}
      <View style={{ height: 96 }} />
    </ScrollView>
  );
};

export const profileDetailsStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 48,
  },
  additionalInfoContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
    marginBottom: 16,
  },
  item: {
    marginBottom: 16,
  },
  title: {
    color: Colors.Gray,
    marginBottom: 4,
  },
  text: {
    color: Colors.Semidark,
    fontSize: 16,
    lineHeight: 24,
  },
});
