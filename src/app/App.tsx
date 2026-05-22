import "../styles/app.css";
import "../styles/input.css";
import AppRouter from "../components/layouts/AppRouter";
import { ModalProvider } from "../components/features/navigation/modals/ModalProvider";

function App() {
  return (
    <>
      <ModalProvider>
        <AppRouter />
      </ModalProvider>
    </>
  );
}

export default App;
