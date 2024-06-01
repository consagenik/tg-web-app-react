import './ProductItem.css';
import {Button} from "../button";

export default function ProductItem({title, description, price, onAddToCart}) {
  return (
    <div className="productItem">
      <div className="img" />
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="price">
        <span>Price <b>{price}</b></span>
      </div>
      <Button text="Add to cart" onClick={onAddToCart} />
    </div>
  );
}
