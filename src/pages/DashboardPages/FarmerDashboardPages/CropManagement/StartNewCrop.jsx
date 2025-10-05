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

    //  Fetch crops
    const { data: crops = [], isLoading } = useQuery({
        queryKey: ["crops", farmerEmail],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/crops?email=${farmerEmail}`);
            return res.data;
        },
        enabled: !!farmerEmail,
    });

    // Add crop mutation (with ImgBB)
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
            // Update React Query cache (no useState)
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

    // Show Loader before data fetching
    if (isLoading) return <LoadingPage />;

    return <div className="p-4">Start New Crop</div>;
}
