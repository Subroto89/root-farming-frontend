import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { TabTitle } from "../../utils/utilities";
import {useAuth} from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { FaShoppingCart, FaTrash, FaTools } from "react-icons/fa";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import DataNotFound from "../../components/shared/DataNotFound";

const CartDataRow = ({ item, handleQuantityChange, handleRemoveItem, isLoading, isSelected, onToggleSelect, handleCheckout }) => {
  const { theme } = useTheme();
  return (
    <tr className={`border-b ${theme === "dark" ? "border-gray-700" : ""}`}>
      <td className='px-4 py-2 text-center'>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(item.medicineId)}
          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
        />
      </td>
      <td className='px-4 py-2 text-center'>
        <img src={item.photo} alt={item.name} className='w-16 h-16 object-cover rounded-md mx-auto' />
      </td>
      <td className={`px-4 py-2 text-center font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>{item.name}</td>
      <td className={`px-4 py-2 text-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{item.company}</td>
      <td className={`px-4 py-2 text-center font-medium ${theme === "dark" ? "text-white" : "text-gray-800"}`}>${item.price.toFixed(2)}</td>
      <td className='px-4 py-2 text-center'>
        <div className='flex items-center justify-center gap-2'>
          <button
            onClick={() => handleQuantityChange(item.medicineId, item.quantity, 'decrease')}
            className='px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300'
            disabled={isLoading}
          >
            -
          </button>
          <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-800"}`}>{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.medicineId, item.quantity, 'increase')}
            className='px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300'
            disabled={isLoading}
          >
            +
          </button>
        </div>
      </td>
      <td className={`px-4 py-2 text-center font-medium ${theme === "dark" ? "text-white" : "text-gray-800"}`}>${(item.price * item.quantity).toFixed(2)}</td>
      <td className='px-4 py-2 text-center'>
        <div className='flex items-center justify-center gap-2'>
          <button
            onClick={() => handleRemoveItem(item.medicineId, item.name)}
            className='text-red-500 hover:text-red-700'
            disabled={isLoading}
          >
            <FaTrash size={20} />
          </button>
          <button
            onClick={() => handleCheckout('single', item)}
            className='px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300'
          >
            Purchase
          </button>
        </div>
      </td>
    </tr>
  );
};


