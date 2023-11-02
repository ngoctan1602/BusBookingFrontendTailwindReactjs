import React, { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';

const PaginatedItems = ({ itemsPerPage, items, componentToRender, updateStatus }) => {
    const [itemOffset, setItemOffset] = useState(0);
    // const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };


    return (
        <>
            {currentItems &&
                currentItems.map((item) => {
                    return React.createElement(componentToRender, { item: item, onChange: updateStatus });
                }
                )
            }
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                pageClassName="paginate-link-item"
                pageLinkClassName="paginate-hover"
                activeLinkClassName="active-link"
                className="paginate-link"
                previousLinkClassName='paginate-hover'
                nextLinkClassName='paginate-hover'
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default PaginatedItems;