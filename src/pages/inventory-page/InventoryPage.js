import React, {Component, useMemo, useState} from "react";
import MOCK_DATA from "./MOCK_DATA.json"
import {SlOptions} from "react-icons/sl";
import {CiSettings} from "react-icons/ci";
import {CountItems} from "../../utils/Constants";
import Pagination from "../../components/pagination/Pagination";
import Button, {ButtonSize, ButtonType} from "../../components/button/Button";
import styles from './InventoryPage.module.scss';
import {IoClose} from "react-icons/io5";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import {RiDeleteBin7Line, RiEdit2Line} from "react-icons/ri";
import {LuCopyPlus} from "react-icons/lu";
import {BiTransfer} from "react-icons/bi";
import {ModalDeleteProductConfirm} from "./modalWindowDeleteProduct/ModalDeleteProductConfirm";
import {ModalProduct} from "./modalWindowProduct/ModalProduct";


function InventoryPage() {

    const headers = ['CATEGORY', 'NAME', 'QUANTITY', 'VALUE', 'DESCRIPTION', 'DATE'];

    const data = useMemo(() => MOCK_DATA, []);

    const [selectedNumber, setSelectedNumber] = useState(5)
    const [selectedCategories, setSelectedCategories] = useState(data.categories);
    const [selectedAll, setSelectedAll] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);


    const setSelectedOption = (option) => {
        setSelectedNumber(option);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleCategoryToggle = (selectedCategory) => {
        setSelectedCategories((prevSelected) =>
            prevSelected.some((category) => category.name === selectedCategory.name)
                ? prevSelected.filter((category) => category.name !== selectedCategory.name)
                : [...prevSelected, selectedCategory]
        );
        setSelectedAll(false);
    };

    function removeCategoryFromSelected(categoryToRemove) {
        let categories = selectedCategories;
        categories = categories.filter(category => category.name !== categoryToRemove.name);
        setSelectedCategories(categories)
    }

    function handleSelectAll() {
        if (!selectedAll) {
            setSelectedCategories(data.categories)
        }
        setSelectedAll(!selectedAll);
    }

    function handleContainerCategoryOptions() {
        setDropdownVisible(false)
    }

    return (
        <div className={'content'}>
            {/* title */}
            <h4>Categories</h4>

            {/*selected categories list*/}
            <ul>
                {selectedCategories.map((category =>
                        <li className={'label'}
                            key={category.name}
                            onClick={() => removeCategoryFromSelected(category)}>
                            <span>{category.name}</span>
                            <IoClose/>
                        </li>
                ))}
            </ul>


            {/* button select categories */}
            <Button onClick={toggleDropdown}
                    type={ButtonType[3].type}
                    size={ButtonSize[1].size}
                    icon={isDropdownVisible ? <FaArrowUp/> : <FaArrowDown/>}
                    label={'Select Categories'}/>

            {/* all categories */}
            {isDropdownVisible &&
                <div>
                    <div className='container-list-options'
                         onClick={handleContainerCategoryOptions}>
                    </div>

                    <ul className={styles.selectCategories}>
                        <li key={'all'}><label>
                            <input
                                type="checkbox"
                                checked={selectedAll}
                                onChange={handleSelectAll}
                            />
                            Select all
                        </label>
                        </li>
                        {data.categories.map((category) => (
                            <li key={category.name}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.some((c) => c.name === category.name)}
                                        onChange={() => handleCategoryToggle(category)}
                                    />
                                    {category.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            }

            <div className={'panel'}>

                {/* total info */}
                <div className={'total'}>
                    <h4>Products: <span>35</span></h4>
                    <h4>Total quantity: <span>31 202</span></h4>
                    <h4>Total value: <span>1 231 312 313</span></h4>
                </div>

                {/* item's table */}
                <table>
                    <thead>
                    <tr>
                        {headers.map((header, index) => <HeaderItem title={header}/>)}
                        <td className={'column-action'}><CiSettings size={24}/></td>
                    </tr>
                    </thead>

                    <tbody>
                    {selectedCategories.map((category) => category.items.map((item) =>
                        <TableRowGroupItem item={item}
                                           categories={data.categories}
                                           category={category}/>
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
                <Pagination data={selectedCategories}
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

    constructor(props) {
        super(props);
        this.state = {
            showOptions: false,
            showConfirmDeleteModal: false,
            showProductModal: false,
            modalTitle: ""
        };
    }

    handleOptionsClick = () => {
        this.setState((prevState) => ({
            showOptions: !prevState.showOptions,
        }));
    };

    calculateTotalQuantity = () => {
        const variants = this.props.item.variants;
        let sum = 0;
        variants.forEach(variant => sum += variant.quantity);
        return sum;
    };

    calculateTotalValue = () => {
        const variants = this.props.item.variants;
        let sum = 0;
        variants.forEach(variant => sum += (variant.quantity * variant.price));
        return sum;
    };

    formatDatetime(datetime) {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };

        const formattedDatetime = new Date(datetime).toLocaleString('en-US', options);
        return formattedDatetime.replace(/,/g, '');
    }

    formatNumberWithSpaces(number) {
        return number.toLocaleString('en-US').replace(/,/g, ' ');
    }


    renderOptionsList() {
        if (!this.state.showOptions)
            return null;

        const {showConfirmDeleteModal} = this.state;
        const {showProductModal} = this.state;

        return (
            <div>
                <div className='container-list-options'
                     onClick={this.handleOptionsClick}>
                </div>

                {/*modal windows*/}
                <ModalDeleteProductConfirm onClose={() => this.setState({showConfirmDeleteModal: false})}
                                           show={showConfirmDeleteModal}/>

                <ModalProduct onClose={() => this.setState({showProductModal: false})}
                              title={this.state.modalTitle}
                              categories={this.props.categories}
                              product={this.props.item}
                              show={showProductModal}/>

                <ul className='options-list'>
                    <li onClick={() => this.setState({showProductModal: true, modalTitle: "New transaction"})}>
                        <BiTransfer/>
                        Transaction
                    </li>
                    <li onClick={() => this.setState({showProductModal: true, modalTitle: "New product"})}>
                        <LuCopyPlus/>
                        Clone
                    </li>
                    <li onClick={() => this.setState({showProductModal: true, modalTitle: "Edit product"})}>
                        <RiEdit2Line/>
                        Edit
                    </li>
                    <li onClick={() => this.setState({showConfirmDeleteModal: true})}>
                        <RiDeleteBin7Line/>
                        Delete
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        const totalQuantity = this.calculateTotalQuantity();
        const totalValue = this.calculateTotalValue();

        return (
            <tr>
                <td>{this.props.category.name}</td>
                <td>{this.props.item.name}</td>
                <td>{this.formatNumberWithSpaces(totalQuantity)}</td>
                <td>{this.formatNumberWithSpaces(totalValue)}</td>
                <td>{this.props.item.description}</td>
                <td>{this.formatDatetime(this.props.item.datetime)}</td>
                <td className={'column-action'}>
                    <SlOptions className={styles.itemActions}
                               onClick={this.handleOptionsClick}/>
                    {this.renderOptionsList()}
                </td>
            </tr>
        )
    }
}

export default InventoryPage