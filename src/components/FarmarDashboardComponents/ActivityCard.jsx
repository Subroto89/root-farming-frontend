
import { useLoaderData } from "react-router";
import ActivityCardData from "./ActivityCardData";

const ActivityCard = () => {
  const {activities} = useLoaderData();

  return (
    <>
      {activities.length <= 0 ? (
        <div>
            <p className="text-2xl mt-5 text-center font-semibold text-gray-400">No Activity here</p>
        </div>

      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
          {activities.map((data) => (
            <ActivityCardData  key={data._id} data={data} />
          ))}
        </div>
      )}
    </>
  );    
};

export default ActivityCard;
