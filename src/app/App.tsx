import "../styles/app.css";
import "../styles/input.css";
import AppRouter from "../components/layouts/AppRouter";
import { ModalProvider } from "../components/features/navigation/modals/ModalProvider";
import { ThemeProvider } from "../components/features/navigation/themes/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider>
        <ModalProvider>
          <AppRouter />
        </ModalProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
