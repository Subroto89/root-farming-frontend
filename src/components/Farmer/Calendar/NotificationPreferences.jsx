import { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/UseAxiosSecure';

const NotificationPreferences = () => {
  const axiosSecure = useAxiosSecure();
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axiosSecure.get('/api/notification-preferences');
        setPreferences(response.data);
      } catch (error) {
        console.error('Error fetching preferences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [axiosSecure]);

  // Save preferences
  const savePreferences = async (updates) => {
    try {
      setSaving(true);
      const response = await axiosSecure.patch('/api/notification-preferences', updates);
      setPreferences(response.data);
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  // Reset preferences
  const resetPreferences = async () => {
    try {
      setSaving(true);
      const response = await axiosSecure.post('/api/notification-preferences/reset');
      setPreferences(response.data);
    } catch (error) {
      console.error('Error resetting preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-4">Loading preferences...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>

      {/* Main toggle */}
      <div className="mb-8">
        <label className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
          <span className="font-medium">Enable All Notifications</span>
          <input
            type="checkbox"
            checked={preferences?.enabled}
            onChange={(e) => savePreferences({ enabled: e.target.checked })}
            className="w-6 h-6 text-green-600 rounded focus:ring-green-500"
          />
        </label>
      </div>

      {preferences?.enabled && (
        <>
          {/* Task Notifications */}
          <section className="mb-8">
            <h3 className="text-lg font-medium mb-4">Task Notifications</h3>
            <div className="space-y-4 bg-white rounded-lg shadow p-4">
              <label className="flex items-center justify-between">
                <span>Due Today</span>
                <input
                  type="checkbox"
                  checked={preferences?.tasks?.dueToday}
                  onChange={(e) => 
                    savePreferences({ 
                      tasks: { ...preferences.tasks, dueToday: e.target.checked }
                    })
                  }
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
              </label>

              <label className="flex items-center justify-between">
                <span>Upcoming Tasks</span>
                <input
                  type="checkbox"
                  checked={preferences?.tasks?.upcoming}
                  onChange={(e) =>
                    savePreferences({
                      tasks: { ...preferences.tasks, upcoming: e.target.checked }
                    })
                  }
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
              </label>

              <label className="flex items-center justify-between">
                <span>Status Changes</span>
                <input
                  type="checkbox"
                  checked={preferences?.tasks?.statusChanges}
                  onChange={(e) =>
                    savePreferences({
                      tasks: { ...preferences.tasks, statusChanges: e.target.checked }
                    })
                  }
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
              </label>

              <div className="flex items-center justify-between">
                <span>Reminder Days Before Due</span>
                <select
                  value={preferences?.tasks?.reminderDays}
                  onChange={(e) =>
                    savePreferences({
                      tasks: { ...preferences.tasks, reminderDays: Number(e.target.value) }
                    })
                  }
                  className="w-20 p-2 border rounded"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map(days => (
                    <option key={days} value={days}>{days}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Cultivation Notifications */}
          <section className="mb-8">
            <h3 className="text-lg font-medium mb-4">Cultivation Notifications</h3>
            <div className="space-y-4 bg-white rounded-lg shadow p-4">
              <label className="flex items-center justify-between">
                <span>Phase Changes</span>
                <input
                  type="checkbox"
                  checked={preferences?.cultivation?.phaseChanges}
                  onChange={(e) =>
                    savePreferences({
                      cultivation: {
                        ...preferences.cultivation,
                        phaseChanges: e.target.checked
                      }
                    })
                  }
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
              </label>

              <label className="flex items-center justify-between">
                <span>Critical Alerts</span>
                <input
                  type="checkbox"
                  checked={preferences?.cultivation?.criticalAlerts}
                  onChange={(e) =>
                    savePreferences({
                      cultivation: {
                        ...preferences.cultivation,
                        criticalAlerts: e.target.checked
                      }
                    })
                  }
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
              </label>

              <label className="flex items-center justify-between">
                <span>Weekly Progress</span>
                <input
                  type="checkbox"
                  checked={preferences?.cultivation?.weeklyProgress}
                  onChange={(e) =>
                    savePreferences({
                      cultivation: {
                        ...preferences.cultivation,
                        weeklyProgress: e.target.checked
                      }
                    })
                  }
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
              </label>
            </div>
          </section>

          {/* Quiet Hours */}
          <section className="mb-8">
            <h3 className="text-lg font-medium mb-4">Quiet Hours</h3>
            <div className="space-y-4 bg-white rounded-lg shadow p-4">
              <label className="flex items-center justify-between">
                <span>Enable Quiet Hours</span>
                <input
                  type="checkbox"
                  checked={preferences?.quietHours?.enabled}
                  onChange={(e) =>
                    savePreferences({
                      quietHours: {
                        ...preferences.quietHours,
                        enabled: e.target.checked
                      }
                    })
                  }
                  className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                />
              </label>

              {preferences?.quietHours?.enabled && (
                <div className="flex gap-4">
                  <div>
                    <label className="block text-sm mb-1">Start Time</label>
                    <input
                      type="time"
                      value={preferences.quietHours.start}
                      onChange={(e) =>
                        savePreferences({
                          quietHours: {
                            ...preferences.quietHours,
                            start: e.target.value
                          }
                        })
                      }
                      className="p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">End Time</label>
                    <input
                      type="time"
                      value={preferences.quietHours.end}
                      onChange={(e) =>
                        savePreferences({
                          quietHours: {
                            ...preferences.quietHours,
                            end: e.target.value
                          }
                        })
                      }
                      className="p-2 border rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Reset Button */}
          <div className="flex justify-end">
            <button
              onClick={resetPreferences}
              disabled={saving}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
            >
              Reset to Default
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPreferences;