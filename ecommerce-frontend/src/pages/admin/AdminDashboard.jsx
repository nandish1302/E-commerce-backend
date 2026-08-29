
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  getAdminProducts,
  deleteProduct,
} from "../../api/adminApi";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  // Load products
  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getAdminProducts();

      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        alert("Admin session expired or access denied.");
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Add product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.description ||
      !form.price ||
      !form.stock ||
      !form.category
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (Number(form.price) < 0) {
      alert("Price cannot be negative.");
      return;
    }

    if (Number(form.stock) < 0) {
      alert("Stock cannot be negative.");
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

      const savedProduct = await addProduct(newProduct);

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

      alert("Product added successfully.");

    } catch (error) {
      console.error("Failed to add product:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add product."
      );

    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(id);

      setProducts((previous) =>
        previous.filter(
          (product) => product.id !== id
        )
      );

      alert("Product deleted successfully.");

    } catch (error) {
      console.error("Failed to delete product:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");

    navigate("/admin/login");
  };

  return (
    <div className="admin-page">

      {/* Sidebar */}

      <aside className="admin-sidebar">

        <div className="admin-brand">

          <div className="brand-icon">
            🌿
          </div>

          <div>
            <h2>Herbal Life</h2>
            <span>Admin Panel</span>
          </div>

        </div>


        <nav className="admin-nav">

          <button className="admin-nav-item active">
            <span>▦</span>
            Dashboard
          </button>

          <button className="admin-nav-item">
            <span>◈</span>
            Products
          </button>

          <button className="admin-nav-item">
            <span>◫</span>
            Orders
          </button>

        </nav>


        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>


      {/* Main Content */}

      <main className="admin-main">

        {/* Header */}

        <header className="admin-header">

          <div>

            <p className="admin-eyebrow">
              STORE MANAGEMENT
            </p>

            <h1>
              Good to see you, Admin.
            </h1>

            <p className="admin-subtitle">
              Manage your herbal products and inventory.
            </p>

          </div>

          <div className="admin-profile">

            <div className="profile-avatar">
              A
            </div>

            <div>
              <strong>Administrator</strong>
              <span>Store Manager</span>
            </div>

          </div>

        </header>


        {/* Stats */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              ◈
            </div>

            <div>
              <span>Total Products</span>
              <strong>{products.length}</strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ✓
            </div>

            <div>
              <span>In Stock</span>
              <strong>
                {
                  products.filter(
                    (product) => product.stock > 0
                  ).length
                }
              </strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              !
            </div>

            <div>
              <span>Low Stock</span>
              <strong>
                {
                  products.filter(
                    (product) =>
                      product.stock > 0 &&
                      product.stock <= 10
                  ).length
                }
              </strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              ⊘
            </div>

            <div>
              <span>Out of Stock</span>
              <strong>
                {
                  products.filter(
                    (product) => product.stock === 0
                  ).length
                }
              </strong>
            </div>

          </div>

        </section>


        {/* Add Product */}

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


        {/* Product List */}

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
              <p>Loading products...</p>
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
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {products.map((product) => (

                    <tr key={product.id}>

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
                        ₹{Number(product.price).toFixed(2)}
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
                            handleDelete(product.id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

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

