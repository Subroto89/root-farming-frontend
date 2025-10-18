import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import InputField from '../../shared/InputField/InputField';
import ImageUploader from '../../shared/ImageUploader';

const GovtNewsForm = ({ onSuccess, defaultValues = null }) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imageUrl, setImageUrl] = useState('');

  // SweetAlert2 Toast setup
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        title: defaultValues.title,
        description: defaultValues.description,
        category: defaultValues.category,
        publishedDate: defaultValues.publishedDate,
        start: defaultValues.start ? defaultValues.start.slice(0, 16) : '',
        end: defaultValues.end ? defaultValues.end.slice(0, 16) : '',
      });
      setImageUrl(defaultValues.image || '');
    }
  }, [defaultValues, reset]);

  const mutation = useMutation({
    mutationFn: async data => {
      const payload = {
        ...data,
        image: imageUrl,
        start: data.start,
        end: data.end,
      };

      if (defaultValues?._id) {
        await axiosSecure.put(`/govt-news/${defaultValues._id}`, payload);
      } else {
        await axiosSecure.post('/govt-news', payload);
      }
    },
    onSuccess: () => {
      Toast.fire({
        icon: 'success',
        title: defaultValues ? 'News updated!' : 'News added!',
      });
      reset();
      setImageUrl('');
      onSuccess();
    },
    onError: () => {
      Toast.fire({
        icon: 'error',
        title: 'Operation failed!',
      });
    },
  });

  const onSubmit = data => {
    if (!imageUrl) {
      Toast.fire({
        icon: 'error',
        title: 'Upload an image first!',
      });
      return;
    }
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 bg-white p-6 rounded-xl shadow-md border border-gray-100"
    >
      <InputField
        name="title"
        label="Title"
        placeholder="Enter news title"
        register={register}
        validationRules={{ required: 'Title required' }}
        errors={errors}
      />

      <div className="flex justify-center">
        <ImageUploader onUpload={setImageUrl} />
      </div>

      <InputField
        name="description"
        label="Description"
        type="textarea"
        placeholder="Enter description"
        register={register}
        validationRules={{ required: 'Description required' }}
        errors={errors}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          name="category"
          label="Category"
          type="select"
          placeholder="Select category"
          options={[
            { value: 'Govt News', label: 'Govt News' },
            { value: 'Facilities', label: 'Facilities' },
          ]}
          register={register}
          validationRules={{ required: 'Category required' }}
          errors={errors}
        />

        <InputField
          name="publishedDate"
          label="Published Date"
          type="date"
          register={register}
          validationRules={{ required: 'Published date required' }}
          errors={errors}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          name="start"
          label="Start Date & Time"
          type="datetime-local"
          register={register}
          validationRules={{ required: 'Start date & time required' }}
          errors={errors}
        />
        <InputField
          name="end"
          label="End Date & Time"
          type="datetime-local"
          register={register}
          validationRules={{ required: 'End date & time required' }}
          errors={errors}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow hover:bg-green-700 transition-all duration-300"
      >
        {defaultValues ? 'Update News' : 'Add News'}
      </button>
    </form>
  );
};

export default GovtNewsForm;
