import React, {useState} from "react";
import restaurants from "../sample-restaurants";
import PropTypes from "prop-types"

const Landing = props => {

    // state = {
    //     display: false,
    //     title: '',
    //     url: '',
    // }

    const [display, toggleDisplay] = useState(false);
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    const displayList = () =>{
        toggleDisplay(!display);
    }

    const getTitle = (rest) => {
        toggleDisplay(false);
        setTitle(rest.title);
        setUrl(rest.url);
    }

    const goToRestaurant = () => {
        //Из-за того, что наша компонента является дочерней к Router, он накидывает нам некоторые пропсы. history, location, match.
        //Мы используем history и его метод push
        props.history.push(`restaurant/${url}`);
    }

    return (
        <div className={"restaurant_select"}>
            <div className={"restaurant_select_top"}>
                <div onClick={displayList} className={"restaurant_select_top-header"}>
                    {title === '' ? "Выберите ресторан" : title}
                </div>
                <div className={"arrow_picker"}>
                    <div className={"arrow_picker-up"}></div>
                    <div className={"arrow_picker-down"}></div>
                </div>
                {
                    display ?
                        <div className={"restaurant_select_bottom"}>
                            <ul>
                                {
                                    restaurants.map(item => {
                                        return <li onClick={()=>getTitle(item)} key={item.id}>{item.title}</li>
                                    })
                                }

                            </ul>
                        </div>
                        : null
                }

            </div>
            {title === '' ? null : <button onClick={goToRestaurant}>Перейти в ресторан</button>}
        </div>
    )
}

Landing.propTypes = {
    history: PropTypes.object,
}



export default Landing
