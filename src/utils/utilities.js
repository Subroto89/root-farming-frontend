import axios from "axios";
import Swal from "sweetalert2";
// import useAxiosSecure from "../hooks/useAxiosSecure";

export const imageUpload = async (imageFile) => {
  const imageFormData = new FormData();
  imageFormData.append("image", imageFile);

  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      imageFormData
    );
    return data?.data?.display_url;
  } catch (error) {
    console.error("Image upload failed:", error);
    // throw new Error("Image upload failed");
  }
};

export const saveUserToDatabase = async(userData) => {
  const {data} = await axios.post(`${import.meta.env.VITE_Server_API_KEY}/users/save-user`, userData);
  console.log(data)
};


  export const TabTitle = (newTitle) => {
    return document.title = newTitle;
  }

  export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};