import React from "react";
import Button, {ButtonSize, ButtonType} from "../../components/button/Button";
import {AiOutlineCheck} from "react-icons/ai";

const DocumentationPage = () => {

    return (
        <div className={'content'}>
            <div>
                <Button label="Small Primary button"
                        type={ButtonType[0].type}
                        size={ButtonSize[0].size}/>

                <Button label="Default Primary button"
                        type={ButtonType[0].type}
                        size={ButtonSize[1].size}/>

                <Button label="Large Primary button"
                        type={ButtonType[0].type}
                        size={ButtonSize[2].size}/>
            </div>

            <div>
                <Button label="Small Primary outline button"
                        type={ButtonType[1].type}
                        size={ButtonSize[0].size}/>

                <Button label="Default Primary outline button"
                        type={ButtonType[1].type}
                        size={ButtonSize[1].size}/>

                <Button label="Large Primary outline button"
                        type={ButtonType[1].type}
                        size={ButtonSize[2].size}/>
            </div>

            <div>
                <Button label="Small Secondary button"
                        type={ButtonType[2].type}
                        size={ButtonSize[0].size}/>

                <Button label="Default Secondary button"
                        type={ButtonType[2].type}
                        size={ButtonSize[1].size}/>

                <Button label="Large Secondary button"
                        type={ButtonType[2].type}
                        size={ButtonSize[2].size}/>
            </div>

            <div>
                <Button label="Small Secondary button"
                        type={ButtonType[3].type}
                        size={ButtonSize[0].size}/>

                <Button label="Default Secondary button"
                        type={ButtonType[3].type}
                        size={ButtonSize[1].size}/>

                <Button label="Large Secondary button"
                        type={ButtonType[3].type}
                        size={ButtonSize[2].size}/>
            </div>

            <div>
                <Button label="Small Secondary button"
                        type={ButtonType[4].type}
                        size={ButtonSize[0].size}
                        icon={<AiOutlineCheck />}/>

                <Button label="Default Secondary button"
                        type={ButtonType[4].type}
                        size={ButtonSize[1].size}
                        icon={<AiOutlineCheck />}/>

                <Button label="Large Secondary button"
                        type={ButtonType[4].type}
                        size={ButtonSize[2].size}
                        icon={<AiOutlineCheck />}/>

            </div>
        </div>
    );
};

export default DocumentationPage;