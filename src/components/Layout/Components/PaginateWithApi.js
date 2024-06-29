import React, { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';

const PaginatedItemsWithAPI = ({ pageCount, handleClick, items, componentToRender, updateStatus, onUpdate, fetchData, nameRadio, type, objectAdd, currentPage, selectedList, changeSelectedList, totalItem }) => {
    const isPrevDisable = currentPage + 1 === 1;
    const isNextDisabled = pageCount === currentPage + 1;
    const handlePageClick = (event) => {
        handleClick(event.selected)
    };


    return (
        <>
            {
                items
                &&
                items.map((item, index) => {
                    return React.createElement(componentToRender, { item: item, onChangeStatus: updateStatus, onUpdate: onUpdate, fetchData: fetchData, nameRadio, type, objectAdd, selectedList, changeSelectedList, totalItem });
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
                forcePage={currentPage}
                previousLinkClassName={`paginate-hover ${isPrevDisable ? 'paginate-disabled' : ''}`}
                nextLinkClassName={`paginate-hover ${isNextDisabled ? 'paginate-disabled' : ''}`}
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default PaginatedItemsWithAPI;