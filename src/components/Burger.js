import React from "react";
import PropTypes from "prop-types"

class Burger extends React.Component{
    static propTypes ={
        details: PropTypes.shape({
            image: PropTypes.string,
            price: PropTypes.number,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
        }),
        index: PropTypes.string.isRequired,
        addToOrder: PropTypes.func.isRequired,

    }

    render() {
        const {image, name, price, desc, status} = this.props.details;
        const index = this.props.index;
        const isAvailable = status === "available";
        return(
            <li className="menu-burger">
                <div className="image-container">
                    <img src={image} alt=""/>
                </div>
                <div className="burger-details">
                    <h3 className="burger-name">
                        {name}
                        <span className="price">{price} ₽</span>
                    </h3>
                    <p>{desc}</p>
                    <button className="buttonOrder" disabled={!isAvailable} onClick={()=> {this.props.addToOrder(index)}}>
                        {isAvailable ? "Заказать" : "Временно нет"}
                    </button>
                </div>
            </li>
        )
    }
}



export default Burger;