import Button from "./Button";
import "./ProductCard.css";

const ProductCard = ({ product, addToCart }) => {
  if (!product) return null;

  return (
    <div className="product-card">

     \

      <div className="product-info">

        <h2>{product.name}</h2>

        <p className="product-category">
          {product.category}
        </p>

        <p className="product-description">
          {product.description}
        </p>

        <p className="product-price">
          ₹ {product.price}
        </p>

        <p className="product-stock">
          Stock: {product.stock}
        </p>

        <Button
          text="Add to Cart"
          onClick={() => addToCart(product)}
        />

      </div>

    </div>
  );
};

export default ProductCard;