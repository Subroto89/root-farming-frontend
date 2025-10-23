import { Calendar } from "lucide-react";
import React from "react";
import { data, Link, useLoaderData } from "react-router";
import ActivityCardData from "./ActivityCardData";

const ActivityCard = () => {
  const activitiesCardData = useLoaderData();

  

  return (
    <>
      {activitiesCardData.length <= 0 ? (
        <div>
            <p className="text-2xl mt-5 text-center font-semibold text-gray-400">No Activity here</p>
        </div>

      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
          {activitiesCardData.map((data) => (
            <ActivityCardData  key={data._id} data={data} />
          ))}
        </div>
      )}
    </>
  );    
};

export default ActivityCard;
