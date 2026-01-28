import "./productCard.css";

export default function ProductCard(props) {

    console.log(props);
    return (
        <div className="product-card">
            
            <img src={props.img} alt="Product"/>
            <span className="title">{props.name}</span>
            <span className="price">{props.price}</span>
            <p>{props.description}</p>

        </div>
    );
}
