import "../styles/app.css";
import "../styles/input.css";
import AppRouter from "../components/layouts/AppRouter";
import { ThemeProvider } from "../components/features/navigation/themes/ThemeProvider";
import { NavigationProvider } from "../components/features/navigation/NavigationProvider";

function App() {
  return (
    <>
      <ThemeProvider>
        <NavigationProvider>
          <AppRouter />
        </NavigationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
