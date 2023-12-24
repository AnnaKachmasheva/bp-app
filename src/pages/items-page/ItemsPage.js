import React, {Component, useMemo, useState} from "react";
import MOCK_DATA from "./MOCK_DATA.json"
import {BsQrCode} from "react-icons/bs";
import {SlOptions} from "react-icons/sl";
import {CiSquareChevDown} from "react-icons/ci";
import {CountItems} from "../../utils/Constants";
import Pagination from "../../components/pagination/Pagination";
import Button, {ButtonSize, ButtonType} from "../../components/button/Button";
import {AiOutlineCheck} from "react-icons/ai";


function ItemsPage() {

    const headers = ['NAME', 'QUANTITY', 'VALUE', 'QR'];
    const data = useMemo(() => MOCK_DATA, []);
    const [selectedNumber, setSelectedNumber] = useState(5)

    const setSelectedOption = (option) => {
        setSelectedNumber(option);
    };

    return (
        <div className={'content'}>
            <div className={'panel'}>
                {/* total */}
                <div className={'total'}>
                    <p>Total quantity: <span>11 112 333</span></p>
                    <p>Total value: <span>123 323 555 666</span></p>
                </div>

                {/* item's table */}
                <table>
                    <thead>
                    <tr>
                        <td className={'checkbox-container'}>
                            <input type={"checkbox"}/>
                        </td>
                        {headers.map((header) => <HeaderItem title={header}/>)}
                        <td className={'column-action'}/>
                    </tr>
                    </thead>

                    <tbody>
                    {data.map((itemGroup) => <TableRowGroupItem itemGroup={itemGroup}/>)}
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

class TableRowGroupItem extends Component {

    calculateTotalQuantity = () => {
        const variants = this.props.itemGroup.variants;
        let sum = 0;
        variants.forEach(variant => sum += variant.quantity);
        return sum;
    };

    calculateTotalValue = () => {
        const variants = this.props.itemGroup.variants;
        let sum = 0;
        variants.forEach(variant => sum += variant.value);
        return sum;
    };

    hasQRCode = () => {
        const variants = this.props.itemGroup.variants;
        let countQRCodes = 0;
        variants.forEach(variant => countQRCodes += (variant.qr === true ? 1 : 0));
        return countQRCodes > 0;
    };

    render() {
        const totalQuantity = this.calculateTotalQuantity();
        const totalValue = this.calculateTotalValue();
        const isQRCode = this.hasQRCode();

        return (
            <tr>
                <td className={'checkbox-container'}>
                    <input type={"checkbox"}/>
                </td>
                <td> {this.props.itemGroup.name}</td>
                <td>{totalQuantity}</td>
                <td>{totalValue}</td>
                <td>{isQRCode ? <BsQrCode/> : '-'}</td>
                <td className={'column-action'}>
                    <Button type={ButtonType[3].type}
                            size={ButtonSize[0].size}
                            icon={<SlOptions/>}/>
                    <Button type={ButtonType[3].type}
                            size={ButtonSize[0].size}
                            icon={<CiSquareChevDown/>}/>
                </td>
            </tr>
        )
    }
}

class TableRowVariant extends Component {

    render() {
        return (
            <tr>
                <td className={'empty-column'}/>
                <td className={'checkbox-container'}>
                    <input type={"checkbox"}/>
                </td>

                <td> {this.props.variant.name}</td>

                <td>{this.props.variant.quantity}</td>

                <td>{this.props.variant.value}</td>

                <td>{this.props.variant.qr ? <BsQrCode/> : '-'}</td>

                <td className={'column-action'}>
                    <Button type={ButtonType[3].type}
                            size={ButtonSize[0].size}
                            icon={<SlOptions/>}/>
                </td>
            </tr>
        )
    }
}

export default ItemsPage