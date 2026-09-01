import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  addProduct,
  getAdminProducts,
  deleteProduct,
  getDashboard,
  getAdminOrders,
  updateOrderStatus,
} from "../../api/adminApi";

import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {

  const navigate = useNavigate();

  // ==========================================
  // PRODUCTS
  // ==========================================

  const [products, setProducts] = useState([]);

  // ==========================================
  // DASHBOARD
  // ==========================================

  const [dashboard, setDashboard] = useState(null);

  // ==========================================
  // ORDERS
  // ==========================================

  const [orders, setOrders] = useState([]);

  // ==========================================
  // LOADING
  // ==========================================

  const [loading, setLoading] = useState(false);

  const [dashboardLoading, setDashboardLoading] =
    useState(true);

  const [ordersLoading, setOrdersLoading] =
    useState(true);

  // ==========================================
  // PRODUCT FORM
  // ==========================================

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });


  // ==========================================
  // LOAD PRODUCTS
  // ==========================================

  const loadProducts = async () => {

    try {

      setLoading(true);

      const data = await getAdminProducts();

      setProducts(data);

    } catch (error) {

      console.error(
        "Failed to load products:",
        error
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {

        alert(
          "Admin session expired or access denied."
        );

        navigate("/admin/login");
      }

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // LOAD DASHBOARD
  // ==========================================

  const loadDashboard = async () => {

    try {

      setDashboardLoading(true);

      const data = await getDashboard();

      setDashboard(data);

    } catch (error) {

      console.error(
        "Failed to load dashboard:",
        error
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {

        alert(
          "Admin session expired or access denied."
        );

        navigate("/admin/login");
      }

    } finally {

      setDashboardLoading(false);

    }
  };


  // ==========================================
  // LOAD ORDERS
  // ==========================================

  const loadOrders = async () => {

    try {

      setOrdersLoading(true);

      const data = await getAdminOrders();

      setOrders(data);

    } catch (error) {

      console.error(
        "Failed to load orders:",
        error
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {

        alert(
          "Admin session expired or access denied."
        );

        navigate("/admin/login");
      }

    } finally {

      setOrdersLoading(false);

    }
  };


  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================

  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {

    try {

      const updatedOrder =
        await updateOrderStatus(
          orderId,
          newStatus
        );


      // Update order in UI immediately

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order.orderId === orderId
            ? updatedOrder
            : order
        )
      );


      // Refresh dashboard status counts

      await loadDashboard();

    } catch (error) {

      console.error(
        "Failed to update order status:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to update order status."
      );
    }
  };


  // ==========================================
  // LOAD ALL DATA
  // ==========================================

  useEffect(() => {

    loadProducts();

    loadDashboard();

    loadOrders();

  }, []);


  // ==========================================
  // HANDLE FORM INPUT
  // ==========================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // ==========================================
  // ADD PRODUCT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.stock ||
      !form.category
    ) {

      alert(
        "Please fill all fields."
      );

      return;
    }


    if (Number(form.price) < 0) {

      alert(
        "Price cannot be negative."
      );

      return;
    }


    if (Number(form.stock) < 0) {

      alert(
        "Stock cannot be negative."
      );

      return;
    }


    try {

      setLoading(true);

      const newProduct = {

        name: form.name,

        description: form.description,

        price: Number(form.price),

        stock: Number(form.stock),

        category: form.category,

        imageUrl: null,
      };


      const savedProduct =
        await addProduct(newProduct);


      setProducts((previous) => [
        ...previous,
        savedProduct,
      ]);


      setForm({

        name: "",

        description: "",

        price: "",

        stock: "",

        category: "",
      });


      // Refresh dashboard statistics

      await loadDashboard();


      alert(
        "Product added successfully."
      );

    } catch (error) {

      console.error(
        "Failed to add product:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to add product."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );


    if (!confirmed) {

      return;
    }


    try {

      await deleteProduct(id);


      setProducts((previous) =>
        previous.filter(
          (product) =>
            product.id !== id
        )
      );


      // Refresh dashboard statistics

      await loadDashboard();


      alert(
        "Product deleted successfully."
      );

    } catch (error) {

      console.error(
        "Failed to delete product:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to delete product."
      );
    }
  };


  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {

    localStorage.removeItem(
      "adminToken"
    );

    navigate("/admin/login");
  };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (date) => {

    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };


  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="admin-page">


      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside className="admin-sidebar">

        <div className="admin-brand">

          <div className="brand-icon">
            🌿
          </div>

          <div>

            <h2>
              Herbal Life
            </h2>

            <span>
              Admin Panel
            </span>

          </div>

        </div>


        <nav className="admin-nav">

          <button
            className="admin-nav-item active"
          >

            <span>
              ▦
            </span>

            Dashboard

          </button>


          <button
            className="admin-nav-item"
          >

            <span>
              ◈
            </span>

            Products

          </button>


          <button
            className="admin-nav-item"
          >

            <span>
              ◫
            </span>

            Orders

          </button>

        </nav>


        <button
          className="admin-logout"
          onClick={handleLogout}
        >

          <span>
            ↪
          </span>

          Logout

        </button>

      </aside>


      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <main className="admin-main">


        {/* ===================================
            HEADER
        ==================================== */}

        <header className="admin-header">

          <div>

            <p className="admin-eyebrow">
              STORE MANAGEMENT
            </p>

            <h1>
              Good to see you, Admin.
            </h1>

            <p className="admin-subtitle">
              Manage your herbal products,
              inventory and orders.
            </p>

          </div>


          <div className="admin-profile">

            <div className="profile-avatar">
              A
            </div>

            <div>

              <strong>
                Administrator
              </strong>

              <span>
                Store Manager
              </span>

            </div>

          </div>

        </header>


        {/* ===================================
            MAIN DASHBOARD STATS
        ==================================== */}

        <section className="stats-grid">


          {/* TOTAL PRODUCTS */}

          <div className="stat-card">

            <div className="stat-icon">
              ◈
            </div>

            <div>

              <span>
                Total Products
              </span>

              <strong>

                {dashboardLoading
                  ? "..."
                  : dashboard?.totalProducts ?? 0}

              </strong>

            </div>

          </div>


          {/* TOTAL ORDERS */}

          <div className="stat-card">

            <div className="stat-icon">
              🛒
            </div>

            <div>

              <span>
                Total Orders
              </span>

              <strong>

                {dashboardLoading
                  ? "..."
                  : dashboard?.totalOrders ?? 0}

              </strong>

            </div>

          </div>


          {/* TOTAL USERS */}

          <div className="stat-card">

            <div className="stat-icon">
              👤
            </div>

            <div>

              <span>
                Customers
              </span>

              <strong>

                {dashboardLoading
                  ? "..."
                  : dashboard?.totalUsers ?? 0}

              </strong>

            </div>

          </div>


          {/* TOTAL REVENUE */}

          <div className="stat-card">

            <div className="stat-icon">
              ₹
            </div>

            <div>

              <span>
                Total Revenue
              </span>

              <strong>

                ₹
                {dashboardLoading
                  ? "..."
                  : Number(
                      dashboard?.totalRevenue ?? 0
                    ).toFixed(2)}

              </strong>

            </div>

          </div>

        </section>


        {/* ===================================
            ORDER STATUS
        ==================================== */}

        <section className="stats-grid">


          {/* PLACED */}

          <div className="stat-card">

            <div className="stat-icon">
              🕐
            </div>

            <div>

              <span>
                Placed
              </span>

              <strong>
                {dashboard?.placedOrders ?? 0}
              </strong>

            </div>

          </div>


          {/* PROCESSING */}

          <div className="stat-card">

            <div className="stat-icon">
              ⚙
            </div>

            <div>

              <span>
                Processing
              </span>

              <strong>
                {dashboard?.processingOrders ?? 0}
              </strong>

            </div>

          </div>


          {/* SHIPPED */}

          <div className="stat-card">

            <div className="stat-icon">
              📦
            </div>

            <div>

              <span>
                Shipped
              </span>

              <strong>
                {dashboard?.shippedOrders ?? 0}
              </strong>

            </div>

          </div>


          {/* DELIVERED */}

          <div className="stat-card">

            <div className="stat-icon">
              ✓
            </div>

            <div>

              <span>
                Delivered
              </span>

              <strong>
                {dashboard?.deliveredOrders ?? 0}
              </strong>

            </div>

          </div>

        </section>


        {/* ===================================
            RECENT ORDERS
        ==================================== */}

        <section className="admin-card">

          <div className="section-heading">

            <div>

              <p className="section-label">
                ORDER MANAGEMENT
              </p>

              <h2>
                Recent Orders
              </h2>

              <p>
                Orders placed by your customers.
              </p>

            </div>


            <div className="product-count">
              {orders.length} Orders
            </div>

          </div>


          {ordersLoading ? (

            <div className="empty-state">

              <p>
                Loading orders...
              </p>

            </div>

          ) : orders.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                🛒
              </div>

              <h3>
                No orders yet
              </h3>

              <p>
                Customer orders will appear here.
              </p>

            </div>

          ) : (

            <div className="products-table-wrapper">

              <table className="products-table">

                <thead>

                  <tr>

                    <th>
                      Order
                    </th>

                    <th>
                      Customer
                    </th>

                    <th>
                      Products Ordered
                    </th>

                    <th>
                      Amount
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Date & Time
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {orders.map(
                    (order) => (

                      <tr
                        key={order.orderId}
                      >


                        {/* ORDER ID */}

                        <td>

                          <strong>
                            #{order.orderId}
                          </strong>

                        </td>


                        {/* CUSTOMER */}

                        <td>

                          <div className="product-name">

                            <div className="product-placeholder">
                              👤
                            </div>

                            <div>

                              <strong>
                                {order.customerName}
                              </strong>

                              <span>
                                {order.customerEmail}
                              </span>

                            </div>

                          </div>

                        </td>


                        {/* PRODUCTS ORDERED */}

                        <td>

                          <div>

                            {order.items?.map(
                              (item, index) => (

                                <div
                                  key={index}
                                  style={{
                                    marginBottom:
                                      "6px",
                                  }}
                                >

                                  <strong>
                                    {item.productName}
                                  </strong>

                                  <span
                                    style={{
                                      marginLeft:
                                        "8px",
                                    }}
                                  >
                                    × {item.quantity}
                                  </span>

                                </div>

                              )
                            )}

                          </div>

                        </td>


                        {/* AMOUNT */}

                        <td className="price">

                          ₹
                          {Number(
                            order.totalAmount
                          ).toFixed(2)}

                        </td>


                        {/* STATUS */}

                        <td>

                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(
                                order.orderId,
                                e.target.value
                              )
                            }
                            className={`order-status-select ${order.status?.toLowerCase()}`}
                          >

                            <option value="PLACED">
                              Placed
                            </option>

                            <option value="PROCESSING">
                              Processing
                            </option>

                            <option value="SHIPPED">
                              Shipped
                            </option>

                            <option value="DELIVERED">
                              Delivered
                            </option>

                            <option value="CANCELLED">
                              Cancelled
                            </option>

                          </select>

                        </td>


                        {/* DATE & TIME */}

                        <td>

                          <span>
                            {formatDate(
                              order.createdAt
                            )}
                          </span>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* ===================================
            ADD PRODUCT
        ==================================== */}

        <section className="admin-card">

          <div className="section-heading">

            <div>

              <p className="section-label">
                INVENTORY
              </p>

              <h2>
                Add New Product
              </h2>

              <p>
                Add a new herbal product to your store.
              </p>

            </div>

          </div>


          <form
            className="product-form"
            onSubmit={handleSubmit}
          >


            <div className="form-field">

              <label>
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Organic Ashwagandha"
              />

            </div>


            <div className="form-field">

              <label>
                Category
              </label>

              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Supplements"
              />

            </div>


            <div className="form-field">

              <label>
                Price
              </label>

              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="₹ 0.00"
                min="0"
                step="0.01"
              />

            </div>


            <div className="form-field">

              <label>
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
              />

            </div>


            <div className="form-field full-width">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the product and its benefits..."
                rows="4"
              />

            </div>


            <div className="form-actions">

              <button
                type="submit"
                className="primary-button"
                disabled={loading}
              >

                {loading
                  ? "Adding Product..."
                  : "+ Add Product"}

              </button>

            </div>

          </form>

        </section>


        {/* ===================================
            PRODUCT LIST
        ==================================== */}

        <section className="admin-card products-card">

          <div className="section-heading product-heading">

            <div>

              <p className="section-label">
                CATALOG
              </p>

              <h2>
                Products
              </h2>

              <p>
                Manage products currently available in your store.
              </p>

            </div>


            <div className="product-count">
              {products.length} Products
            </div>

          </div>


          {loading && products.length === 0 ? (

            <div className="empty-state">

              <p>
                Loading products...
              </p>

            </div>

          ) : products.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                🌿
              </div>

              <h3>
                No products yet
              </h3>

              <p>
                Add your first herbal product above.
              </p>

            </div>

          ) : (

            <div className="products-table-wrapper">

              <table className="products-table">

                <thead>

                  <tr>

                    <th>
                      Product
                    </th>

                    <th>
                      Category
                    </th>

                    <th>
                      Price
                    </th>

                    <th>
                      Stock
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {products.map(
                    (product) => (

                      <tr
                        key={product.id}
                      >

                        <td>

                          <div className="product-name">

                            <div className="product-placeholder">
                              🌿
                            </div>

                            <div>

                              <strong>
                                {product.name}
                              </strong>

                              <span>
                                ID #{product.id}
                              </span>

                            </div>

                          </div>

                        </td>


                        <td>

                          <span className="category-badge">

                            {product.category}

                          </span>

                        </td>


                        <td className="price">

                          ₹
                          {Number(
                            product.price
                          ).toFixed(2)}

                        </td>


                        <td>

                          <span
                            className={`stock-badge ${
                              product.stock === 0
                                ? "out"
                                : product.stock <= 10
                                ? "low"
                                : "available"
                            }`}
                          >

                            {product.stock === 0
                              ? "Out of stock"
                              : `${product.stock} in stock`}

                          </span>

                        </td>


                        <td>

                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              handleDelete(
                                product.id
                              )
                            }
                          >

                            Delete

                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>


      </main>

    </div>
  );
};


export default AdminDashboard;

