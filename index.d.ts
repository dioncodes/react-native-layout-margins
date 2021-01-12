declare module '@dioncodes/react-native-layout-margins' {
    export function currentInsets(): Promise<{
        left: number,
        right: number,
        bottom: number,
        top: number,
    }>;
}
