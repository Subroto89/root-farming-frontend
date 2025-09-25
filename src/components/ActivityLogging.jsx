import React, { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import ActivitiesForDate from './ActivitiesForDate';
import AddActivityModal from './AddActivityModal';

const initialActivities = [
  {
    id: 1,
    title: 'Water tomato field',
    type: 'Irrigation',
    field: 'North Field A',
    date: new Date(),
    time: '08:00',
    status: 'completed',
    notes: 'Applied 2 inches of water',
    reminder: false
  },
  {
    id: 2,
    title: 'Apply fertilizer',
    type: 'Fertilization',
    field: 'South Field B',
    date: new Date(Date.now() + 86400000),
    time: '10:00',
    status: 'pending',
    reminder: true
  },
  {
    id: 3,
    title: 'Pest inspection',
    type: 'Monitoring',
    field: 'East Field C',
    date: new Date(Date.now() - 86400000),
    time: '14:00',
    status: 'overdue',
    reminder: true
  }
];


export default function ActivityLogging() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [activities, setActivities] = useState(initialActivities);

  const activityTypes = ['Sowing', 'Irrigation', 'Fertilization', 'Pest Control', 'Harvesting', 'Monitoring', 'Maintenance'];
  const fields = ['North Field A', 'South Field B', 'East Field C'];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getActivitiesForDate = (date) => {
    return activities.filter(activity => isSameDay(activity.date, date));
  };

  const toggleActivityStatus = (id) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'completed' ? 'pending' : 'completed' } : a));
  };

  const handleAddActivity = (newActivity) => {
    setActivities(prev => [...prev, newActivity]);
  };

  return (
    <div className="space-y-6 max-w-11/12 mx-auto my-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Activity Logging & Scheduling</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Activity
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Calendar className="h-6 w-6 text-green-600 mr-2" />
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {monthDays.map(day => {
              const dayActivities = getActivitiesForDate(day);
              const isSelected = isSameDay(day, selectedDate);
              const isTodayDate = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`p-2 text-sm rounded-lg transition-colors min-h-[60px] flex flex-col ${
                    isSelected
                      ? 'bg-green-600 text-white'
                      : isTodayDate
                      ? 'bg-blue-100 text-blue-800'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="font-medium">{format(day, 'd')}</span>
                  {dayActivities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {dayActivities.slice(0, 2).map(activity => (
                        <div
                          key={activity.id}
                          className={`w-2 h-2 rounded-full ${
                            activity.status === 'completed' ? 'bg-green-400' :
                            activity.status === 'overdue' ? 'bg-red-400' : 'bg-yellow-400'
                          }`}
                        />
                      ))}
                      {dayActivities.length > 2 && (
                        <span className="text-xs">+{dayActivities.length - 2}</span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <ActivitiesForDate selectedDate={selectedDate} activities={activities} onToggleStatus={toggleActivityStatus} />

      </div>

      
      <AddActivityModal
        show={showForm}
        onClose={() => setShowForm(false)}
        onAdd={handleAddActivity}
        selectedDate={selectedDate}
        activityTypes={activityTypes}
        fields={fields}
      />
    </div>
  );
}
