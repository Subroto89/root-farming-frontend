import ActivityCardData from "./ActivityCardData";

const ActivityCard = ({ fetchData }) => {
  return (
    <>
      {fetchData?.length <= 0 ? (
        <div>
          <p className="text-2xl mt-5 text-center font-semibold text-gray-400">
            No Activity here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
          {fetchData?.map((data) => (
            <ActivityCardData key={data._id} data={data} />
          ))}
        </div>
      )}
    </>
  );
};

export default ActivityCard;
