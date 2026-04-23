import Button from "../ui/Button";
import { useTheme } from "../../packages/hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const icon = theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "🖥️"; // system

  return <Button onClick={toggleTheme}>{icon}</Button>;
};

export default ThemeToggle;
