import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

import "../styles/products.css";

const Products = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const [error, setError] = useState("");

  // Search and category
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async (
    searchValue = "",
    categoryValue = ""
  ) => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:8080/products/filter",
        {
          params: {
            search: searchValue || undefined,
            category: categoryValue || undefined,
          },

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(response.data);

    } catch (error) {
      console.error("Error fetching products:", error);

      setError("Failed to load products");

    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // SEARCH
  // =========================

  const handleSearch = () => {
    fetchProducts(search, category);
  };

  // =========================
  // CATEGORY
  // =========================

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);

    fetchProducts(search, selectedCategory);
  };

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/cart",
        null,
        {
          params: {
            productId: product.id,
            quantity: 1,
          },

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart((previousCart) => [
        ...previousCart,
        product,
      ]);

      console.log(
        "Product added to cart:",
        product.name
      );

    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error
      );
    }
  };

  // =========================
  // SCROLL TO PRODUCTS
  // =========================

  const exploreProducts = () => {
    document
      .getElementById("products-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  // =========================
  // INITIAL LOADING SCREEN
  // =========================

  if (loading && initialLoad) {
    return (
      <>
        <Navbar />

        <div className="products-message">

          <div>

            <div className="loading-icon">
              🌿
            </div>

            <p>
              Preparing your wellness collection...
            </p>

          </div>

        </div>
      </>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error && initialLoad) {
    return (
      <>
        <Navbar />

        <div className="products-message error">

          <div>

            <div className="loading-icon">
              ⚠️
            </div>

            <p>
              {error}
            </p>

            <button
              className="retry-button"
              onClick={() => {
                setError("");
                fetchProducts(search, category);
              }}
            >
              Try Again
            </button>

          </div>

        </div>
      </>
    );
  }

  // =========================
  // MAIN PAGE
  // =========================

  return (
    <>
      <Navbar />

      <main className="products-page">

        {/* =================================
            HERO SECTION
        ================================= */}

        <section className="store-hero">

          <div className="hero-content">

            <span className="hero-badge">
              🌿 NUTRITION • WELLNESS • LIFESTYLE
            </span>

            <h1>
              Nourish Your
              <span> Everyday Wellness</span>
            </h1>

            <p>
              Discover a curated collection of nutrition,
              wellness, and personal care products in one
              convenient shopping experience.
            </p>

            <div className="hero-actions">

              <button
                className="primary-button"
                onClick={exploreProducts}
              >

                <span className="button-icon">
                  🌿
                </span>

                <span>
                  Explore Collection
                </span>

                <span className="button-arrow">
                  →
                </span>

              </button>


              <button
                className="secondary-button"
                onClick={() => navigate("/chatbot")}
              >

                <span className="ai-icon">
                  ✦
                </span>

                <span className="ai-button-text">

                  <strong>
                    Meet Your AI Guide
                  </strong>

                  <small>
                    Ask • Discover • Explore
                  </small>

                </span>

                <span className="ai-arrow">
                  ↗
                </span>

              </button>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="hero-visual">

            <div className="hero-circle">

              <div className="hero-leaf">
                🌿
              </div>

              <div className="hero-floating-card hero-card-one">
                ✨ Wellness
              </div>

              <div className="hero-floating-card hero-card-two">
                🥤 Nutrition
              </div>

            </div>

          </div>

        </section>


        {/* =================================
            ABOUT STORE
        ================================= */}

        <section className="about-store">

          <div className="about-heading">

            <span className="section-label">
              WHY SHOP WITH US
            </span>

            <h2>
              Wellness, Made Simple
            </h2>

            <p>
              Browse products by your needs, discover
              useful information, and get assistance
              whenever you need it.
            </p>

          </div>


          <div className="category-grid">

            <div className="category-card">

              <div className="category-icon">
                🥤
              </div>

              <h3>
                Nutrition
              </h3>

              <p>
                Explore nutrition products suitable
                for different everyday routines.
              </p>

            </div>


            <div className="category-card">

              <div className="category-icon">
                🌿
              </div>

              <h3>
                Wellness
              </h3>

              <p>
                Discover products focused on
                everyday wellness and active living.
              </p>

            </div>


            <div className="category-card">

              <div className="category-icon">
                ✨
              </div>

              <h3>
                Personal Care
              </h3>

              <p>
                Find personal care products for
                your everyday self-care routine.
              </p>

            </div>

          </div>

        </section>


        {/* =================================
            PRODUCTS SECTION
        ================================= */}

        <section
          id="products-section"
          className="products-section"
        >

          <div className="products-header">

            <div>

              <span className="section-label">
                OUR COLLECTION
              </span>

              <h2>
                Explore Our Products
              </h2>

              <p>
                Find the right products for your
                nutrition, wellness, and personal
                care needs.
              </p>

            </div>


            <div className="cart-count">
              🛒 {cart ? cart.length : 0} Items
            </div>

          </div>


          {/* =================================
              SEARCH AND CATEGORY FILTERS
          ================================= */}

          <div className="product-filters">

            {/* SEARCH */}

            <div className="search-box">

              <span className="search-icon">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                onKeyDown={(e) => {

                  if (e.key === "Enter") {
                    handleSearch();
                  }

                }}
              />

              <button onClick={handleSearch}>
                Search
              </button>

            </div>


            {/* CATEGORIES */}

            <div className="category-filters">

              <span className="filter-label">
                Categories
              </span>


              <button
                className={
                  category === ""
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleCategoryChange("")
                }
              >
                All
              </button>


              <button
                className={
                  category === "Hair Care"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleCategoryChange("Hair Care")
                }
              >
                Hair Care
              </button>


              <button
                className={
                  category === "Skin Care"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleCategoryChange("Skin Care")
                }
              >
                Skin Care
              </button>


              <button
                className={
                  category === "Bath & Body"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleCategoryChange("Bath & Body")
                }
              >
                Bath & Body
              </button>


              <button
                className={
                  category === "Herbal Tea"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleCategoryChange("Herbal Tea")
                }
              >
                Herbal Tea
              </button>


              <button
                className={
                  category === "Essential Oils"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handleCategoryChange("Essential Oils")
                }
              >
                Essential Oils
              </button>

            </div>

          </div>


          {/* =================================
              PRODUCT RESULTS
          ================================= */}

          {loading ? (

            <div className="no-products">
              🔄 Finding products...
            </div>

          ) : products.length > 0 ? (

            <div className="product-list">

              {products.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />

              ))}

            </div>

          ) : (

            <div className="no-products">
              No products found.
            </div>

          )}


        </section>


        {/* =================================
            AI WELLNESS GUIDE
        ================================= */}

        <section className="ai-guide-section">

          <div className="ai-guide-icon">
            ✦
          </div>


          <div className="ai-guide-content">

            <span className="section-label">
              YOUR AI WELLNESS GUIDE
            </span>

            <h2>
              Need Help Finding Something?
            </h2>

            <p>
              Ask about products, shipping, returns,
              refunds, payments, or order
              cancellations and get instant assistance.
            </p>

          </div>


          <button
            className="ai-guide-button"
            onClick={() => navigate("/chatbot")}
          >

            <span>
              🌿
            </span>

            Ask Your Wellness Guide

            <span>
              →
            </span>

          </button>

        </section>

      </main>
    </>
  );
};

export default Products;

