import React from "react";
import PropTypes from "prop-types"
import AddBurgerForm from "./AddBurgerForm";
import EditBurgerForm from "./EditBurgerForm";
import firebase from "firebase/app";


class MenuAdmin extends React.Component{

    state = {
        photo: '',
        user: '',
    }

    componentDidMount = () => {
        //как-то связывается с базой данных и забирает текущего юзера
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.authHandler({user});
            }
        })
    }

    authHandler = async (authData) => {
        const {email, displayName, photoURL} = authData.user;
        this.setState({user: email, photo: photoURL, name: displayName})
        //localStorage.setItem("user", JSON.stringify({user: email, photo: photoURL, name: displayName}));
        console.log(authData)
    }

    static propTypes = {
        burgers: PropTypes.object,
        deleteBurger: PropTypes.func,
        updateBurger: PropTypes.func,
        addBurger: PropTypes.func,
        loadBurger: PropTypes.func,
    }

    render() {
        return(
            <div className="menu-admin">
                {this.state.user !== ''
                    ?
                    <div className="login-header">
                        <div className="avatar"><img src={this.state.photo ? this.state.photo : "/images/avatar.png"} alt="avatar"/></div>
                        <button
                            className="buttonLogout"
                            onClick={this.props.handleLogout}
                        >
                            Выйти
                        </button>
                    </div>
                    :
                    null}
                <h2>Управление меню</h2>
                {
                    Object.keys(this.props.burgers).map(key => {
                        return <EditBurgerForm updateBurger={this.props.updateBurger}
                                               key={key}
                                               index={key}
                                               burger={this.props.burgers[key]}
                                               deleteBurger={this.props.deleteBurger}
                                />
                    })
                }
                <AddBurgerForm addBurger={this.props.addBurger}/>
                <button onClick={this.props.loadSampleBurgers}>Загрузить бургеры</button>
            </div>
        )
    }
}

export default MenuAdmin;