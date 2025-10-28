import React from "react";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

import Container from "../../../components/shared/Container";
import InstructionEditor from "../../../components/AgriSpecialist/InstructionEditor";

const CropWiseInstruction = () => {
   const axiosSecure = useAxiosSecure();
   const navigate = useNavigate();

   // onSave will be passed to InstructionEditor
   const handleSave = async (payload) => {
      // POST to backend
      console.log(payload);
      const res = await axiosSecure.post("/api/instructions", payload);
      return res.data; // return saved document to caller if they expect it
   };

   return (
      <div className={"min-h-screen"}>
         <InstructionEditor
            onSave={async (payload) => {
               try {
                  const saved = await handleSave(payload);
                  toast.success("Saved on server");
                  // Optionally navigate or show the created instruction
                  navigate(`/instructions/${saved._id}`);
                  return saved;
               } catch (err) {
                  console.error("Save failed", err);
                  // rethrow so InstructionEditor can also catch if it wants
                  throw err;
               }
            }}
         />
      </div>
   );
};

export default CropWiseInstruction;
