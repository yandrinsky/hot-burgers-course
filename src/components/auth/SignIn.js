import React from "react"
import Login from "./Login";
import PropTypes from "prop-types"
import firebase from 'firebase/app'
import { firebaseApp } from "../../base";

class SignIn extends React.Component{
    state = {
        user: '',
    }

    componentDidMount = () => {
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

    authenticate = () => {
        const authProvider = new firebase.auth['GithubAuthProvider']();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler)
    }

    render() {
        if(!this.state.user){
            //return <Login authenticate={this.authenticate}/>
            return this.props.children
        } else {
            return this.props.children
        }
    }
}

export default SignIn