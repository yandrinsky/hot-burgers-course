import React from "react";
import PropTypes from "prop-types"

class AddBurgerForm extends React.Component{
    static propTypes = {
        addBurger: PropTypes.func.isRequired,
    }

    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imgRef = React.createRef();
    createBurger = (e) =>{
        e.preventDefault();
        const burger = {
            name: this.nameRef.current.value,
            price: Number(this.priceRef.current.value),
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            img: this.imgRef.current.value,
        }
        this.props.addBurger(burger);
        //Очищаем поля от прошлого заполения
        e.currentTarget.reset();
    }
    render() {
        return(
            <form action="" className="burger-edit" autoComplete={"off"} onSubmit={this.createBurger}>
                <input ref={this.nameRef} type="text" name={"name"} placeholder={"name"} autoComplete={"off"} required/>
                <input ref={this.priceRef} type="text" name={"price"} placeholder={"price"} autoComplete={"off"} required/>
                <select ref={this.statusRef} name={"status"} className={"status"}>
                    <option value="available">Доступно</option>
                    <option value="unavailable">Убрать из меню</option>
                </select>
                <textarea ref={this.descRef} name={"desc"} placeholder={"Description"}/>
                <input ref={this.imgRef} type="text" name={"img"} placeholder={"image"} autoComplete={"off"}/>
                <button type={"submit"}>Добавить в меню</button>
            </form>

        )
    }
}

export default AddBurgerForm;