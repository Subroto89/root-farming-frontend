// manage existing listing 
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/UseAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Pencil } from "lucide-react";
import { useTheme } from "../../../hooks/useTheme";

const ManageExistingListing = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [editingProductId, setEditingProductId] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState("");

  const { theme } = useTheme();
  const backgroundThemeClass = theme === "dark" ? "bg-dark" : "bg-light";
  const foregroundThemeClass = theme === "dark" ? "fg-dark" : "fg-light";

  // ------------------ FETCH ALL PRODUCTS ------------------
  const { data: Products = [], isLoading } = useQuery({
    queryKey: ["myProducts", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/manage/manage-all-products?email=${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email, // only runs if email exists
  });

  // ------------------ UPDATE PRODUCT STOCK ------------------
  const updateStockMutation = useMutation({
    mutationFn: async ({ id, quantity }) =>
      axiosSecure.patch(`/manage/update-stock/${id}`, { quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries(["myProducts"]);
      toast.success("Stock updated successfully!");
      setEditingProductId(null);
      setUpdatedQuantity("");
    },
    onError: () => toast.error("Failed to update stock."),
  });

  // ------------------ TOGGLE ACCOUNT STATUS ------------------
  const toggleAccountStatusMutation = useMutation({
    mutationFn: async ({ id, accountStatus }) =>
      axiosSecure.patch(`/manage/update-account-status/${id}`, { accountStatus }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["myProducts"]);
      toast.success(`Product ${variables.accountStatus === "active" ? "activated" : "deactivated"} successfully!`);
    },
    onError: () => toast.error("Failed to update account status."),
  });

  if (isLoading) return <LoadingSpinner />;

  const sellerProducts = Products;

  return (
    <div className={`${backgroundThemeClass} p-6 min-h-screen`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Existing Listings</h2>
        <span className="text-sm text-gray-500">
          Total Products: {sellerProducts.length}
        </span>
      </div>

      {sellerProducts.length === 0 ? (
        <p className="text-gray-500 text-center py-6">
          You don’t have any products listed yet.
        </p>
      ) : (
        <div
          className={`${foregroundThemeClass} overflow-x-auto border rounded-xl shadow-sm`}
        >
          <table className="table">
            <thead className="bg-gray-100">
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Description</th>
                <th>Type</th>
                <th>Category</th>
                <th>Category Count</th>
                <th>Subcategory</th>
                <th>Subcategory Count</th>
                <th>Product Count</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Stock Status</th>
                <th>Account Status</th> 
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {sellerProducts.map((product) => (
                <tr key={product._id} className="hover">
                  {/* Product Photo */}
                  <td>
                    <img
                      src={product.productPhoto}
                      alt={product.shortDescription}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                  </td>

                  {/* Product Name */}
                  <td className="font-medium">{product.name}</td>

                  {/* Description */}
                  <td className="max-w-[250px] truncate">
                    {product.shortDescription}
                  </td>

                  {/* Product Type */}
                  <td>{product.type?.typeName}</td>

                  {/* Category & Count */}
                  <td>{product.category?.categoryName}</td>
                  <td>{product.category?.productCount}</td>

                  {/* Subcategory & Count */}
                  <td>{product.subCategory?.subCategoryName}</td>
                  <td>{product.subCategory?.productCount}</td>

                  {/* Variant & Count */}
                  <td>{product.variant?.productCount}</td>

                  {/* Price */}
                  <td>${product.price}</td>

                  {/* Quantity */}
                  <td>
                    {editingProductId === product._id ? (
                      <input
                        type="number"
                        className="border p-1 w-16 text-center rounded"
                        value={updatedQuantity}
                        onChange={(e) => setUpdatedQuantity(e.target.value)}
                      />
                    ) : (
                      product.quantity
                    )}
                  </td>

                  {/* Stock Status */}
                  <td className="px-5">
                    <span
                      className={`px-5 py-1 ${
                        product.productStatus === "In stock"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {product.productStatus}
                    </span>
                  </td>

                  {/*  Account Status Toggle Button */}
                  <td>
                    <button
                      onClick={() =>
                        toggleAccountStatusMutation.mutate({
                          id: product._id,
                          accountStatus:
                            product.accountStatus === "active"
                              ? "inactive"
                              : "active",
                        })
                      }
                      className={`btn btn-xs ${
                        product.accountStatus === "active"
                          ? "btn-success"
                          : "btn-error"
                      }`}
                    >
                      {product.accountStatus === "active"
                        ? "Active"
                        : "Inactive"}
                    </button>
                  </td>

                  {/* Action */}
                  <td>
                    {editingProductId === product._id ? (
                      <button
                        onClick={() =>
                          updateStockMutation.mutate({
                            id: product._id,
                            quantity: Number(updatedQuantity),
                          })
                        }
                        className="btn btn-sm btn-success"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingProductId(product._id);
                          setUpdatedQuantity(product.quantity);
                        }}
                        className="btn btn-sm btn-outline"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageExistingListing;
