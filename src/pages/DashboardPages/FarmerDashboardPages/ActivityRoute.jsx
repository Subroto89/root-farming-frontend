import React from "react";
import {
  Calendar,
  DollarSign,
  FileText,
  Plus,
  StickyNote,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";
import ActivityCard from "../../../components/FarmarDashboardComponents/ActivityCard";
import { useTheme } from "../../../hooks/useTheme";
import { useLoaderData } from "react-router";

const ActivityRoute = () => {
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle =    theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

  const {farmerFields} = useLoaderData()
  const farmerFieldsData = farmerFields.data
  console.log(farmerFieldsData);
  

  const handleactivity = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const activityData = Object.fromEntries(formData.entries());
    console.log(activityData);

    fetch("http://localhost:3000/activities", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(activityData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          document.getElementById("my_modal_3").close();
          Swal.fire({
            title: "New Activities Added",
            icon: "success",
            draggable: true,
          });
        
        }
      });
    form.reset();
  };

  return (
    <div className={`${themeBackgroundStyle} h-screen text-black p-2`}>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl">Activity Login</h3>

        <div>
          <button
            className="p-2 bg-green-600 text-white rounded-lg mr-3 flex items-center gap-1 cursor-pointer"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <Plus/>

            Add Activity
          </button>

          <dialog id="my_modal_3" className="modal  ">
            <div
              className={`${themeForegroundStyle} modal-box mx-auto max-w-2xl`}
            >
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>

              {/* ................. */}
              <form
                onSubmit={handleactivity}
                className=" rounded-2xl   space-y-5"
              >
                <h2 className="text-2xl font-semibold">Add New Activity</h2>

                {/* Activity Type */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      Activity Type
                    </label>
                    <select
                      name="activityType"
                      required
                      className={`${themeForegroundStyle} w-full p-2.5 rounded-lg  border `}
                    >
                      <option value="">Select type</option>
                      <option>Planting</option>
                      <option>Fertilizing</option>
                      <option>Irrigation</option>
                      <option>Harvesting</option>
                    </select>
                  </div>

                  {/* Related Field */}
                  <div>
                    <label className="block mb-1 text-sm font-medium">
                      Related Field
                    </label>
                    <select
                      required
                      name="relatedField"
                      className={`${themeForegroundStyle} w-full p-2.5 rounded-lg  border `}
                    >
                      <option value="">No specific field</option>
                      {
                        farmerFieldsData.map(fieldData => <option>{fieldData.name}</option>)
                      }
                      {/* <option>Field A</option>
                      <option>Field B</option> */}
                    </select>
                  </div>
                </div>
                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className=" mb-1 text-sm font-medium flex items-center gap-1">
                      <Calendar size={16} /> Activity Date
                    </label>
                    <input
                      type="date"
                      name="activityDate"
                      required
                      className="w-full p-2.5 rounded-lg  border "
                      defaultValue="2025-10-22"
                    />
                  </div>
                  <div>
                    <label className=" mb-1 text-sm font-medium flex items-center gap-1">
                      <Calendar size={16} /> Next Due Date (Optional)
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      className="w-full p-2.5 rounded-lg  border "
                    />
                  </div>
                </div>

                {/* Cost */}
                <div>
                  <label className=" mb-1 text-sm font-medium flex items-center gap-1">
                    <DollarSign size={16} /> Cost
                  </label>
                  <input
                    type="number"
                    name="cost"
                    required
                    placeholder="0.00"
                    className="w-full p-2.5 rounded-lg  border "
                  />
                </div>

                {/* Activity Title */}
                <div>
                  <label className=" mb-1 text-sm font-medium flex items-center gap-1">
                    <FileText size={16} /> Activity Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="Activity Title"
                    className="w-full p-2.5 rounded-lg  border  "
                  />
                </div>

                {/* Description */}
                <div>
                  <label className=" mb-1 text-sm font-medium flex items-center gap-1">
                    <StickyNote size={16} /> Description
                  </label>
                  <textarea
                    placeholder="Describe the activity..."
                    rows={3}
                    required
                    name="description"
                    className="w-full p-2.5 rounded-lg  border "
                  ></textarea>
                </div>

                {/* Submit */}
                <button className="w-full py-2.5 bg-green-600 hover:bg-green-700 cursor-pointer text-white rounded-lg font-medium transition">
                  Save Activity
                </button>
              </form>
              {/* .......................... */}
            </div>
          </dialog>
        </div>
      </div>

      {/* ----- card ------ */}

      <ActivityCard ></ActivityCard>
    </div>
  );
};

export default ActivityRoute;
