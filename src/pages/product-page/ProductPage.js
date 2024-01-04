import React, {Component, useMemo, useState} from "react";
import MOCK_DATA from "./MOCK_DATA.json"
import {CiSettings} from "react-icons/ci";
import {CountItems} from "../../utils/Constants";
import Pagination from "../../components/pagination/Pagination";


function ProductPage() {

    const data = useMemo(() => MOCK_DATA, []);

    const [selectedNumber, setSelectedNumber] = useState(5)
    // const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(data.categories);

    const setSelectedOption = (option) => {
        setSelectedNumber(option);
    };

    function getHeaders() {
        if (!data) {
            return [];
        }

        const firstItem = data[0];
        if (!firstItem) {
            return [];
        }

        const propertyNames = Object.keys(firstItem);

        return propertyNames.filter(name => name !== 'id');
    }

    function getVariantValue(variant, propertyName) {
        if (!variant || !propertyName) {
            return null;
        }

        return variant.hasOwnProperty(propertyName) ? variant[propertyName] : null;
    }

    return (
        <div className={'content'}>
            {/* title */}
            <h3>{data.name}</h3>

            <h4>Category <span>{data.category}</span></h4>

            {/* table with variants*/}
            <div className={'panel'}>

                {/* total info */}
                <div className={'total'}>
                    <h4>Total quantity: <span>5 202</span></h4>
                    <h4>Total value: <span>17 313</span></h4>
                </div>

                {/* item's table */}
                <table>
                    <thead>
                    <tr>
                        {getHeaders().map((header) => <HeaderItem title={header}/>)}

                        <td className={'column-action'}><CiSettings size={24}/></td>
                    </tr>
                    </thead>

                    <tbody>
                    {data.variants.map(variant => (
                        <tr>
                            {
                                getHeaders().map(header =>
                                    <TableCell item={getVariantValue(variant, header)}/>
                                )
                            }
                        </tr>
                    ))}
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
                {/*<Pagination data={selectedCategories}*/}
                {/*            itemsPerPage={selectedNumber}*/}
                {/*/>*/}

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

class TableCell extends Component {
    render() {
        return (
            <td scope={'col'}>
                {this.props.title}
            </td>
        )
    }
}

export default ProductPage