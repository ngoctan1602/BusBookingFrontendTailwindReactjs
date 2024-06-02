import React, { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';

const PaginatedItems = ({ itemsPerPage, items, componentToRender, updateStatus, onUpdate, address, fetchData}) => {
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
            {(currentItems && address) ?
                currentItems.map((item, index) => {
                    return React.createElement(componentToRender, { item: item, onChangeStatus: updateStatus, onUpdate: onUpdate, address: address[index] });
                }
                )
                :
                currentItems.map((item, index) => {
                    return React.createElement(componentToRender, { item: item, onChangeStatus: updateStatus, onUpdate: onUpdate, fetchData: fetchData }, {className:"border-none"});
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
                className="paginate-link p-[20px]"
                previousLinkClassName='paginate-hover'
                nextLinkClassName='paginate-hover'
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default PaginatedItems;