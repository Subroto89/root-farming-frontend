//product moderation
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ModalFormat from "../../../components/shared/ModalFormat";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "../../../hooks/useTheme";
import Container from "../../../components/shared/Container";

const ProductManage = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { theme } = useTheme();
  const themeBackgroundStyle = theme === 'dark' ? "bg-dark" : "bg-light";
  const themeForegroundStyle = theme === 'dark' ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle = theme === 'dark' ? "fg-of-fg-dark" : "fg-of-fg-light"

  // Fetch all products for admin
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["allProductsAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manage/manage-all-products");
      return res.data;
    },
  });

  // Mutation for approving a product
  const approveMutation = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.patch(`/manage/approve/${id}`, { isApproved: true }),
    onSuccess: () => {
      queryClient.invalidateQueries(["allProductsAdmin"]);
      toast.success("Product approved successfully!");
    },
    onError: () => toast.error("Failed to approve product."),
  });

    //  Reject product mutation
   const rejectMutation = useMutation({
    mutationFn: async (id) =>
      await axiosSecure.patch(`/manage/reject/${id}`, { approvedStatus: "rejected" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["allProductsAdmin"]);
      toast.success("Product rejected!");
    },
    onError: () => toast.error("Failed to reject product."),
  });

  // Approve button click handler
  const handleApprove = (id) => { approveMutation.mutate(id)};
  // Reject button click handler
  const handleReject = (id) => rejectMutation.mutate(id);

  // Modal close handler
  const closeModal = () => setSelectedProduct(null);

  if (isLoading) return  <LoadingSpinner />;

  return (
    <div className={`${themeBackgroundStyle} min-h-screen `}>
      <Toaster/>
      <Container>
        <h2 className="text-2xl font-semibold mb-5">Manage All Products</h2>


        {/* Product Table */}
        <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-md">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Photo</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Approval</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className="border-t border-gray-300 hover:bg-gray-600 transition-all"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={product.productPhoto}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md border border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">
                    {product.variant?.variantName || "N/A"}
                  </td>
                  <td className="px-4 py-3">{product.category?.categoryName}</td>
                  <td className="px-4 py-3">${product.price}</td>

                  <td
                    className={`px-4 py-3 font-semibold ${
                      product.productStatus === "Out of stock"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {product.productStatus}
                  </td>

                  <td className="px-4 py-3">
                    {product?.isApproved ? (
                      <span className="text-green-600 font-medium">Approved</span>
                    ) : product?.approvedStatus === "rejected" ? (
                      <span className="text-red-600 font-medium">Rejected</span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(product?._id)}
                          className="text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700 flex items-center gap-1"
                        >
                          <CheckCircle size={16} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(product?._id)}
                          className="text-white bg-red-600 px-3 py-1 rounded-md hover:bg-red-700 flex items-center gap-1"
                        >
                          <XCircle size={16} />
                          Reject
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        {/* Product Details Modal */}
        {selectedProduct && (
          <ModalFormat
            width="w-[60%]"
            height="h-auto"
            headerText="Product Details"
            modalClosingFunction={closeModal}
            form={
              <div className="p-4  space-y-3 max-h-[70vh] overflow-y-auto">
                <img
                  src={selectedProduct.productPhoto}
                  alt={selectedProduct.name}
                  className="object-cover rounded-lg w-full max-h-72"
                />

                <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>

                <div className="grid grid-cols-2 gap-3">
                  <p><span className="font-medium">Quality:</span> {selectedProduct.quality}</p>
                  <p><span className="font-medium">Unit:</span> {selectedProduct.unit}</p>
                  <p><span className="font-medium">Price:</span> ${selectedProduct.price}</p>
                  <p><span className="font-medium">Quantity:</span> {selectedProduct.quantity}</p>
                  <p><span className="font-medium">Product Status:</span> {selectedProduct.productStatus}</p>
                  <p><span className="font-medium">Account Status:</span> {selectedProduct.accountStatus}</p>
                  <p><span className="font-medium">Approval:</span> {selectedProduct.isApproved ? "Approved" : "Pending"}</p>
                  <p><span className="font-medium">Rating:</span> {selectedProduct.rating}</p>
                  <p><span className="font-medium">Review Count:</span> {selectedProduct.reviewCount}</p>
                  <p><span className="font-medium">Sold Amount:</span> {selectedProduct.soldAmount}</p>
                </div>

                <p>
                  <span className="font-medium">Short Description:</span>{" "}
                  {selectedProduct.shortDescription}
                </p>

                <hr className="my-2" />

                {/* Seller Info */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Seller Information</h4>
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedProduct.sellerDetails?.sellerPhoto}
                      alt={selectedProduct.sellerDetails?.sellerName}
                      className="w-14 h-14 rounded-full border"
                    />
                    <div>
                      <p><span className="font-medium">Name:</span> {selectedProduct.sellerDetails?.sellerName}</p>
                      <p><span className="font-medium">Email:</span> {selectedProduct.sellerDetails?.sellerEmail}</p>
                    </div>
                  </div>
                </div>

                <hr className="my-2" />

                {/* Type, Category, SubCategory, Variant */}
                <div>
                  <h4 className="font-semibold text-lg mb-2">Product Classification</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Type */}
                    <div className="border p-2 rounded-md">
                      <img
                        src={selectedProduct.type?.typePhoto}
                        alt="Type"
                        className="w-16 h-16 object-cover rounded-md mb-1"
                      />
                      <p><span className="font-medium">Type:</span> {selectedProduct.type?.typeName}</p>
                      <p><span className="font-medium">Status:</span> {selectedProduct.type?.status}</p>
                    </div>

                    {/* Category */}
                    <div className="border p-2 rounded-md">
                      <img
                        src={selectedProduct.category?.categoryPhoto}
                        alt="Category"
                        className="w-16 h-16 object-cover rounded-md mb-1"
                      />
                      <p><span className="font-medium">Category:</span> {selectedProduct.category?.categoryName}</p>
                      <p><span className="font-medium">Status:</span> {selectedProduct.category?.status}</p>
                    </div>

                    {/* SubCategory */}
                    <div className="border p-2 rounded-md">
                      <img
                        src={selectedProduct.subCategory?.subCategoryPhoto}
                        alt="SubCategory"
                        className="w-16 h-16 object-cover rounded-md mb-1"
                      />
                      <p><span className="font-medium">Sub-Category:</span> {selectedProduct.subCategory?.subCategoryName}</p>
                      <p><span className="font-medium">Status:</span> {selectedProduct.subCategory?.status}</p>
                    </div>

                    {/* Variant */}
                    <div className="border p-2 rounded-md">
                      <img
                        src={selectedProduct.variant?.variantPhoto}
                        alt="Variant"
                        className="w-16 h-16 object-cover rounded-md mb-1"
                      />
                      <p><span className="font-medium">Variant:</span> {selectedProduct.variant?.variantName}</p>
                      <p><span className="font-medium">Status:</span> {selectedProduct.variant?.variantStatus}</p>
                    </div>
                  </div>
                </div>

                <hr className="my-2" />

                <p><span className="font-medium">Created At:</span> {new Date(selectedProduct.createdAt).toLocaleString()}</p>
                <p><span className="font-medium">Updated At:</span> {new Date(selectedProduct.updatedAt).toLocaleString()}</p>
              </div>
            }
          />
        )}

      </Container>
    </div>
  );
};

export default ProductManage;

