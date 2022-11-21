import { StyleSheet } from 'react-native';
import { Colors } from '@/ui/theme/colors';
import { typography } from '@/ui/typography/typography.module';

interface GetStepStylesOptions {
  isCompletedStep: boolean,
  isActiveStep: boolean,
  isFirstStep: boolean,
  isLastStep: boolean,
}

export const getStepStyles = (options: GetStepStylesOptions) => {
  let styles = { ...stepStyles };

  if (options.isActiveStep) {
    styles = { ...styles, ...activeStepStyles };
  }

  if (options.isCompletedStep) {
    styles = { ...styles, ...completedStepStyles };
  }

  if (options.isFirstStep) {
    styles = { ...styles, ...firstStepStyles };
  }

  if (options.isLastStep) {
    styles = { ...styles, ...lastStepStyles };
  }

  if (!options.isLastStep && !options.isFirstStep) {
    styles = { ...styles, ...middleStepStyles };
  }

  return styles;
};

export const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  baseCircle: {
    position: 'relative',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.LightGray,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseDivider: {
    position: 'absolute',
    height: 6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.LightGray,
  },
  baseLabel: {
    ...typography.smallText,
    textTransform: 'uppercase',
  },
});

const activeStepStyles = StyleSheet.create({
  container: {},
  circle: {
    ...mainStyles.baseCircle,
    borderColor: Colors.Citrus,
  },
  divider: {
    ...mainStyles.baseDivider,
  },
  label: {
    ...mainStyles.baseLabel,
    color: Colors.Citrus,
  },
});

const completedStepStyles = StyleSheet.create({
  container: {},
  circle: {
    ...mainStyles.baseCircle,
    borderColor: Colors.Citrus,
    backgroundColor: Colors.Citrus,
  },
  divider: {
    ...mainStyles.baseDivider,
  },
  label: {
    ...mainStyles.baseLabel,
    color: Colors.Citrus,
  },
  checkIcon: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: Colors.Citrus,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.White,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const stepStyles = StyleSheet.create({
  container: {},
  circle: {
    ...mainStyles.baseCircle,
  },
  divider: {
    ...mainStyles.baseDivider,
  },
  label: {
    ...mainStyles.baseLabel,
  },
  checkIcon: {},
});

const firstStepStyles = StyleSheet.create({
  container: {
    ...mainStyles.container,
    alignItems: 'flex-start',
  },
});
const lastStepStyles = StyleSheet.create({
  container: {
    ...mainStyles.container,
    alignItems: 'flex-end',
  },
});
const middleStepStyles = StyleSheet.create({
  container: {
    ...mainStyles.container,
    alignItems: 'center',
  },
});
