import { NativeModules } from "react-native";

const RNLayoutMargins = NativeModules.RNLayoutMargins;

export const currentInsets = async () => RNLayoutMargins.currentInsets();
