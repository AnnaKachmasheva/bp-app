import React, {useState} from "react";
import styles from './Pagination.module.scss';


const itemsPerPage = 5;

const Pagination = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(props.data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={styles.pagination}>
            {/* Pagination controls */}
            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    {'<'}
                </button>

                {/* Display page numbers */}
                {Array.from({length: totalPages}, (_, index) => (
                    <button
                        className={styles.numberPage}
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    {'>'}
                </button>
            </div>
        </div>
    );
};

export default Pagination;