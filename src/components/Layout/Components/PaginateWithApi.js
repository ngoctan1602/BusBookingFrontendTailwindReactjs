import React, { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';

const PaginatedItemsWithAPI = ({ pageCount, handleClick, items, componentToRender, updateStatus, onUpdate, fetchData, nameRadio, type, objectAdd, currentPage, selectedList, changeSelectedList }) => {

    const handlePageClick = (event) => {
        // console.log(event.selected)
        handleClick(event.selected)
    };


    return (
        <>
            {
                items
                &&
                items.map((item, index) => {
                    return React.createElement(componentToRender, { item: item, onChangeStatus: updateStatus, onUpdate: onUpdate, fetchData: fetchData, nameRadio, type, objectAdd, selectedList, changeSelectedList });
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
                previousLinkClassName='paginate-hover'
                nextLinkClassName='paginate-hover'
                renderOnZeroPageCount={null}
            />
        </>
    );
}

export default PaginatedItemsWithAPI;