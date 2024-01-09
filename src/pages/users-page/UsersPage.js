import React, {Component, useMemo, useState} from "react";
import {RiDeleteBinLine} from "react-icons/ri";
import {HiOutlinePencilAlt} from "react-icons/hi";
import MOCK_DATA from "./MOCK_DATA.json"
import {CountItems} from "../../utils/Constants";
import Pagination from "../../components/pagination/Pagination";
import Button, {ButtonSize, ButtonType} from "../../components/button/Button";

function UsersPage() {

    const headers = ['USER', 'ROLE', 'ACTIVITIES'];
    const data = useMemo(() => MOCK_DATA, []);
    const [selectedNumber, setSelectedNumber] = useState(5)

    const setSelectedOption = (option) => {
        setSelectedNumber(option);
    };

    return (
        <div className={'content'}>



            <div className={'panel'}>
                <table>
                    <thead>
                    <tr>
                        {headers.map((header) => <HeaderItem title={header}/>)}
                    </tr>
                    </thead>

                    <tbody>
                    {data.map((user) => <TableRow user={user}/>)}
                    </tbody>
                </table>
            </div>

            <div className={"container-pagination"}>
                {/* count items on the page */}
                <div>
                    Show
                    <select value={selectedNumber}
                            onChange={e => setSelectedOption(e.target.value)}>
                        {CountItems.map(count => (
                            <option value={count}>{count}</option>
                        ))}
                    </select>
                    per page
                </div>

                {/* pagination */}
                <Pagination data={data}
                            itemsPerPage={selectedNumber}
                />

            </div>
        </div>
    )
}

class HeaderItem extends Component {
    render() {
        return (
            <td scope={'col'}>
                {this.props.title}
            </td>
        )
    }
}

class TableRow extends Component {
    render() {
        return (
            <tr>
                <td>
                    <h6>{this.props.user.firstName} {this.props.user.lastName}</h6>
                    <p>{this.props.user.email}</p>
                    <p>{this.props.user.phone}</p>
                </td>
                <td>{this.props.user.userRole}</td>
                <td>
                    <div className={'buttons-container'}>
                        <Button type={ButtonType[3].type}
                                size={ButtonSize[0].size}
                                label={'Edit'}
                                icon={<HiOutlinePencilAlt/>}/>

                        <Button type={ButtonType[5].type}
                                size={ButtonSize[0].size}
                                label={'Delete'}
                                icon={<RiDeleteBinLine/>}/>
                    </div>
                </td>
            </tr>
        )
    }
}

export default UsersPage;