import { useNavigation as useNativeNavigation } from '@react-navigation/native';
import { NavigationProp } from '@/controllers/router/router.constants';

export const useNavigation = () => useNativeNavigation<NavigationProp>();
