// AddActivityModal.jsx
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const defaultTypes = [
    "Sowing",
    "Irrigation",
    "Fertilization",
    "Pest Control",
    "Harvesting",
    "Monitoring",
    "Maintenance",
];
const defaultFields = ["North Field A", "South Field B", "East Field C"];

export default function AddActivityModal({
    show = false,
    onClose = () => { },
    onAdd = () => { },
    selectedDate = new Date(),
    activityTypes = defaultTypes,
    fields = defaultFields,
}) {
    const initialForm = {
        title: "",
        type: "",
        field: "",
        date: format(selectedDate, "yyyy-MM-dd"),
        time: "",
        notes: "",
        reminder: false,
    };

    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            date: format(selectedDate, "yyyy-MM-dd"),
        }));
    }, [selectedDate, show]);

    const reset = () => setFormData(initialForm);

    const handleCancel = () => {
        reset();
        onClose();
    };

    const handleSubmit = async (e) => {
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

        try {
            const response = await fetch("http://localhost:3000/activities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newActivity),
            });

            const data = await response.json();
            console.log("Server response:", data);

            if (data.success) {
                onAdd(newActivity);
                alert("New Activity Added Successfully");
                reset();
                onClose();
            }
        } catch (error) {
            console.error("Error submitting activity:", error);
        }
    };

    return (
        <div className={`modal ${show ? "modal-open" : ""}`}>
            <div className="modal-box w-full max-w-md">
                <h3 className="font-bold text-lg">Add New Activity</h3>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
                            {activityTypes.map((t) => (
                                <option key={t} value={t}>
                                    {t}
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
                            {fields.map((f) => (
                                <option key={f} value={f}>
                                    {f}
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
                        <label htmlFor="reminder" className="ml-2 text-sm text-gray-700">
                            Set reminder notification
                        </label>
                    </div>

                    <div className="modal-action justify-end pt-2">
                        <button type="button" className="btn" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Add Activity
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
