import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();
    
  return (
    <>
      <div onClick={() => toggleTheme()}>
        {theme === "dark" ? <Sun size={22}/> : <Moon size={22}/>}
      </div>
    </>
  );
};

export default ThemeSwitcher;
