import Button from "./Button";
import "../styles/ProductCard.css";

const ProductCard = ({ product, addToCart }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="product-card">

      <div className="product-card-content">

        <span className="product-category">
          {product.category}
        </span>

        <h2 className="product-name">
          {product.name}
        </h2>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-details">

          <span className="product-price">
            ₹ {product.price}
          </span>

          <span className="product-stock">
            {product.stock > 0
              ? `In Stock: ${product.stock}`
              : "Out of Stock"}
          </span>

        </div>

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