import { X } from "lucide-react";
import FormInAddCategory from "./FormInAddCategory";

const AddCategoryModal = ({handleCategoryModal, refetch}) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="relative flex flex-col w-[400px] h-[300px] bg-gray-100 rounded-lg p-2 overflow-hidden">
            {/* Title and Close Button Section ---------------- */}
            <div className="sticky top-0 inset-x-0 z-1000 flex items-center justify-between bg-green-500 px-4 py-2">
                <h2 className="text-xl font-bold text-white">Add New Category</h2>
                <X 
                  onClick={handleCategoryModal}
                  size={26}
                  className="border border-white rounded-md hover:bg-red-500 hover:text-white"
                />
            </div>

            {/* Add Category Form ------------------------------ */}
            <div>
                <FormInAddCategory handleCategoryModal={handleCategoryModal} refetch={refetch}/>
            </div>
        </div>
      </div>
    </>
  );
};

export default AddCategoryModal;
