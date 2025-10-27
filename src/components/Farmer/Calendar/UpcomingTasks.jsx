// -------------------------------------------
// UpcomingTasks Component
// Shows list of upcoming tasks in sidebar
// -------------------------------------------

import { format, addDays, isBefore } from "date-fns";

const UpcomingTasks = ({ assignments, onTaskClick }) => {
  const today = new Date();
  const nextWeek = addDays(today, 7);

  // Get upcoming tasks within the next 7 days
  const upcomingTasks = assignments
    ?.flatMap(assignment =>
      assignment.content.flatMap(phase =>
        phase.steps.map(step => {
          const taskDate = new Date(assignment.startDate);
          taskDate.setDate(taskDate.getDate() + phase.dayOffset);
          return {
            ...step,
            date: taskDate,
            phase: phase.phase,
            cultivationId: assignment.cultivationId,
          };
        })
      )
    )
    .filter(
      task =>
        isBefore(task.date, nextWeek) && // Within next 7 days
        !isBefore(task.date, today) // Not in the past
    )
    .sort((a, b) => a.date - b.date);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Upcoming Tasks</h3>
      <div className="space-y-3">
        {upcomingTasks?.map((task, idx) => (
          <div
            key={`${task.id}-${idx}`}
            onClick={() => onTaskClick(task)}
            className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            <div className="text-sm font-medium text-gray-900">{task.text}</div>
            <div className="text-xs text-gray-500 mt-1">
              {format(task.date, "MMM d")} • {task.phase}
            </div>
          </div>
        ))}

        {(!upcomingTasks || upcomingTasks.length === 0) && (
          <div className="text-sm text-gray-500 text-center py-4">
            No upcoming tasks this week
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingTasks;