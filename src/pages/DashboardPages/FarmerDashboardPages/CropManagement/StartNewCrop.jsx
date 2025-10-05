import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import InputField from "../../../../components/shared/InputField/InputField";
import LoadingPage from "../../../../components/shared/LoadingSpinner";

const unitOptions = [
    { value: "mg", label: "mg" },
    { value: "gm", label: "gm" },
    { value: "kg", label: "kg" },
];

export default function StartNewCrop() {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const farmerEmail = user?.email;

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
            amount: "",
            unit: null,
            price: "",
            discount: "",
            quality: "",
            type: "pieces",
            image: "",
        },
    });

    const selectedType = watch("type");

    // ✅ Fetch crops
    const { data: crops = [], isLoading } = useQuery({
        queryKey: ["crops", farmerEmail],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/crops?email=${farmerEmail}`);
            return res.data;
        },
        enabled: !!farmerEmail,
    });

    // ✅ Add crop mutation (with ImgBB)
    const addCropMutation = useMutation({
        mutationFn: async (formData) => {
            const imageFile = formData.image[0];
            const imgbbKey = import.meta.env.VITE_IMGBB_API_KEY;
            const imgForm = new FormData();
            imgForm.append("image", imageFile);

            const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, imgForm);
            const imageUrl = imgRes.data.data.url;

            const cropData = {
                ...formData,
                image: imageUrl,
                unit: formData.unit?.value || null,
                farmerEmail,
            };
            const res = await axios.post("http://localhost:3000/crops", cropData);
            return res.data;
        },
        onSuccess: (data) => {
            // ✅ Update React Query cache (no useState)
            queryClient.invalidateQueries(["crops", farmerEmail]);
            reset();
            setIsModalOpen(false);
            Swal.fire({
                icon: "success",
                title: "Crop Added",
                text: `Crop "${data.description}" added successfully!`,
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || "Failed to add crop",
            });
        },
    });

    const onSubmit = (data) => addCropMutation.mutate(data);

    // ✅ Show Loader before data fetching
     if (isLoading) return <LoadingPage />;

    return (
        <div className="p-4 max-w-7xl mx-auto bg-gray-50">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Crop Inventory Summary</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    + Add Crops
                </button>
            </div>

            {/* ✅ Table */}
             {crops && crops.length > 0 ? (
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-white">
                            <th className="border p-2">Image</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Amount</th>
                            <th className="border p-2">Unit</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Discount</th>
                            <th className="border p-2">Quality</th>
                        </tr>
                    </thead>
                    <tbody>
                        {crops?.map((crop) => (
                            <tr key={crop._id} className="bg-white">
                                <td className="border p-2">
                                    {crop?.image && (
                                        <img
                                            src={crop?.image}
                                            alt={crop?.name}
                                            className="w-16 h-16 object-cover"
                                        />
                                    )}
                                </td>
                                <td className="border p-2">{crop?.name}</td>
                                <td className="border p-2">{crop?.description}</td>
                                <td className="border p-2">{crop?.amount}</td>
                                <td className="border p-2">{crop?.unit || "—"}</td>
                                <td className="border p-2">{crop?.price}</td>
                                <td className="border p-2">{crop?.discount}</td>
                                <td className="border p-2">{crop?.quality}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No crops found.</p>
            )}

            {/* ✅ Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            ✕
                        </button>
                        <h3 className="text-lg font-bold mb-4">Add Crop</h3>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <InputField
                                name="name"
                                label="Name"
                                placeholder="Crop Name"
                                type="text"
                                register={register}
                                validationRules={{ required: "Name is required" }}
                                errors={errors}
                            />

                            <InputField
                                name="image"
                                label="Crop Image"
                                placeholder="Upload Image"
                                type="file"
                                register={register}
                                validationRules={{ required: "Image is required" }}
                                errors={errors}
                            />

                            <InputField
                                name="description"
                                label="Description"
                                placeholder="Description"
                                type="textarea"
                                rows={5}
                                register={register}
                                validationRules={{ required: "Description is required" }}
                                errors={errors}
                            />

                            <div>
                                <label className="block text-sm font-medium">Type</label>
                                <div className="flex items-center gap-4 mt-1">
                                    <label className="flex items-center gap-1">
                                        <input type="radio" value="weight" {...register("type")} />
                                        Weight
                                    </label>
                                    <label className="flex items-center gap-1">
                                        <input type="radio" value="pieces" {...register("type")} />
                                        Pieces
                                    </label>
                                </div>
                            </div>

                            <InputField
                                name="amount"
                                label="Amount"
                                placeholder="Amount"
                                type="number"
                                register={register}
                                validationRules={{ required: "Amount is required" }}
                                errors={errors}
                            />

                            {selectedType === "weight" && (
                                <div>
                                    <label className="block text-sm font-medium">Unit</label>
                                    <Controller
                                        name="unit"
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} options={unitOptions} placeholder="Select unit" />
                                        )}
                                    />
                                </div>
                            )}

                            <InputField
                                name="price"
                                label="Price"
                                placeholder="Price"
                                type="number"
                                register={register}
                                validationRules={{ required: "Price is required" }}
                                errors={errors}
                            />

                            <InputField
                                name="discount"
                                label="Discount"
                                placeholder="Discount"
                                type="number"
                                register={register}
                                errors={errors}
                            />

                            <InputField
                                name="quality"
                                label="Quality"
                                type="select"
                                placeholder="Select Quality"
                                options={[
                                    { value: "A", label: "A" },
                                    { value: "B", label: "B" },
                                    { value: "C", label: "C" },
                                ]}
                                register={register}
                                validationRules={{ required: "Quality is required" }}
                                errors={errors}
                            />

                            <div className="md:col-span-2">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Save Crop
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
