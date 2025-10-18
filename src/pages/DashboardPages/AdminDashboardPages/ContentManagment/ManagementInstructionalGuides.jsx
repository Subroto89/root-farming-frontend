import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Pencil, Trash2, FilePlus } from "lucide-react";
import InputField from "../../../../components/shared/InputField/InputField";
import LoadingPage from "../../../../components/shared/LoadingSpinner";
import useAxiosSecure from "../../../../hooks/UseAxiosSecure";

const ManagementInstructionalGuides = () => {
    const queryClient = useQueryClient();
    const [editGuide, setEditGuide] = useState(null);
    const [uploading, setUploading] = useState(false);
    const axiosSecure=useAxiosSecure()

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Fetch all guides
    const { data: guides = [], isLoading } = useQuery({
        queryKey: ["guides"],
        queryFn: async () => {
            const res = await axiosSecure.get("/api/guides");
            return res.data;
        },
    });

    // Mutation for Add/Update
    const mutation = useMutation({
        mutationFn: async (payload) => {
            if (payload._id) {
                await axiosSecure.put(`/api/guides/${payload?._id}`, payload);
            } else {
                await axiosSecure.post("/api/guides", payload);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["guides"]);
            Swal.fire({
                icon: "success",
                title: editGuide ? "Guide Updated!" : "Guide Added!",
                timer: 1300,
                showConfirmButton: false,
            });
            reset();
            setEditGuide(null);
        },
    });

    // Delete

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the guide.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/guides/${id}`);
                queryClient.invalidateQueries(["guides"]);
                Swal.fire({
                    title: "Deleted!",
                    text: "Guide has been removed.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (error) {
                Swal.fire("Error", "Failed to delete guide.", "error");
            }
        }
    };


    // IMGBB Upload
    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);
        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            );
            setUploading(false);
            return res.data.data.url;
        } catch (err) {
            setUploading(false);
            Swal.fire("Upload Failed", "Image could not be uploaded", "error");
            return null;
        }
    };

    // Submit form
    const onSubmit = async (data) => {
        let attachment = data.attachment;
        if (data.imageFile[0]) {
            const uploadedUrl = await handleImageUpload(data.imageFile[0]);
            if (uploadedUrl) attachment = uploadedUrl;
        }
        const payload = {
            title: data.title,
            description: data.description,
            role: data.role,
            attachment,
            _id: editGuide?._id,
        };
        mutation.mutate(payload);
    };

    if (isLoading) return  <LoadingPage />;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 border border-gray-300">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                        <FilePlus className="text-green-600" /> Manage Instructional Guides
                    </h2>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
                >
                    <InputField
                        name="title"
                        label="Guide Title"
                        type="text"
                        placeholder="Enter title"
                        register={register}
                        validationRules={{ required: "Title is required" }}
                        errors={errors}
                    />

                    <InputField
                        name="role"
                        label="Target Role"
                        type="select"
                        placeholder="Select Role"
                        options={[
                            { value: "Farmer", label: "Farmer" },
                            { value: "Seller", label: "Seller" },
                            { value: "Customer", label: "Customer" },
                            { value: "Specialist", label: "Agri-Specialist" },
                        ]}
                        register={register}
                        validationRules={{ required: "Role is required" }}
                        errors={errors}
                    />

                    <InputField
                        name="attachment"
                        label="Attachment Link"
                        type="text"
                        placeholder="Optional URL"
                        register={register}
                        validationRules={{}}
                        errors={errors}
                    />

                    <div>
                        <label className="block text-sm font-medium mb-1">Upload Image (optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("imageFile")}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                        {uploading && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
                    </div>

                    <div className="md:col-span-2">
                        <InputField
                            name="description"
                            label="Description"
                            type="textarea"
                            rows={4}
                            placeholder="Write the instructional content..."
                            register={register}
                            validationRules={{ required: "Description is required" }}
                            errors={errors}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition md:col-span-2"
                        disabled={uploading}
                    >
                        {editGuide ? "Update Guide" : "Add Guide"}
                    </button>
                </form>

                {/* LIST */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guides.map((g) => (
                        <div
                            key={g._id}
                            className="border border-gray-300 rounded-xl shadow-lg hover:shadow-lg transition bg-white p-5 flex flex-col justify-between"
                        >
                            {g.attachment && (
                                <img
                                    src={g.attachment}
                                    alt={g.title}
                                    className="rounded-lg mb-3 h-36 w-full object-cover"
                                />
                            )}
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800 mb-1">{g.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    {g.description?.slice(0, 90)}...
                                </p>
                                <span className="text-xs text-gray-500 font-medium">Role: {g.role}</span>
                            </div>
                            <div className="flex gap-3 mt-4 justify-end">
                                <button
                                    onClick={() => {
                                        reset(g);
                                        setEditGuide(g);
                                    }}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <Pencil size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(g._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManagementInstructionalGuides;
