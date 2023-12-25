import Sidebar from "../components/sidebar/Sidebar";
import Nav from "../components/nav/Nav";
import React from "react";

function BasicPage(props) {

    return (
        <div className={'main'}>
            <Sidebar/>
            <Nav title={props.title}/>

            {props.page}
        </div>
    )

}

export default BasicPage