const Cart = () => {
  TabTitle('Cart');

  const {theme} = useTheme();
  const [selectedItems, setSelectedItems] = useState([])
  const {user} = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();


  const {data: carts, isLoading, refetch} = useQuery({
    queryKey: ["carts", user?.email ],
    queryFn: async () => {
      const {data} = await axiosSecure(`/cart/get-cart?email=${user.email}`);
      return data;
    },
    staleTime: 0,
    cacheTime: 0
  });

  if(isLoading) return <LoadingSpinner/>

  const cartItems = carts?.items || [];
  const totalCartPrice = carts?.totalCartPrice || 0;



   // --- Selection Handlers ---
  const handleToggleSelect = (id) => {
    setSelectedItems(prevSelected => 
      prevSelected.includes(id)
        ? prevSelected.filter(i => i !== id)
        : [...prevSelected, id]
    );
  };

  const handleToggleSelectAll = (event) => {
    if (event.target.checked) {
      // Select all items
      const allProductIds = cartItems.map(item => item.medicineId);
      setSelectedItems(allProductIds);
    } else {
      // Deselect all items
      setSelectedItems([]);
    }
  };

  // Check if all current items are selected for the "Select All" checkbox state
  const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

// handleCheckOut - now accepts a type argument
  const handleCheckout = (type, singleItem) => {
    let itemsToCheckout = [];

    if (type === 'all') {
      itemsToCheckout = cartItems;
    } else if (type === 'selected') {
      itemsToCheckout = cartItems.filter(item => selectedItems.includes(item.medicineId));
    } else if (type === 'single') {
        itemsToCheckout = [singleItem];
    }

    if (itemsToCheckout.length === 0) { 
      Swal.fire({
        icon: 'info',
        title: 'Cart is Empty',
        text: `Please add items to your cart or select items before proceeding to checkout.`,
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

  // Navigate to checkout page, passing the items to be checked out via state
    navigate('/checkout', { state: { items: itemsToCheckout, checkoutType: type } }); 
  };



// Quantity Change Function
const handleQuantityChange = async (medicineId, currentQuantity, action) => {
    let newQuantity = currentQuantity;
    if (action === 'increase') {
      newQuantity = currentQuantity + 1;
    } else if (action === 'decrease') {
      newQuantity = Math.max(1, currentQuantity - 1); // Quantity cannot go below 1
    }

    try {
      const { data } = await axiosSecure.patch(`/update-cart-item/${user.uid}/${medicineId}`, { quantity: newQuantity });
      console.log(data)
      if (data.success || data.modifiedCount) {
        refetch();
      
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message || 'Failed to update quantity. Please try again.',
        });
      }
    } catch (err) {
      console.error("Error updating quantity:", err.response?.data || err.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response?.data?.message || 'Failed to update quantity. Please try again.',
      });
    }
  };


// handleRemove item
const handleRemoveItem = async (medicineId, itemName) => {
    Swal.fire({
      title: `Remove ${itemName}?`,
      text: "Are you sure you want to remove this medicine from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/remove-cart-item/${user.uid}/${medicineId}`);
          
          if (data.success) {
            refetch();
            Swal.fire({
              icon: 'success',
              title: 'Item Removed!',
              text: 'Medicine has been removed from your cart.',
              timer: 1500,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.message || 'Failed  to remove item. Please try again.',
            });
          }
        } catch (err) {
          console.error("Error removing item:", err.response?.data || err.message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response?.data?.message || 'Failed to remove item Please try again.**********',
          });
        }
      }
    });
  };



  // handleClearCart 
  const handleClearCart = () => {
    Swal.fire({
      title: 'Clear Cart?',
      text: "Are you sure you want to remove all items from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "No, keep items",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/clear-cart/${user.uid}`);
          
          if (data.success) {
            // QueryClient.invalidateQueries(['cart', user?.email]);
            refetch();
            Swal.fire({
              icon: 'success',
              title: 'Cart Cleared!',
              text: 'Your shopping cart has been emptied.',
              timer: 1500,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.message || 'Failed to clear cart. Please try again.',
            });
          }
        } catch (err) {
          console.error("Error clearing cart:", err.response?.data || err.message);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response?.data?.message || 'Failed to clear cart. Please try again.',
          });
        }
      }
    });
  };


    return (
        <div className={`w-full min-h-screen pt-24 ${theme==="dark" ? "bg-secondary" : ""}`}>
          <div className='w-11/12 mx-auto'>
            {/* ----------------------------------------------------------------------------------------
            Header Section
            ----------------------------------------------------------------------------------------- */}
            <div className='mb-4'>
              <h2 className={`text-2xl font-bold  ${theme==="dark" ? "text-white" : "text-gray-700"}`}>Your Shopping Cart Is Ready For Checkout!</h2>  
           
            </div>
             {/* ----------------------------------------------------------------------------------------
            Header Section
            ----------------------------------------------------------------------------------------- */}
            <div>
              {
                cartItems?.length > 0 ? (
                  <div>
                    <div className={`max-h-[calc(100vh-280px)] overflow-auto rounded-xl shadow-xl`}>
                    <table className='w-full divider-y divider-gray-200'>
                      <thead className={`bg-gray-100 text-md font-semibold text-gray-700 sticky top-0 w-full divider-y divider-gray-200 ${theme==="dark" ? "category-card" : "text-gray-700"}`}>
                         <th className='px-4 py-2 text-sm font-semibold text-center uppercase'>
                        <input
                          type="checkbox"
                          checked={isAllSelected}
                          onChange={handleToggleSelectAll}
                          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                          disabled={isLoading || cartItems.length === 0}
                        />
                      </th>
                        <th className='px-4 py-2 text-sm font-semibold text-center uppercase'>Photo</th>
                        <th className='px-4 py-2 text-sm font-semibold text-center uppercase'>Product</th>
                        <th className='px-4 py-2 text-sm font-semibold text-center uppercase'>Company</th>
                        <th className='px-4 py-2 text-sm font-semibold text-center uppercase'>Price/Unit</th>
                        <th className='px-4 py-2 text-sm font-semibold text-center uppercase'>Quantity</th>
                        <th className='px-4 py-2 text-sm font-semibold text-center uppercase'>Total Price</th>
                        <th className='px-4 py-2 text-sm font-semibold text-center uppercase flex items-center gap-2'><FaTools/>Action</th>
                      </thead>
                      <tbody className={`${theme==="dark" ? "category-card" : ""}`}>
                        {
                          cartItems.map(item => <CartDataRow key={item._id} item={item}
                             handleQuantityChange={handleQuantityChange}
                             handleRemoveItem={handleRemoveItem}
                              isLoading={isLoading}
                          isSelected={selectedItems.includes(item.medicineId)}
                          onToggleSelect={handleToggleSelect}
                          handleCheckout={handleCheckout}
                             />)
                        }
                      </tbody>
                    </table>


               
                  </div>
                    {/* -------------------------------------------------------
                    Bottom part
                    ----------------------------------------------------------
                     */}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div className={`${theme==="dark" ? "text-white" : "text-green-700"} text-2xl font-bold text-gray-800 mb-4 md:mb-0`}>
                  Total: <span>${totalCartPrice.toFixed(2)}</span>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
                  <button
                    onClick={handleClearCart}
                    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 flex items-center justify-center gap-2"
                    disabled={isLoading || cartItems.length === 0}
                  >
                    <MdOutlineRemoveShoppingCart size={20} /> Clear Cart
                  </button>
                  <button
                    onClick={() => handleCheckout('selected')} // Checkout selected items
                    className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center gap-2"
                    disabled={selectedItems.length === 0} // Disable if no items are selected
                  >
                    <FaShoppingCart size={20} /> Checkout Selected ({selectedItems.length})
                  </button>
                  <button
                    onClick={() => handleCheckout('all')} // Checkout all items
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
                    disabled={cartItems.length === 0}
                  >
                    <FaShoppingCart size={20} /> Checkout All
                  </button>
                </div>
              </div>
                    </div>
                ):(
                  <DataNotFound message={"NO Items In Cart, Select Items First To Check Out."}/>
                )
              }


              
            </div>
          </div>
        </div>
    );
};

export default Cart;
