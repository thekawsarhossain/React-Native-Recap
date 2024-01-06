import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    [key: string]: undefined | Object;
};

export type NavigationProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;