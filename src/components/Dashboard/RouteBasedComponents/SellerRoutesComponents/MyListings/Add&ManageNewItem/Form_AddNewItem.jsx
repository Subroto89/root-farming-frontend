import { useEffect, useState } from "react";
import useAuth from "../../../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import InputField from "../../../../../shared/InputField/InputField";
import useAxiosSecure from "../../../../../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../../shared/LoadingSpinner";
import NavButton2 from "../../../../../shared/Buttons/NavButton2";
import { UploadCloud } from "lucide-react";
import { imageUpload } from "../../../../../../utils/utilities";
import { PuffLoader } from "react-spinners";
import Swal from "sweetalert2";

const Form_AddNewItem = ({handleModalToggle}) => {
  const {user} = useAuth()
 const {
    register,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();



  //--------------------------------------------------------------
  //  Necessary State Variables For Product Photo Upload
  // --------------------------------------------------------------
  const [uploadedProductPhoto, setUploadedProductPhoto] = useState(null);
  const [uploadingProductPhoto, setUploadingProductPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);

  //-------------------------------------------------------------------------
  //  Watching The Photo Input Field By productPhotoFile
  //--------------------------------------------------------------------------
  const productPhotoFile = watch("productPhoto");

  //-------------------------------------------------------------------------
  //   Medicine Photo Uploade Function - Depends on the medicinePhotoFile
  //--------------------------------------------------------------------------
  useEffect(() => {
    const uploadFile = async () => {
      if (productPhotoFile && productPhotoFile.length > 0) {
        setUploadedProductPhoto(null);
        setPhotoUploadError(null);
        setUploadingProductPhoto(true);
        try {
          const imageUrl = await imageUpload(productPhotoFile[0]);
          setUploadedProductPhoto(imageUrl);
        } catch (error) {
          console.error("Image upload failed:", error);
          setPhotoUploadError("Image upload failed. Please try again.");
          setUploadedProductPhoto(null);
        } finally {
          setUploadingProductPhoto(false);
        }
      }
    };
    uploadFile();
  }, [productPhotoFile]);

  const axiosSecure = useAxiosSecure();

  const {
    data: categories = [],
    fetch,
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/categories/get-categories");
      return data;
    },
  });

  const categoryOptions = categories.map((cat) => ({
    value: cat._id,
    label: cat.categoryName,
  }));

  const qualityOptions = [
    { value: "grade-A", label: "Grade-A" },
    { value: "grade-B", label: "Grade-B" },
    { value: "grade-C", label: "Grade-C" },
  ];
 


    //-------------------------------------------------------------------------
  //   Form Submition Function
  //--------------------------------------------------------------------------
  const onSubmit = async (data) => {
    
    data.productPhoto = uploadedProductPhoto;
    data.sellerDetails = {
      sellerId: user?.uid,
      sellerEmail: user?.email,
      sellerName: user?.displayName,
      sellerPhoto: user?.photoURL,
    };
    console.log(data)
    try{
         const { data: response } = await axiosSecure.post("/products/add-product", data);
    if (response.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product Added Successfully",
        timer: 1500,
      });
      handleModalToggle();
      // refetch();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something Wrong!",
        timer: 1500,
      });
    }
    }catch(error){
      console.log(error)
    }

 
  };



  // if (isSubmitting) return <LoadingSpinner />;



  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-5 gap-4 mt-4 px-[1rem]">
      
            {/* Left Column of the Form */}
            <div className="col-span-3">
              {/* Category Field ---------------------------------------  */}
              <InputField
                type="select"
                label="Category"
                name="category"
                placeholder={"Select category"}
                register={register}
                errors={errors}
                options={categoryOptions}
                validationRules={{
                  required: "Category is required",
                }}
              />

              {/* Product Name Field---------------------------------------------- */}
              <InputField
                type="text"
                label="Product Name"
                name="productName"
                placeholder={"Enter the product name"}
                register={register}
                errors={errors}
                validationRules={{
                  required: "Product name is required",
                  minLength: {
                    value: 3,
                    message: "Item name must be at least 3 characters long",
                  },
                }}
              />

              {/* Quality Field ---------------------------------------- */}
              <InputField
                type="select"
                label="Quality"
                name="quality"
                placeholder={"Select product quality"}
                register={register}
                errors={errors}
                options={qualityOptions}
                validationRules={{
                  required: "Quality is Required",
                }}
              />

              {/* Short Description Field -------------------------------- */}
              <InputField
                type="textarea"
                label="Short Description"
                name="shortDescription"
                placeholder={"Give short description of your product"}
                row={4}
                register={register}
                errors={errors}
                validationRules={{
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description should be minimum 10 characters",
                  },
                  maxLength: {
                    value: 200,
                    message: "Description should be maximum 200 characters",
                  },
                }}
              />
            </div>
            {/* Right Column of the Form */}
            <div className="col-span-2 flex flex-col justify-between gap-4">
              <div className="flex justify-center items-center">
                <div className="w-full h-[160px] flex justify-center items-center overflow-hidden mt-6 rounded-xl border border-gray-300">
                  {uploadedProductPhoto ? (
              <img
                src={uploadedProductPhoto}
                alt="User Photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center pr-3">
                {uploadingProductPhoto ? (
                  <PuffLoader size={80} />
                ) : (
                  <h2>Product Photo</h2>
                )}
              </div>
            )}
                </div>
              </div>

              {/* Photo Upload Button ------------------------------------------------ */}
              <div>
                <div className="mt-3">
                <InputField
                  type="file"
                  icon={UploadCloud}
                  name="productPhoto"
                  register={register}
                  errors={errors}
                  validationRules={{
                    required: "Product photo is required",
                    validate: (value) => {
                      if (value.length === 0) return "Please upload a photo";
                      const file = value[0];
                      const validTypes = [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                      ];
                      if (!validTypes.includes(file.type)) {
                        return "Only JPEG, PNG, and GIF files are allowed";
                      }
                      if (file.size > 2 * 1024 * 1024) {
                        return "File size must be less than 2MB";
                      }
                      return true;
                    },
                  }}
                />
              </div>

              <div className="flex justify-between items-center gap-4">
                <NavButton2 label="Clear Fields" status="danger" spread="yes" />
                <NavButton2 label="Add Item" status="success" spread="yes" type="submit"/>
                
              </div>
              </div>
            </div>
          
        </form>
      </div>
    </>
  );
};

export default Form_AddNewItem;
