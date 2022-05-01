import React from "react";
import Header from "./Header";
import Order from "./Order";
import MenuAdmin from "./MenuAdmin";
import Burger from "./Burger";
import base from "../base";
import SignIn from "./auth/SignIn";
import firebase from "firebase/app";

import sampleBurgers from "../sample-burgers";

class App extends React.Component{
    state = {
        burgers: {},
        order: {},
    }

    //Метод жизненного цикла React. рабатывает при появлении компоненты на экран
    //открываем web socket соединение, синхронизируем базу данных
    componentDidMount() {
        const {params} = this.props.match;

        const order = localStorage.getItem(params.restId);
        if(order){
            this.setState({order: JSON.parse(order)});
        }


        this.ref = base.syncState(`${params.restId}/burgers`, {
            context: this,
            state: 'burgers',
        })


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {params} = this.props.match;
        localStorage.setItem(params.restId, JSON.stringify(this.state.order));

    }

    //закрываем web socket соединение
    componentWillUnmount() {
        base.removeBinding(this.ref)
    }

    updateBurger = (key, updatedBurger) => {
        const burgers = {...this.state.burgers};
        burgers[key] = updatedBurger;
        this.setState({burgers});
    }

    deleteBurger = (key) => {
        const burgers = {...this.state.burgers};
        burgers[key] = null;
        this.setState({burgers});
    }

    deleteFromOrder = (key) => {
        const order = {...this.state.order};
        if(order[key] - 1 === 0){
            delete order[key]
        } else {
            order[key] -= 1
        }
        this.setState({order});
    }

    addBurger = (burger) => {
        //Копия объекта tate
        const burgers = {...this.state.burgers};
        //добавление нового бургрера в копию
        burgers[`burger${Date.now()}`] = burger;
        //записать новый объект burgers в state
        this.setState({burgers})
    }


    loadSampleBurgers = () =>{
        //обновляем стейт
        this.setState({burgers: sampleBurgers});
    }

    addToOrder = (key) => {
        //Делаем копию order
        const order = {...this.state.order};
        //Добавить ключ к заказу со значением 1 или прибавить 1
        order[key] = order[key] ? order[key]  + 1 : 1;
        //обновляем state
        this.setState({order});
    }

    handleLogout = async () => {
        await firebase.auth().signOut();
        window.location.reload();
    }
    render() {
        return(
            <SignIn>
                <div className={"burger-paradise"}>
                    <div className={"menu"}>
                        <Header title={"Hot burgers"}/>
                        {Object.keys(this.state.burgers).map(burger =>{
                            return <Burger key={burger}
                                           details={this.state.burgers[burger]}
                                           index={burger}
                                           addToOrder = {this.addToOrder}
                            />
                        })}
                    </div>
                    <Order
                        burgers={this.state.burgers}
                        order={this.state.order}
                        deleteFromOrder={this.deleteFromOrder}
                    />
                    <MenuAdmin
                        addBurger={this.addBurger}
                        loadSampleBurgers={this.loadSampleBurgers}
                        burgers={this.state.burgers}
                        updateBurger={this.updateBurger}
                        deleteBurger={this.deleteBurger}
                        handleLogout={this.handleLogout}
                    />
                </div>
            </SignIn>

        )
    }
}

export default App;