import Button from "./Button";
const ProductCard = (props) => {
    return (
        <div>
           <h2>{props.product.title}</h2>
           <p>₹ {props.product.price}</p>
           <Button text="Add to Cart"
            onClick={() => props.addToCart(props.product)} />

        </div>
    );
};
export default ProductCard;