import React from "react";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import Container from "../../../components/shared/Container";
import InstructionEditor from "../../../components/AgriSpecialist/InstructionEditor";

const CropWiseInstruction = () => {
   const axiosSecure = useAxiosSecure();

   // onSave will be passed to InstructionEditor
   const handleSave = async (payload) => {
      // POST to backend
      console.log(payload);
      const res = await axiosSecure.post("/instructions", payload, {
         protected: true,
      });
      return res.data; // return saved document to caller if they expect it
   };

   return (
      <div className={"min-h-screen"}>
         <InstructionEditor
            onSave={async (payload) => {
               try {
                  const saved = await handleSave(payload);
                  Swal.fire({
                     icon: "success",
                     title: "Instruction Saved",
                     text: "Saved on server successfully",
                     timer: 2000,
                     showConfirmButton: false,
                  });
                  // Optionally navigate or show the created instruction

                  return saved;
               } catch (err) {
                  console.error("Save failed", err);
                  Swal.fire({
                     icon: "error",
                     title: "Save Failed",
                     text: err?.message || "Something went wrong",
                  });
                  // rethrow so InstructionEditor can also catch if it wants
                  throw err;
               }
            }}
         />
      </div>
   );
};

export default CropWiseInstruction;
