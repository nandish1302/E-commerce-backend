import Button from "./Button";
import "../styles/ProductCard.css";

const ProductCard = ({ product, addToCart }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="product-card">

      <div className="product-card-content">

        {/* Category */}

        <span className="product-category">
          {product.category}
        </span>


        {/* Product Name */}

        <h2 className="product-name">
          {product.name}
        </h2>


        {/* Description */}

        <p className="product-description">
          {product.description}
        </p>


        {/* Price + Stock */}

        <div className="product-details">

          <span className="product-price">
            ₹ {product.price}
          </span>

          <span
            className={
              product.stock > 0
                ? "product-stock in-stock"
                : "product-stock out-of-stock"
            }
          >
            {product.stock > 0
              ? `In Stock: ${product.stock}`
              : "Out of Stock"}
          </span>

        </div>


        {/* Add To Cart */}

        <div className="product-card-button">

          <Button
            text={
              product.stock > 0
                ? "Add to Cart"
                : "Out of Stock"
            }
            onClick={() => {
              if (product.stock > 0) {
                addToCart(product);
              }
            }}
          />

        </div>

      </div>

    </div>
  );
};

export default ProductCard;