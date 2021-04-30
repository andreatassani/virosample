import { useDarkMode } from 'react-native-dark-mode'

export default function isDarkMode() {
    var mode = useDarkMode();
    return mode;
}