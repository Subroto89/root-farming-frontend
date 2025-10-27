import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 🔹 Suppose you have email from useAuth
import {useAuth}  from "../../../hooks/useAuth"; // example
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // example
import toast from "react-hot-toast";

const DailyToDoList = () => {
  const todayDate = new Date().toISOString().split("T")[0];

  const [task, setTask] = useState("");
  const [landId, setLandId] = useState(null); // this will store selected field object
  const [type, setType] = useState("solid");
  const [amountUnit, setAmountUnit] = useState({ amount: "", unit: null });
  const [date, setDate] = useState(todayDate);

  const { user } = useAuth(); // example, adjust as needed
  const email = user?.email; // or however you get email
  const axiosSecure = useAxiosSecure();

  // -----------------------------
  // 🔹 Fetch fields from server
  // -----------------------------
  const {
    data: fields = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["fields", email],
    queryFn: async () => {
      if (!email) return [];
      const res = await axiosSecure.get(`/fields/by-email?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  // Map fields to react-select options
  const landOptions = fields.map((f) => ({
    value: f._id, // store _id
    label: f.name || f.landName || `Field-${f._id}`, // adjust based on your field schema
  }));

  const typeOptions = [
    { value: "solid", label: "Solid" },
    { value: "liquid", label: "Liquid" },
    { value: "gas", label: "Gas" },
  ];

  const unitOptions = {
    solid: [
      { value: "mg", label: "mg" },
      { value: "g", label: "g" },
      { value: "kg", label: "kg" },
    ],
    liquid: [
      { value: "ml", label: "ml" },
      { value: "l", label: "l" },
    ],
    gas: [
      { value: "cubic_m", label: "Cubic Meter" },
      { value: "litre_gas", label: "Litre" },
    ],
  };

  const [tasks, setTasks] = useState([]);

  // 🔹 TanStack Query useMutation to save to DB
  const queryClient = useQueryClient();
  const { mutate: saveTaskToDB, isPending } = useMutation({
    mutationFn: async (taskData) => {
      const res = await axiosSecure.post("/tasks", taskData);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Added Daily To Do List successfully!");
      console.log("Saved in DB:", data);
      // queryClient.invalidateQueries(["tasks"]);
    },
    onError: (err) => {
      console.error("Error saving to DB", err);
    },
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!task.trim() || !landId || !amountUnit.amount || !amountUnit.unit) return;

    const newTask = {
      id: uuidv4(),
      title: task,
      completed: false,
      landId: landId.value, // 🔹 save _id here
      landName: landId.label, // optional if you want to display name later
      type: type,
      amount: amountUnit.amount,
      unit: amountUnit.unit.label,
      date: date,
    };

    setTasks((prev) => [...prev, newTask]);
    saveTaskToDB(newTask);

    // Reset
    setTask("");
    setLandId(null);
    setAmountUnit({ amount: "", unit: null });
  };

  const toggleTask = (taskObj) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskObj.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const filteredTasks = tasks.filter((t) => t.date === date);

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Daily To-Do List</h2>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Select Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-1 rounded"
        />
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="mb-6 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
        </div>

        <div className="flex gap-2">
          {/* Land ID */}
          <div className="flex-1">
            <Select
              options={landOptions}
              value={landId}
              onChange={setLandId}
              placeholder={isLoading ? "Loading Lands..." : "Select Land ID"}
              isDisabled={isLoading || isError}
            />
          </div>

          {/* Type */}
          <div className="flex-1">
            <Select
              options={typeOptions}
              value={typeOptions.find((t) => t.value === type)}
              onChange={(selected) => {
                setType(selected.value);
                setAmountUnit({ amount: "", unit: null });
              }}
            />
          </div>

          {/* Amount + Unit */}
          <div className="flex-1 flex gap-2">
            <input
              type="number"
              placeholder="Amount"
              value={amountUnit.amount}
              onChange={(e) =>
                setAmountUnit((prev) => ({ ...prev, amount: e.target.value }))
              }
              className="p-2 border rounded w-1/2"
              min="0"
            />
            <Select
              options={unitOptions[type]}
              value={amountUnit.unit}
              onChange={(selected) =>
                setAmountUnit((prev) => ({ ...prev, unit: selected }))
              }
              placeholder="Unit"
              className="w-1/2"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mt-2"
        >
          {isPending ? "Saving..." : "Submit"}
        </button>
      </form>

      {/* Tasks Table */}
      <h3 className="text-lg font-semibold mb-2">Tasks</h3>
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks for selected date.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-100 text-left">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Task</th>
                <th className="p-2 border">Land</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Amount + Unit</th>
                <th className="p-2 border">Completed</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((t, index) => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="p-2 border">{index + 1}</td>
                  <td
                    className={`p-2 border ${
                      t.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {t.title}
                  </td>
                  <td className="p-2 border">{t.landName || t.landId}</td>
                  <td className="p-2 border">{t.type}</td>
                  <td className="p-2 border">{`${t.amount} ${t.unit}`}</td>
                  <td className="p-2 border text-center">
                    <input
                      type="checkbox"
                      checked={t.completed}
                      onChange={() => toggleTask(t)}
                      className="w-5 h-5 accent-green-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DailyToDoList;
