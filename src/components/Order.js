import React from "react";
import PropTypes from "prop-types"
import Shipment from "./Shipment";
import {TransitionGroup, CSSTransition} from "react-transition-group";

class Order extends React.Component{

    static propTypes = {
        burgers: PropTypes.object,
        order: PropTypes.object,
        deleteFromOrder: PropTypes.func,
    }

    renderOrder = key => {
        const burger = this.props.burgers[key];
        let count = this.props.order[key];

        //Если бургеры не успели прогрузиться из памяти, то ничего не рендерим
        if(!burger) return null;

        const isAvailable = burger && burger.status === "available";

        if(!isAvailable){
            return(
                <CSSTransition classNames={"order"} key={key} timeout={{enter: 500, exit:500}}>
                    <li key={key} className={"unavailable"}>
                        Извините, {burger ? burger.name : 'бургур'} временно недоступен
                    </li>
                </CSSTransition>
            )
        } else {
            return(
                <CSSTransition classNames={"order"} key={key} timeout={{enter: 500, exit:500}}>
                    <li key={key}>
                    <span>
                        <span>{count}</span>
                        шт. {burger.name}
                        <span> {count * burger.price}₽</span>
                        <button onClick={()=>{this.props.deleteFromOrder(key)}} className="cancellItem">&times;</button>
                    </span>
                    </li>
                </CSSTransition>

            )
        }


    }

    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prev, key) => {
            const burger = this.props.burgers[key];
            let count = this.props.order[key];

            const isAvailable = burger && burger.status === "available";

            count = (!isAvailable) ? 0 : count;

            return prev + burger?.price * count;
        }, 0)
        return(
            <div className="order-wrap">
                <h2>Ваш заказ</h2>
                <TransitionGroup component={"ul"} className={"order"}>
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                {
                    total > 0 ? (
                    <Shipment total={total} />
                    ) : (
                    <div className="nothingSelected">
                        Выберите блюдо и добавьте к заказу
                    </div>
                    )
                }
            </div>
        )

    }
}

export default Order;