"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function OrderTable() {
  const [orders, setOrders] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [filteredOrders, setFilteredOrders] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState<any>({ id: null, description: "", selectedProducts: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${process.env.API_ENDPOINT}/api/orders`);
      setOrders(response.data);
      setFilteredOrders(response.data);
    } catch (err:any) {
      console.error("Error fetching orders:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.API_ENDPOINT}/api/products`);
      setProducts(response.data);
    } catch (err:any) {
      console.error("Error fetching products:", err.message);
    }
  };

  // Fetch order details by ID for editing
  const fetchOrderById = async (id:any) => {
    try {
      const {data} = await axios.get(`${process.env.API_ENDPOINT}/api/orders/${id}`);
      const order = data;
      console.log("orderpart data", order)

      setNewOrder({
        id: order.id,
        description: order.orderdescription,
        selectedProducts: products
          .filter((product:any) => order.productids.includes(product.id))
          .map((product:any) => product.id),
      });
      
      setIsEditing(true);
      setIsModalOpen(true);
    } catch (err:any) {
      console.error("Error fetching order details:", err.message);
      toast.error("Failed to fetch order details.");
    }
  };

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredOrders(orders);
    } else {
      const lowerSearchTerm = searchTerm.toLowerCase();
      const filtered = orders.filter(
        (order:any) =>
          order.id.toString().includes(lowerSearchTerm) ||
          order.orderdescription.toLowerCase().includes(lowerSearchTerm)
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  // Create or update an order
  const handleSubmitOrder = async () => {
    try {
      const orderData = {
        orderDescription: newOrder.description,
        productIds: newOrder.selectedProducts,
      };

      if (isEditing) {
        await axios.put(`${process.env.API_ENDPOINT}/api/orders/${newOrder.id}`, orderData);
        toast.success("Order updated successfully!");
      } else {
        await axios.post(`${process.env.API_ENDPOINT}/api/orders`, orderData);
        toast.success("Order created successfully!");
      }

      setIsModalOpen(false);
      setIsEditing(false);
      fetchOrders();
    } catch (err:any) {
      console.error(isEditing ? "Error updating order:" : "Error creating order:", err.message);
      toast.error(isEditing ? "Failed to update order." : "Failed to create order.");
    }
  };

  // Delete an order
  const handleDeleteOrder = async (id:any) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.API_ENDPOINT}/api/orders/${id}`);
      toast.success("Order deleted successfully.");
      fetchOrders();
    } catch (err:any) {
      console.error("Error deleting order:", err.message);
      toast.error("Failed to delete order.");
    }
  };

  // Open modal to create a new order
  const handleOpenModal = () => {
    setNewOrder({ id: null, description: "", selectedProducts: [] });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Handle product selection for the order
  const toggleProductSelection = (productId:any) => {
    setNewOrder((prevOrder:any) => {
      const selected = prevOrder.selectedProducts.includes(productId)
        ? prevOrder.selectedProducts.filter((id:any) => id !== productId)
        : [...prevOrder.selectedProducts, productId];
      return { ...prevOrder, selectedProducts: selected };
    });
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-gray-100 overflow-auto ">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Order Management</h1>

        {/* Search and New Order Button */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by Order ID or Description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-96 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleOpenModal}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            New Order
          </button>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Product Count</th>
                <th className="px-4 py-2">Created Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    Loading orders...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="text-center text-red-500 py-4">
                    Error: {error}
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order:any) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.orderdescription}</td>
                    <td className="px-4 py-2">{order.productcount}</td>
                    <td className="px-4 py-2">
                      {new Date(order.createdat).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => fetchOrderById(order.id)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Update Order Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {isEditing ? "Update Order" : "Create New Order"}
            </h2>
            <input
              type="text"
              placeholder="Order Description"
              value={newOrder.description}
              onChange={(e) =>
                setNewOrder({ ...newOrder, description: e.target.value })
              }
              className="w-full mb-4 p-2 border border-gray-300 rounded"
            />
            <h3 className="font-semibold mb-2">Select Products:</h3>
            <div className="max-h-40 overflow-y-auto mb-4">
              {products.map((product:any) => (
                <div key={product.id} className="flex items-center mb-2 border-2 rounded p-2">
                  <input
                    type="checkbox"
                    checked={newOrder.selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    className="mr-2"
                  />

                  <div className="flex flex-col">
                  <label><b>{product.productname}</b></label>
                  <hr></hr>
                  <label className="mt-1">{product.productdescription}</label>
                  </div>
               
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitOrder}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {isEditing ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
