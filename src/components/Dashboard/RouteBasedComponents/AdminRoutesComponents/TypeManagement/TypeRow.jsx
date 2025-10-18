import { SquarePen, Trash } from "lucide-react";
import { capitalizeFirstLetter } from "../../../../../utils/utilities";

const TypeRow = ({ type, handleTypeDelete, handleUpdateTypeModal, setTypeToEdit }) => {
  const { _id, typeName, typePhoto, productCount, createdAt, status } = type;

  return (
    <tr className="border-b border-gray-500">
      <td className="py-2 w-12 h-12 overflow-hidden">
        <img
          src={typePhoto}
          alt="type photo"
          className="w-8 h-8 object-cover mx-auto"
        />
      </td>
      <td className="py-2 px-8">{typeName}</td>
      <td className="py-2 px-8 text-center">{productCount}</td>
      <td className="py-2 px-8">{new Date(createdAt).toLocaleDateString()}</td>
      <td className="py-2 px-8">{capitalizeFirstLetter(status)}</td>
      <td className="py-2 px-8">
        <div className="flex items-center gap-2">
          <SquarePen onClick={()=>{handleUpdateTypeModal(), setTypeToEdit(type)}} className="btn btn-xs btn-outline hover:bg-blue-400 hover:text-white"/>
          <Trash onClick={()=>handleTypeDelete(_id)} className="btn btn-xs btn-outline hover:bg-red-600 hover:text-white"/>
        </div>
      </td>
    </tr>
  );
};

export default TypeRow;
