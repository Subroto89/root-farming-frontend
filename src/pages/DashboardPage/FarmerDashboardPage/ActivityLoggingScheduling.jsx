import React, { useState } from "react";
import {
  Calendar,
  Plus,
  Clock,
  Bell,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
} from "date-fns";

const ActivityLoggingScheduling = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Water tomato field",
      type: "Irrigation",
      field: "North Field A",
      date: new Date(),
      time: "08:00",
      status: "completed",
      notes: "Applied 2 inches of water",
      reminder: false,
    },
    {
      id: 2,
      title: "Apply fertilizer",
      type: "Fertilization",
      field: "South Field B",
      date: new Date(Date.now() + 86400000),
      time: "10:00",
      status: "pending",
      reminder: true,
    },
    {
      id: 3,
      title: "Pest inspection",
      type: "Monitoring",
      field: "East Field C",
      date: new Date(Date.now() - 86400000),
      time: "14:00",
      status: "overdue",
      reminder: true,
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    field: "",
    date: format(selectedDate, "yyyy-MM-dd"),
    time: "",
    notes: "",
    reminder: false,
  });

  const activityTypes = [
    "Sowing",
    "Irrigation",
    "Fertilization",
    "Pest Control",
    "Harvesting",
    "Monitoring",
    "Maintenance",
  ];
  const fields = ["North Field A", "South Field B", "East Field C"];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getActivitiesForDate = (date) => {
    return activities.filter((activity) => isSameDay(activity.date, date));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "pending":
        return Clock;
      case "overdue":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newActivity = {
      id: Date.now(),
      title: formData.title,
      type: formData.type,
      field: formData.field,
      date: new Date(formData.date),
      time: formData.time,
      status: "pending",
      notes: formData.notes,
      reminder: formData.reminder,
    };

    console.log(newActivity);

    setActivities([...activities, newActivity]);
    setFormData({
      title: "",
      type: "",
      field: "",
      date: format(selectedDate, "yyyy-MM-dd"),
      time: "",
      notes: "",
      reminder: false,
    });
    setShowForm(false);
  };

  const toggleActivityStatus = (id) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id
          ? {
              ...activity,
              status: activity.status === "completed" ? "pending" : "completed",
            }
          : activity
      )
    );
  };

  return (
    <div className="space-y-6 max-w-11/12 mx-auto my-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          Activity Logging & Scheduling
        </h1>
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
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setCurrentDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() - 1
                    )
                  )
                }
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
                onClick={() =>
                  setCurrentDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth() + 1
                    )
                  )
                }
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-medium text-gray-600"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((day) => {
              const dayActivities = getActivitiesForDate(day);
              const isSelected = isSameDay(day, selectedDate);
              const isTodayDate = isToday(day);

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`p-2 text-sm rounded-lg transition-colors min-h-[60px] flex flex-col ${
                    isSelected
                      ? "bg-green-600 text-white"
                      : isTodayDate
                      ? "bg-blue-100 text-blue-800"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span className="font-medium">{format(day, "d")}</span>
                  {dayActivities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {dayActivities.slice(0, 2).map((activity) => (
                        <div
                          key={activity.id}
                          className={`w-2 h-2 rounded-full ${
                            activity.status === "completed"
                              ? "bg-green-400"
                              : activity.status === "overdue"
                              ? "bg-red-400"
                              : "bg-yellow-400"
                          }`}
                        />
                      ))}
                      {dayActivities.length > 2 && (
                        <span className="text-xs">
                          +{dayActivities.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Activities for Selected Date */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Activities for {format(selectedDate, "MMM d, yyyy")}
          </h3>

          <div className="space-y-3">
            {getActivitiesForDate(selectedDate).map((activity) => {
              const StatusIcon = getStatusIcon(activity.status);
              return (
                <div
                  key={activity.id}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <StatusIcon className="h-4 w-4 mr-2 text-gray-600" />
                        <h4 className="font-medium text-gray-900">
                          {activity.title}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {activity.type} • {activity.field}
                      </p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                      {activity.notes && (
                        <p className="text-sm text-gray-500 mt-2">
                          {activity.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {activity.reminder && (
                        <Bell className="h-4 w-4 text-yellow-500" />
                      )}
                      <button
                        onClick={() => toggleActivityStatus(activity.id)}
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          activity.status
                        )}`}
                      >
                        {activity.status}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {getActivitiesForDate(selectedDate).length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No activities scheduled for this date
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Add Activity Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Add New Activity
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select type</option>
                  {activityTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field
                </label>
                <select
                  value={formData.field}
                  onChange={(e) =>
                    setFormData({ ...formData, field: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select field</option>
                  {fields.map((field) => (
                    <option key={field} value={field}>
                      {field}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="reminder"
                  checked={formData.reminder}
                  onChange={(e) =>
                    setFormData({ ...formData, reminder: e.target.checked })
                  }
                  className="h-4 w-4 text-green-600 rounded focus:ring-green-500"
                />
                <label
                  htmlFor="reminder"
                  className="ml-2 text-sm text-gray-700"
                >
                  Set reminder notification
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityLoggingScheduling;
