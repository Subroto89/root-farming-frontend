import Container from "../../../components/shared/Container";
import { useTheme } from "../../../hooks/useTheme";

const CropWiseInstruction = () => {
  const { theme } = useTheme();
  const themeBackground = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForeground = theme === "dark" ? "fg-dark" : "fg-light";
  return (
    <div className={`${themeBackground} min-h-screen`}>
       <Container>
        This is user wise instruction
       </Container>
    </div>
  )
};

export default CropWiseInstruction;
