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
}
