import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference-complete/theme/ThemeProvider';
import DualMountBootstrap from '/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference-complete/utils/dualMountBootstrap';
import { AppShell } from '/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference-complete/AppShell';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <DualMountBootstrap>
          <AppShell />
        </DualMountBootstrap>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
