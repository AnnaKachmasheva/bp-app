import React, {Component, useMemo, useState} from "react";
import styles from './Nav.module.scss';
import {AiOutlinePlus} from "react-icons/ai";
import {BsQrCodeScan} from "react-icons/bs";
import {PageTitles, QRScanLibraries} from "../../utils/Constants";
import {ModalAddUser} from "../../pages/users-page/window-add-user/ModalAddUser";
import {ModalAddTag} from "../../pages/users-page/window-add-tag/ModalAddTag";
import Button, {ButtonSize, ButtonType} from "../button/Button";
import {ModalProduct} from "../../pages/inventory-page/modalWindowProduct/ModalProduct";
import MOCK_DATA from "../../pages/inventory-page/MOCK_DATA.json";
import {ModalScanQRCode} from "../scanner/window-scan-QR/ModalScanQRCode";

const Nav = (props) => {

    const mocData = useMemo(() => MOCK_DATA, []);

    const scanMethodOptions = QRScanLibraries;

    const [showDropdownListLibraries, setShowDropdownListLibraries] = useState(false);
    const [showAddItem, setShowAddItem] = useState(false);
    const [showAddTag, setShowAddTag] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);

    const [showModalScanQr, setShowModalScanQr] = useState(false);
    const [scanMethod, setScanMethod] = useState(QRScanLibraries[0]);
    const [data, setData] = useState(null);

    const toggleDropdownListLibraries = () => {
        setShowDropdownListLibraries(!showDropdownListLibraries);
    };

    const handleSelectScanLibrary = (library) => {
        setScanMethod(library);
        setShowModalScanQr(true);
    };

    const handleData = data => {
        setData(data);
    }

    function renderAddButton(title) {
        switch (title) {
            case PageTitles.USERS:
                return (<Button type={ButtonType[0].type}
                                size={ButtonSize[1].size}
                                onClick={() => setShowAddUser(true)}
                                label={<AddButtonContent title={PageTitles.USERS}/>}
                                icon={<AiOutlinePlus/>}/>)
            case PageTitles.TAGS:
                return (<Button type={ButtonType[0].type}
                                size={ButtonSize[1].size}
                                onClick={() => setShowAddTag(true)}
                                label={<AddButtonContent title={PageTitles.TAGS}/>}
                                icon={<AiOutlinePlus/>}/>)
            case PageTitles.INVENTORY:
                return (<Button type={ButtonType[0].type}
                                size={ButtonSize[1].size}
                                onClick={() => setShowAddItem(true)}
                                label={<AddButtonContent title={PageTitles.INVENTORY}/>}
                                icon={<AiOutlinePlus/>}/>)
            default:
                return null;
        }
    }

    function renderSearchInput(title) {
        function handleContainerScanLibraries() {
            setShowDropdownListLibraries(false);
        }

        switch (title) {
            case PageTitles.INVENTORY:
                return (
                    <div>
                        <div className={styles.searchInput}>
                            <div className="input-group">

                                <input type="text"
                                       placeholder="Search"
                                />
                            </div>

                            <Button type={ButtonType[3].type}
                                    size={ButtonSize[2].size}
                                    onClick={toggleDropdownListLibraries}
                                    icon={<BsQrCodeScan/>}/>
                        </div>

                        {showDropdownListLibraries && (
                            <div>
                                <div className='container-list-options'
                                     onClick={handleContainerScanLibraries}>
                                </div>

                                <ul className={styles.libraries}>
                                    {QRScanLibraries.map((library, index) =>
                                        <li value={library.name}
                                            onClick={() => handleSelectScanLibrary(library)}>
                                            {library.name} - Version {library.version}
                                        </li>)}
                                </ul>
                            </div>

                        )}
                    </div>)
            default:
                return null;
        }
    }

    return (
        <div>
            <ModalProduct onClose={() => setShowAddItem(false)}
                          title={"Add product"}
                          categories={mocData.categories}
                          show={showAddItem}/>

            <ModalAddUser onClose={() => setShowAddUser(false)}
                          show={showAddUser}/>
            <ModalAddTag onClose={() => setShowAddTag(false)}
                         show={showAddTag}/>

            <ModalScanQRCode onClose={() => setShowModalScanQr(false)}
                             show={showModalScanQr}
                             data={data}
                             handleData={handleData}
                             scanMethod={scanMethod}/>

            <div className={styles.navBarContainer.concat(' nav')}>
                <span>{props.title}</span>
                {renderSearchInput(props.title)}
                {renderAddButton(props.title)}
            </div>

        </div>
    );
};

class AddButtonContent extends Component {

    getItemToAdd = () => {
        switch (this.props.title) {
            case PageTitles.USERS:
                return 'user'
            case PageTitles.TAGS:
                return 'tag'
            case PageTitles.INVENTORY:
                return 'item'
            default:
                return ''
        }
    };

    render() {
        const itemToAdd = this.getItemToAdd();

        return (
            <div>
                Add {itemToAdd}
            </div>
        )
    }
}

export default Nav;