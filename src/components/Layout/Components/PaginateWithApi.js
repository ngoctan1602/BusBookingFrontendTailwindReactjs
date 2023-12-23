import React, { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';

const PaginatedItemsWithAPI = ({ pageCount, handleClick, items, componentToRender, updateStatus, onUpdate, fetchData, nameRadio, type, objectAdd }) => {

    const handlePageClick = (event) => {
        handleClick(event.selected)
    };


    return (
        <>
            {
                items
                &&
                items.map((item, index) => {
                    return React.createElement(componentToRender, { item: item, onChangeStatus: updateStatus, onUpdate: onUpdate, fetchData: fetchData, nameRadio, type, objectAdd });
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

export default PaginatedItemsWithAPI;