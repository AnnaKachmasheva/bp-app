import React, {Component, useMemo} from "react";
import ScanComponent from "../components/scanner/ScanComponent";
import styles from './ItemsPage.module.scss';
import MOCK_DATA from "./MOCK_DATA.json"
import {BsQrCode} from "react-icons/bs";
import {SlOptions} from "react-icons/sl";
import {CiSquareChevDown} from "react-icons/ci";


function ItemsPage() {

    const headers = ['NAME', 'QUANTITY', 'VALUE', 'QR'];

    const data = useMemo(() => MOCK_DATA, []);

    return (
        <div className={'content'}>
            <ScanComponent/>

            <div className={styles.panel}>

                <table>
                    <thead>
                    <tr>
                        <td className={styles.checkboxContainer}><input type={"checkbox"}/></td>
                        {
                            headers.map((header) => <HeaderItem title={header}/>)
                        }

                        <td className={styles.columnAction}/>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        data.map((itemGroup) => <TableRowGroupItem itemGroup={itemGroup}/>)
                        // {
                        //     itemGroup.variants.map((variant) =>
                        //         <TableRowVariant variant={variant}/>)
                        // }
                    }
                    </tbody>

                </table>

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
                <td className={styles.checkboxContainer}>
                    <input type={"checkbox"}/>
                </td>

                <td>
                    {this.props.itemGroup.name}
                </td>

                <td>
                    {totalQuantity}
                </td>

                <td>
                    {totalValue}
                </td>

                <td>
                    {isQRCode ? <BsQrCode/> : '-'}
                </td>

                <td className={styles.columnAction}>
                    <button>
                        <SlOptions size={22}/>
                    </button>

                    <button>
                        <CiSquareChevDown className={styles.icon}
                                          size={22}/>
                    </button>
                </td>
            </tr>
        )
    }
}

class TableRowVariant extends Component {

    render() {
        return (
            <tr>
                <td className={styles.emptyColumn}/>
                <td className={styles.checkboxContainer}>
                    <input type={"checkbox"}/>
                </td>

                <td>
                    {this.props.variant.name}
                </td>

                <td>
                    {this.props.variant.quantity}
                </td>

                <td>
                    {this.props.variant.value}
                </td>

                <td>
                    {this.props.variant.qr ? <BsQrCode/> : '-'}
                </td>

                <td className={styles.columnAction}>
                    <button>
                        <SlOptions size={22}/>
                    </button>
                </td>
            </tr>
        )
    }
}

export default ItemsPage