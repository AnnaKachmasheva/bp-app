import React, {Component} from "react";

function DashboardPage() {

    return (
        <div className={'content'}>
            //todo
        </div>
    )

}

class Card extends Component {


    render() {
        return (
            <div className={''}>
                <p>{this.props.title}</p>
                <p>{this.props.count}</p>
            </div>
        )
    }
}


export default DashboardPage