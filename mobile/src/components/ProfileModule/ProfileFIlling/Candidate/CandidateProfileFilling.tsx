import React, {
  FC, useCallback, useMemo, useState,
} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import { useLatestCandidateProfile } from '@/controllers/candidateProfile/candidateProfile.hooks/useLatestCandidateProfile';
import { getCandidateProfileFillingStep } from '@/controllers/candidateProfile/candidateProfile.utils/getCandidateProfileFillingStep';
import { useNavigation } from '@/controllers/router/router.hooks/useNagivation';
import { BackButton } from '@/components/Header/BackButton';
import { Colors } from '@/ui/theme/colors';
import { Namespaces } from '@/controllers/i18next/i18next.typedefs';
import { Stepper } from '@/components/Stepper';
import { candidateProfileSteps } from '@/controllers/profile/profile.steps';
import { typography } from '@/ui/typography/typography.module';
import { StackRoutes } from '@/controllers/router/router.constants';
import { useAuthUser } from '@/controllers/user/user.hooks/useAuthUser';

export const CandidateProfileFilling: FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation([Namespaces.Profile]);

  const [candidateProfile] = useLatestCandidateProfile();
  const [user] = useAuthUser();

  const startStep = useMemo(
    () => getCandidateProfileFillingStep(candidateProfile),
    [candidateProfile],
  );

  const [currentStep, setCurrentStep] = useState(startStep);
  const onFinish = useCallback(() => {
    if (user?.isFirstTimeFillingCandidateProfile) {
      navigation.navigate(StackRoutes.Contacts);
    } else {
      navigation.goBack();
    }
  }, [navigation, user?.isFirstTimeFillingCandidateProfile]);

  const onBackPressed = useCallback(() => {
    if (currentStep === 0) {
      navigation.goBack();
    } else {
      setCurrentStep((step) => step - 1);
    }
  }, [currentStep, navigation]);

  return (
    <Animatable.View
      animation="fadeInRight"
      style={styles.container}
      duration={700}
    >
      <View style={styles.headingContainer}>
        <View style={styles.titleContainer}>
          <BackButton callback={onBackPressed} color={Colors.Citrus} />
          <Text style={styles.headingText}>
            {t(`${Namespaces.Profile}:profile_candidate_title`)}
          </Text>
        </View>
        <Text style={styles.titleText}>
          {t(`${Namespaces.Profile}:profile_candidate_message`)}
        </Text>
      </View>
      <Stepper
        steps={candidateProfileSteps}
        onFinish={onFinish}
        currentStep={currentStep}
        changeStep={setCurrentStep}
        startStep={startStep}
        isFirstTimeFilling={user?.isFirstTimeFillingCandidateProfile}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headingContainer: {
    marginBottom: 32,
  },
  headingText: {
    ...typography.text,
    fontSize: 24,
    lineHeight: 34,
    marginLeft: 16,
  },
  titleText: {
    ...typography.text,
    color: Colors.Gray,
  },
});
