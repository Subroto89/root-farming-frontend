// -------------------------------------------
// TaskDayCell Component
// Individual day cell in calendar with tasks
// -------------------------------------------

import { format } from "date-fns";

const TaskDayCell = ({ date, tasks, isCurrentMonth, onDateClick, onTaskClick }) => {
  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div
      onClick={() => onDateClick(date, tasks)}
      className={`
        min-h-24 p-2 border border-gray-200 cursor-pointer
        ${isCurrentMonth ? "bg-white" : "bg-gray-50"}
        ${isToday ? "ring-2 ring-blue-500" : ""}
        hover:bg-gray-50
      `}
    >
      <div className="flex justify-between">
        <span
          className={`text-sm ${
            isCurrentMonth ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {format(date, "d")}
        </span>
        {isToday && (
          <span className="text-xs bg-blue-500 text-white px-1.5 rounded-full">
            Today
          </span>
        )}
      </div>

      {/* Task indicators */}
      <div className="mt-2 space-y-1">
        {tasks.map((task, idx) => (
          <div
            key={`${task.id}-${idx}`}
            onClick={(e) => {
              e.stopPropagation();
              onTaskClick(task);
            }}
            className="text-xs p-1 rounded bg-blue-100 text-blue-700 cursor-pointer truncate hover:bg-blue-200"
          >
            {task.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskDayCell;