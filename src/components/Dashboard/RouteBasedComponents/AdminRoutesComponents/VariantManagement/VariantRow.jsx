import { SquarePen, Trash } from "lucide-react";
import { capitalizeFirstLetter } from "../../../../../utils/utilities";

const VariantRow = ({ variant, handleVariantDelete, handleUpdateVariantModal, setVariantToEdit }) => {
  const { _id, variantName, variantPhoto, productCount, createdAt, variantStatus } = variant;

  return (
    <tr className="border-b border-gray-500">
      <td className="py-2 w-12 h-12 overflow-hidden">
        <img
          src={variantPhoto}
          alt="Variant photo"
          className="w-8 h-8 object-cover mx-auto"
        />
      </td>
      <td className="py-2 px-8">{variantName}</td>
      <td className="py-2 px-8 text-center">{productCount}</td>
      <td className="py-2 px-8">{new Date(createdAt).toLocaleDateString()}</td>
      <td className="py-2 px-8">{capitalizeFirstLetter(variantStatus)}</td>
      <td className="py-2 px-8">
        <div className="flex items-center gap-2">
          <SquarePen onClick={()=>{handleUpdateVariantModal(), setVariantToEdit(variant)}} className="btn btn-xs btn-outline hover:bg-blue-400 hover:text-white"/>
          <Trash onClick={()=>handleVariantDelete(_id)} className="btn btn-xs btn-outline hover:bg-red-600 hover:text-white"/>
        </div>
      </td>
    </tr>
  );
};

export default VariantRow;
