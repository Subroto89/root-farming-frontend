import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/UseAxiosSecure';
import InputField from '../../shared/InputField/InputField';
import ImageUploader from '../../shared/ImageUploader';

const BlogForm = ({ onSuccess, defaultValues = null }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // State for image and tags input
  const [imageUrl, setImageUrl] = useState(defaultValues?.image || '');
  const [tagsInput, setTagsInput] = useState(
    defaultValues?.tags ? defaultValues.tags.join(', ') : ''
  );

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || {
      title: '',
      author: '',
      category: '',
      content: '',
      image: '',
      tags: [],
    },
  });

  // Update image and tags when defaultValues change (for edit)
  useEffect(() => {
    if (defaultValues) {
      setImageUrl(defaultValues.image || '');
      setTagsInput(defaultValues.tags?.join(', ') || '');
      reset({
        ...defaultValues,
        tags: defaultValues.tags || [],
      });
    }
  }, [defaultValues, reset]);

  // Mutation for create/update
  const mutation = useMutation({
    mutationFn: async data => {
      // Prepare payload: exclude _id
      const { _id, ...payload } = data;

      if (defaultValues?._id) {
        const res = await axiosSecure.put(
          `/blogs/${defaultValues._id}`,
          payload
        );
        return res.data;
      } else {
        const res = await axiosSecure.post('/blogs', payload);
        return res.data;
      }
    },
    onSuccess: () => {
      reset();
      setImageUrl('');
      setTagsInput('');
      queryClient.invalidateQueries(['blogs']);
      if (onSuccess) onSuccess();
    },
    onError: () => {
      Swal.fire('Error', 'Something went wrong!', 'error');
    },
  });

  // Form submit handler
  const onSubmit = formData => {
    // Convert tags string to array
    const tagsArray = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const payload = { ...formData, image: imageUrl, tags: tagsArray };
    mutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField
        name="title"
        label="Title"
        type="text"
        placeholder="Enter blog title"
        register={register}
        errors={errors}
        validationRules={{ required: 'Title is required' }}
      />

      <InputField
        name="author"
        label="Author"
        type="text"
        placeholder="Enter author name"
        register={register}
        errors={errors}
        validationRules={{ required: 'Author name is required' }}
      />

      <InputField
        name="category"
        label="Category"
        type="select"
        options={[
          { value: 'Sustainable Farming', label: 'Sustainable Farming' },
          { value: 'Pest Control', label: 'Pest Control' },
          { value: 'Water Management', label: 'Water Management' },
          { value: 'Soil Management', label: 'Soil Management' },
          { value: 'Climate Change', label: 'Climate Change' },
          { value: 'Technology', label: 'Technology' },
          { value: 'Crop Management', label: 'Crop Management' },
        ]}
        placeholder="Select category"
        register={register}
        errors={errors}
        validationRules={{ required: 'Category is required' }}
      />

      <InputField
        name="content"
        label="Content"
        type="textarea"
        placeholder="Write your blog content..."
        rows={5}
        register={register}
        errors={errors}
        validationRules={{ required: 'Content is required' }}
      />

      <label className="block text-gray-700">
        Tags (comma separated)
        <input
          type="text"
          value={tagsInput}
          onChange={e => setTagsInput(e.target.value)}
          placeholder="e.g. Organic, Soil Health, Crop Rotation"
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </label>

      <ImageUploader onUpload={setImageUrl} />
      {imageUrl && (
        <p className="text-sm text-gray-600">
          <strong>Image Uploaded:</strong> {imageUrl}
        </p>
      )}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {mutation.isPending
          ? defaultValues
            ? 'Updating...'
            : 'Publishing...'
          : defaultValues
          ? 'Update Blog'
          : 'Publish Blog'}
      </button>
    </form>
  );
};

export default BlogForm;
