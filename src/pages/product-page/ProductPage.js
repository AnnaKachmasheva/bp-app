import React, {Component, useState} from "react";
import {CountItems} from "../../utils/Constants";
import Pagination from "../../components/pagination/Pagination";
import {IoQrCodeOutline} from "react-icons/io5";
import {formatNumberWithSpaces, toStringForQRCode} from "../../utils/Common";
import styles from './ProductPage.module.scss';
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {ModalQRCode} from "../../components/scanner/window-show-QR/ModalQRCode";


function ProductPage() {

    // Initial setup of headers and mock data
    const headers = ['PHOTO', 'PRICE', 'QUANTITY', 'MIN QUANTITY', 'VALUE', 'QR'];

    // State variables for managing UI interactions and data selection
    const [selectedNumber, setSelectedNumber] = useState(5)

    const {id} = useParams();
    const {state} = useLocation();

    const navigate = useNavigate();

    // Event handlers for various UI interactions like dropdown toggle, category selection, etc
    const setSelectedOption = (option) => {
        setSelectedNumber(option);
    };

    function calculateTotalQuantity() {
        let sum = 0;
        state?.product.variants.map((variant, index) => (
            sum += variant.quantity
        ))
        return sum;
    }

    function calculateTotalValue() {
        let sum = 0;
        state?.product.variants.map((variant, index) => (
            sum += variant.quantity * variant.price
        ))
        return sum;
    }

    const goToVariantPage = (variant) => {
        const idProduct = state.product.id;
        const idVariant = variant.id;
        navigate(`/app/inventory/product/${idProduct}/variant/${idVariant}`, {state: {variant: variant}});
    }


    return (
        <div className={'content'}>
            {/* title */}
            <div className={'total '.concat(styles.title)}>
                <h4>Category: <span>{state?.category.name}</span></h4>
                <h4>Name: <span>{state?.product.name}</span></h4>
            </div>

            <div className={'panel'}>

                <div className={styles.tableInfo}>
                    <h4 className={styles.title}>Variants</h4>

                    {/* total info */}
                    <div className={'total'}>
                        <h4>Total quantity: <span>{formatNumberWithSpaces(calculateTotalQuantity())}</span></h4>
                        <h4>Total value: <span>{formatNumberWithSpaces(calculateTotalValue())}</span></h4>
                    </div>
                </div>


                {/* item's table */}
                <table>
                    <thead>
                    <tr>
                        {headers.map((header, index) => <HeaderItem title={header}/>)}
                    </tr>
                    </thead>

                    <tbody>
                    {state?.product.variants.map((variant) =>
                        <TableRowGroupItem item={variant}
                                           handleClick={() => goToVariantPage(variant)}
                                           showVariant={()=>goToVariantPage(variant)}/>
                    )}
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
                <Pagination data={state?.product.variants}
                            itemsPerPage={selectedNumber}
                />

            </div>
        </div>
    )
}

class HeaderItem extends Component {
    render() {
        return (
            <td scope={'col'} className={(this.props.title === 'QR') ? 'column-action' : ''}>
                {this.props.title}
            </td>
        )
    }
}

class TableRowGroupItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showQR: false
        };
    }

    handleShowQRCode = () => {
        this.setState(() => ({
            showQR: true,
        }));
    }

    showVariant = () => {
        this.props.showVariant();
    }

    render() {

        const {showQR} = this.state;
        const isLessThanMin = this.props.item.quantity <= this.props.item.minQuantity;

        return (
            <tr key={this.props.item.id}>
                <ModalQRCode onClose={() => this.setState({showQR: false})}
                             data={toStringForQRCode(this.props.item)}
                             showVariant={() => this.showVariant()}
                             show={showQR}/>

                <td onClick={this.props.handleClick}>
                    <img src={this.props.item.photo}
                         alt={this.props.item.photo}/>
                </td>
                <td onClick={this.props.handleClick}>{this.props.item.price}</td>
                <td onClick={this.props.handleClick}
                    className={isLessThanMin ? styles.danger : ''}>{this.props.item.quantity}</td>
                <td onClick={this.props.handleClick}>{this.props.item.minQuantity}</td>
                <td onClick={this.props.handleClick}>
                    {formatNumberWithSpaces(this.props.item.quantity * this.props.item.price)}
                </td>
                <td className={'column-action'}>{
                    <IoQrCodeOutline onClick={this.handleShowQRCode}/>}
                </td>
            </tr>
        )
    }
}

export default ProductPage;