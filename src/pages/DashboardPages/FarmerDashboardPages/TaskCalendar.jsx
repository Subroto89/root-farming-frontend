// -------------------------------------------
// TaskCalendar - Farmer Dashboard
// Shows calendar view of cultivation tasks
// -------------------------------------------

import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import MonthlyCalendar from "../../../components/Farmer/Calendar/MonthlyCalendar";
import TaskDetails from "../../../components/Farmer/Calendar/TaskDetails";
import UpcomingTasks from "../../../components/Farmer/Calendar/UpcomingTasks";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import { useAuth } from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";

const TaskCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch farmer's assigned instructions and tasks
  const { data: assignments, isLoading } = useQuery({
    queryKey: ["farmerAssignments", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/farmers/${user?.email}/assignments`);
      return response.data;
    }
  });

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  
  const handleDateClick = (date, tasks) => {
    setSelectedDate(date);
    if (tasks?.length === 1) {
      setSelectedTask(tasks[0]);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseTask = () => {
    setSelectedTask(null);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Task Calendar</h1>
        <p className="text-gray-600">View and manage your cultivation tasks</p>
      </div>

      <div className="flex gap-6">
        {/* Main Calendar */}
        <div className="flex-grow bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handlePrevMonth}
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                Today
              </button>
              <button
                onClick={handleNextMonth}
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                →
              </button>
            </div>
          </div>

          <MonthlyCalendar
            currentDate={currentDate}
            assignments={assignments}
            onDateClick={handleDateClick}
            onTaskClick={handleTaskClick}
          />
        </div>

        {/* Upcoming Tasks Sidebar */}
        <div className="w-80 bg-white rounded-lg shadow-md p-4">
          <UpcomingTasks
            assignments={assignments}
            onTaskClick={handleTaskClick}
          />
        </div>
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={handleCloseTask}
        />
      )}
    </div>
  );
};

export default TaskCalendar;