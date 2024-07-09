import { useState, useEffect } from "react";

import magnifyingGlass from "../../assets/images/icons8-magnifying-glass-32.png"
import OrderCard from "../../components/Layout/Components/OderCard";
import * as BillSV from "../../services/BillServices"
import ReactLoading from 'react-loading';
import 'react-toastify/dist/ReactToastify.css';
import Search from "antd/es/input/Search";
import { Empty, Input, Skeleton } from "antd";
import PaginatedItemsWithAPI from "../../components/Layout/Components/PaginateWithApi";

const Order = () => {
    document.title = "Quản lý chuyến đi"

    const [isFocus, setIsFocus] = useState(false);
    const [search, setSearch] = useState("");
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [offsetWidth, setOffsetWidth] = useState(0);
    const [listAbout, setListAbout] = useState(
        [
            {
                id: 1, content: "Tất cả chuyến đi", active: true
            },
            {
                id: 2, content: "Chờ xác nhận", active: false
            },
            {
                id: 3, content: "Đã hoàn thành", active: false
            },
            {
                id: 4, content: "Đã hủy", active: false
            },
        ]
    )

    const getActiveItem = () => {
        return listAbout.find(item => item.active === true).id;
    };
    const activeListAbout = async (offsetWidth, offsetLeft, id) => {
        const updatedItems = listAbout.map(item => {
            if (item.id === id) {
                return { ...item, active: true };
            }

            return { ...item, active: false };
        });

        setOffsetLeft(offsetLeft);
        setOffsetWidth(offsetWidth);
        setTotalPage(0);
        setPageCurrent(0);
        setListAbout(updatedItems);
        fetchData(id);
    }

    const [listOrder, setListOder] = useState([]);
    useEffect(() => {
        fetchData(getActiveItem());

    }, []);
    const [pageCurrent, setPageCurrent] = useState(0)
    const [totalPage, setTotalPage] = useState(0);
    const fetchData = async (id) => {
        setLoading(true)
        try {
            var response;
            if (id === 1) {
                response = await BillSV.getAllBillinUser({ pageSize: 10, pageIndex: pageCurrent + 1 });
            }
            else if (id === 2) {
                response = await BillSV.getAllInWaitingStatus({ pageSize: 10, pageIndex: pageCurrent + 1 });
            }
            else if (id === 3) {
                response = await BillSV.getAllInCompleteStatus({ pageSize: 10, pageIndex: pageCurrent + 1 });
            }
            else if (id === 4) {
                response = await BillSV.getAllInDeleteStatus({ pageSize: 10, pageIndex: pageCurrent + 1 });
            }

            console.log(response.data.items)
            if (!response.isError) {
                setListOder(response.data.items)
                setTotalPage(response.data.pageTotal)
            }
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchData(getActiveItem());
    }, [pageCurrent])
    const handlePageClick = (selectedPage) => {
        setPageCurrent(selectedPage);
    };


    const [loading, setLoading] = useState(false);
    const updateLoading = () => {
        setLoading(true)
    }
    return (
        <div class='w-full h-full flex border-none outline-none overflow-hidden text-txt text-16'>
            <div class='w-full shrink-0 bg-bg  flex flex-col items-center relative'>
                <p class='font-bold p-lg text-center mx-md bg-bg w-full'>Quản lý chuyến đi</p>
                <div class='w-content grid grid-flow-row grid-cols-4 relative'>
                    {
                        listAbout.map((item, index) => (
                            <div class='text-center border-b-[2px] border-txt cursor-pointer py-sm'
                                style={{ color: item.active ? "#33475B" : "", fontWeight: item.active ? "700" : "" }}
                                onClick={(e) => activeListAbout(e.target.offsetWidth, e.target.offsetLeft, item.id)}>
                                {item.content}
                            </div>
                        ))
                    }
                    <span class='h-[2px] bottom-position ease-in-out duration-500 bg-[#97D163]' style={{ left: `${offsetLeft}px`, width: `${offsetWidth}px` }}></span>
                </div>
                <div className="my-md w-content h-[50px]">
                    <Search placeholder="Tìm kiếm chuyến đi" allowClear onSearch={() => alert("Đã tìm kiếm")}></Search>
                </div>
                {loading ?
                    // <div className="animate-pulse bg-hover-txt w-content h-[400px] text-bg text-center">

                    // </div>
                    <div className="w-content h-[400px]">
                        <Skeleton className="my-md" active></Skeleton>
                        <Skeleton className="my-md" active></Skeleton>
                        <Skeleton className="my-md" active></Skeleton>
                    </div>
                    :

                    !loading && listOrder.length > 0 ?

                        <PaginatedItemsWithAPI handleClick={handlePageClick} componentToRender={OrderCard} items={listOrder} pageCount={totalPage} currentPage={pageCurrent}></PaginatedItemsWithAPI>
                        :
                        <Empty description="Không có chuyến đi nào"></Empty>
                }
            </div>

        </div>
    );
}

export default Order;