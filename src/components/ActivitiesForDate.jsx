import { Bell, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { format, isSameDay } from 'date-fns';

const getStatusColor = (status) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'overdue': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'completed': return CheckCircle;
    case 'pending': return Clock;
    case 'overdue': return AlertCircle;
    default: return Clock;
  }
};

export default function ActivitiesForDate({ selectedDate, activities = [], onToggleStatus }) {

  const activitiesForDate = activities.filter(act => isSameDay(act.date, selectedDate));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Activities for {format(selectedDate, 'MMM d, yyyy')}
      </h3>

      <div className="space-y-3">
        {activitiesForDate.map(activity => {
          const StatusIcon = getStatusIcon(activity.status);

          return (
            <div key={activity.id} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <StatusIcon className="h-4 w-4 mr-2 text-gray-600" />
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                  </div>

                  <p className="text-sm text-gray-600 mb-1">{activity.type} • {activity.field}</p>
                  <p className="text-sm text-gray-600">{activity.time}</p>

                  {activity.notes && (
                    <p className="text-sm text-gray-500 mt-2">{activity.notes}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {activity.reminder && (
                    <Bell className="h-4 w-4 text-yellow-500" />
                  )}

                  <button
                    onClick={() => onToggleStatus && onToggleStatus(activity.id)}
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}
                  >
                    {activity.status}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {activitiesForDate.length === 0 && (
          <p className="text-gray-500 text-center py-8">No activities scheduled for this date</p>
        )}
      </div>
    </div>
  );
}
