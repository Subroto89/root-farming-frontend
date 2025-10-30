import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../../hooks/UseAxiosSecure";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import toast from "react-hot-toast";
import ModalFormat from "../../../../components/shared/ModalFormat";
import { useTheme } from "../../../../hooks/useTheme";
import Container from "../../../../components/shared/Container";

const ManagePaymentSetting = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { theme } = useTheme();

  const themeBackgroundStyle = theme === "dark" ? "bg-dark" : "bg-light";
  const themeForegroundStyle = theme === "dark" ? "fg-dark" : "fg-light";
  const themeFgOfFgStyle =
    theme === "dark" ? "fg-of-fg-dark" : "fg-of-fg-light";

  // ------------------ FETCH ALL BANK ACCOUNTS ------------------
  const { data: bankAccounts = [], isLoading } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payment-setting/bank-accounts");
      return res.data;
    },
  });

  // ------------------ ADD A NEW BANK ACCOUNT ------------------
  const addAccountMutation = useMutation({
    mutationFn: async (newAccount) => {
      await axiosSecure.post("/payment-setting/bank-accounts", newAccount);
    },
    onSuccess: () => {
      toast.success("New bank account added successfully!");
      queryClient.invalidateQueries(["bankAccounts"]);
      reset();
      setIsModalOpen(false);
    },
    onError: () => toast.error("Failed to add bank account."),
  });

  // ------------------ DELETE BANK ACCOUNT ------------------
  const deleteAccountMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/payment-setting/bank-accounts/${id}`);
    },
    onSuccess: () => {
      toast.success("Bank account deleted successfully!");
      queryClient.invalidateQueries(["bankAccounts"]);
    },
    onError: () => toast.error("Failed to delete bank account."),
  });

  // ------------------ TOGGLE ACTIVE/INACTIVE ------------------
  const toggleStatusMutation = useMutation({
    mutationFn: async (account) => {
      await axiosSecure.patch(`/payment-setting/bank-accounts/${account._id}`, {
        isActive: !account.isActive,
      });
    },
    onSuccess: () => {
      toast.success("Account status updated!");
      queryClient.invalidateQueries(["bankAccounts"]);
    },
    onError: () => toast.error("Failed to update status."),
  });

  // ------------------ HANDLE FORM SUBMIT ------------------
  const onSubmit = (data) => {
    addAccountMutation.mutate(data);
  };

  if (isLoading) return <LoadingSpinner />;

  // ------------------ ADD ACCOUNT MODAL ------------------
  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      {[
        {
          label: "Account Holder Name",
          name: "holderName",
          placeholder: "Enter account holder name",
        },
        {
          label: "Branch Name",
          name: "branchName",
          placeholder: "Enter branch name",
        },
        {
          label: "Router ID",
          name: "routerId",
          placeholder: "Enter router ID",
        },
        {
          label: "Account Number",
          name: "accountNumber",
          placeholder: "Enter account number",
        },
      ].map((field) => (
        <div key={field.name}>
          <label className="block mb-1 font-medium">{field.label}</label>
          <input
            {...register(field.name, { required: true })}
            placeholder={field.placeholder}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  );

  return (
    <div className={`${themeBackgroundStyle} min-h-screen`}>
      <Container>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Manage Payment Settings</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
          >
            <Plus size={18} /> Add Bank Account
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Manage all available bank accounts for payments here. You can set
          which account is active for receiving payments.
        </p>

        {/* Table */}
        <div
          className={`overflow-x-auto border rounded-lg ${themeForegroundStyle}`}
        >
          <table className="w-full border text-left">
            <thead className={`border-b ${themeFgOfFgStyle}`}>
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Account Holder</th>
                <th className="p-3">Branch</th>
                <th className="p-3">Router ID</th>
                <th className="p-3">Account Number</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bankAccounts.length > 0 ? (
                bankAccounts.map((account, index) => (
                  <tr
                    key={account._id}
                    className="border-t hover:bg-gray-500 transition"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{account.holderName}</td>
                    <td className="p-3">{account.branchName}</td>
                    <td className="p-3">{account.routerId}</td>
                    <td className="p-3">{account.accountNumber}</td>
                    <td className="p-3 flex justify-center gap-3">
                      <button
                        onClick={() => toggleStatusMutation.mutate(account)}
                        className={`px-3 py-1 rounded text-white ${
                          account.isActive
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-400 hover:bg-gray-500"
                        }`}
                      >
                        {account.isActive ? "Active" : "Inactive"}
                      </button>

                      <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded flex items-center">
                        <Pencil size={14} />
                      </button>

                      <button
                        onClick={() =>
                          deleteAccountMutation.mutate(account._id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500"
                  >
                    No bank accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <ModalFormat
            width="w-[450px]"
            height="h-auto"
            headerText="Add Bank Account"
            modalClosingFunction={() => setIsModalOpen(false)}
            form={formContent}
          />
        )}
      </Container>
    </div>
  );
};

export default ManagePaymentSetting;
