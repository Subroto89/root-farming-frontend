import { useTheme } from "../../hooks/useTheme";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const PartnerShipModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle =
    theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

  const axiosSecure = useAxiosSecure();

  if (!isOpen) return null;

  const handlePartnerAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const partnersData = Object.fromEntries(formData.entries());

    try {
      const { data } = await axiosSecure.post(
        "http://localhost:3000/becomePartners",
        partnersData
      );

      if (data?.insertedId) {
        onClose();
        Swal.fire({
          title: "Form Submitted",
          icon: "success",
          draggable: true,
        });
      }
      form.reset();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error submitting form",
        icon: "error",
      });
    }
  };

  return (
    <dialog
      id="my_modal_4"
      className={`modal ${isOpen ? "modal-open" : ""} mt-5`}
    >
      <div className={`${themeForegroundStyle} modal-box  max-w-2xl`}>
        <h3 className="font-bold text-2xl text-green-500 mb-4">
          Apply for Partnership
        </h3>

        <form onSubmit={handlePartnerAdd} className="space-y-4">
          {/* Full Name / Organization Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium mb-1">
                Full Name / Organization Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Type Your Full Name"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Type Your Email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Website / Portfolio */}
            <div>
              <label className="block font-medium mb-1">
                Website / Portfolio (Optional)
              </label>
              <input
                type="url"
                name="website"
                placeholder="Enter Your website"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Country / Region */}
            <div>
              <label className="block font-medium mb-1">Country / Region</label>
              <input
                type="text"
                name="country"
                placeholder="Type Your Country"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Partnership Type */}
            <div>
              <label className="block font-medium mb-1">Partnership Type</label>
              <select
                name="partnershipType"
                className={`${themeFgOfFgStyle} w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              >
                <option value="">Select a type</option>
                <option value="Technology Partner">Technology Partner</option>
                <option value="Research Partner">Research Partner</option>
                <option value="Sustainability Partner">
                  Sustainability Partner
                </option>
                <option value="Community Partner">Community Partner</option>
              </select>
            </div>
            {/* Upload Photo */}
            <div>
              <label className="block font-medium mb-1">Upload Logo</label>

              <input
                type="text"
                name="photo"
                placeholder="Your Photo Link"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Brief Description */}
          <div>
            <label className="block font-medium mb-1">Brief Description</label>
            <textarea
              name="description"
              rows="3"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Share your goals, expertise, and what you aim to achieve..."
              required
            />
          </div>
          {/* Agreement */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              className="mr-2"
              required
            />
            <label htmlFor="agree" className="cursor-pointer text-black/150">
              I have read and agree to the Partnership <a className="hover:underline  font-semibold" target="_blank" href="https://docs.google.com/document/d/1-WuqQc-7C38YRggcXVPBQA7oUIBi9OdnWthofsOqb3s/edit?usp=sharing">Terms & Conditions</a>
            </label>
          </div>

          {/* Submit */}
          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn">
              Cancel
            </button>
            <button type="submit" className="btn bg-green-600 text-white">
              Submit
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default PartnerShipModal;
