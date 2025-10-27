// -------------------------------------------
// MonthlyCalendar Component
// Calendar grid showing tasks for each day
// -------------------------------------------

import { startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, format } from "date-fns";
import TaskDayCell from "./TaskDayCell";

const MonthlyCalendar = ({ currentDate, assignments, onDateClick, onTaskClick }) => {
  // Get all days in current month
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get tasks for each day
  const getTasksForDay = (date) => {
    if (!assignments) return [];
    
    return assignments.flatMap(assignment => 
      assignment.content.flatMap(phase => 
        phase.steps.filter(step => {
          const taskDate = new Date(assignment.startDate);
          taskDate.setDate(taskDate.getDate() + phase.dayOffset);
          return isSameDay(date, taskDate);
        }).map(step => ({
          ...step,
          phase: phase.phase,
          cultivationId: assignment.cultivationId
        }))
      )
    );
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Weekday headers */}
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
        <div
          key={day}
          className="p-2 text-center text-sm font-medium text-gray-600"
        >
          {day}
        </div>
      ))}

      {/* Calendar days */}
      {days.map(date => {
        const dayTasks = getTasksForDay(date);
        return (
          <TaskDayCell
            key={date.toISOString()}
            date={date}
            tasks={dayTasks}
            isCurrentMonth={isSameMonth(date, currentDate)}
            onDateClick={onDateClick}
            onTaskClick={onTaskClick}
          />
        );
      })}
    </div>
  );
};

export default MonthlyCalendar;