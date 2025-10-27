import { useState } from "react";
import Button from "../../../components/shared/Buttons/Button";
import Container from "../../../components/shared/Container";
import { useTheme } from "../../../hooks/useTheme";
import ModalFormat from "../../../components/shared/ModalFormat";
import InstructionEditor from "../../../components/AgriSpecialist/InstructionEditor";

const CropWiseInstruction = () => {
  // Theme Application
  const { theme } = useTheme();
  const themeBackground = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForeground = theme === "dark" ? "fg-dark" : "fg-light";

  // Modal State  
  const [isModal, setIsModal] = useState(false);
  const handleModalToggle = () => {
    setIsModal(prev => !prev);
  }



  return (
    <div className={`${themeBackground} min-h-screen`}>
       <Container>
        {/* Header Part with Button------------------------------------------- */}
        <div className="flex items-center justify-between">
          <h2>Instruction for Crops</h2>
          <Button
            label="Add Instruction"
            status="success"
            onClick={handleModalToggle}
          />
        </div>


      <InstructionEditor/>


        {/* Modal for Taking Instructions Addition ---------------------------- */}
        <div className="overflow-auto">
          {isModal && (
            <ModalFormat
              width="w-[700px]"
              height="h-[600px]"
              headerText="Crop Wise Instruction"
              modalClosingFunction={handleModalToggle}
              form={<InstructionEditor/>}
            />
          )}
        </div>
       </Container>
    </div>
  )
};

export default CropWiseInstruction;
