import React from "react";
import PropTypes from "prop-types"

class EditBurgerForm extends React.Component{

    static propTypes = {
        burger: PropTypes.shape({
            image: PropTypes.string,
            price: PropTypes.number,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
        }),
        index: PropTypes.string,
        updateBurger: PropTypes.func,
        deleteBurger: PropTypes.func,
    }

    handleChange = e => {
        //забираем все старые значения из пропс и добавляем одно изменённое
        const value = e.target.name === "price" ? Number(e.target.value): e.target.value;
        const updatedBurger = {
            ...this.props.burger,
            [e.target.name]:value,
        }

        this.props.updateBurger(this.props.index, updatedBurger);
    }

    render() {
        return(
            <div className="burger-edit">
                <input onChange={this.handleChange}
                       ref={this.nameRef}
                       type="text"
                       name={"name"}
                       placeholder={"name"}
                       autoComplete={"off"}
                       value={this.props.burger.name} required
                />
                <input onChange={this.handleChange}
                       ref={this.priceRef}
                       type="text" name={"price"}
                       placeholder={"price"}
                       autoComplete={"off"}
                       value={this.props.burger.price} required
                />
                <select onChange={this.handleChange}
                        ref={this.statusRef}
                        name={"status"} className={"status"}
                        value={this.props.burger.status}
                >
                    <option value="available">Доступно</option>
                    <option value="unavailable">Убрать из меню</option>
                </select>
                <textarea onChange={this.handleChange}
                          ref={this.descRef}
                          name={"desc"}
                          placeholder={"Description"}
                          value={this.props.burger.desc}/>
                <input onChange={this.handleChange}
                       ref={this.imgRef}
                       type="text" name={"image"}
                       placeholder={"image"}
                       value={this.props.burger.image}
                       autoComplete={"off"}
                />
                <button onClick={()=>{this.props.deleteBurger(this.props.index)}}>Удалить из меню</button>
            </div>
        )
    }
}

export default EditBurgerForm;