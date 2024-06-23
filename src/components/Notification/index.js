import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'reactjs-popup/dist/index.css';

dayjs.extend(relativeTime);

const NotificationComponent = ({ getNotifications, directNotification, notifiData, counter }) => {
  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return (
    <div className="col-span-1 col-start-11">
      <div className="relative">
        <Popup
          trigger={
            <button className="flex justify-center cursor-default">
              <button className="" onClick={getNotifications}>
                <FontAwesomeIcon
                  icon={faBell}
                  color="#5C98FF"
                  className='cursor-pointer w-[full] h-[20px] hover:text-[#307BFD] ease-in-out duration-200'
                />
                <span className="text-text-red text-[14px] absolute top-[-50%] left-[10%]">{counter}</span>
              </button>
            </button>
          }
          position="top right"
          modal
          nested
          closeOnDocumentClick={true}
        >
          {close => (
            <div className='text-16 text-txt min-h-[100px] relative'>
              <div className='bg-[#3F5F97] p-[10px] rounded-[8px] w-full h-[100px] text-center'>
                <p className='text-20 text-txt-light p-[5px]'>Thông báo của bạn</p>
                <p className='text-10 text-txt-light p-[5px]'>Bạn đang có <span className="font-bold">{counter}</span> thông báo chưa đọc</p>
              </div>
              <div className='w-full my-md gap-sm grid max-h-[300px] min-h-[300px] overflow-auto'>
                {notifiData.length > 0 ? (
                  <div className="grid h-[100px]">
                    {notifiData.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          directNotification(item);
                          close();
                        }}
                        className={`p-[10px] rounded-lg ${item.status === 2 ? 'bg-notification' : ''} hover:bg-notificationNotRead flex justify-between`}
                      >
                        <div className="px-[5px]">
                          {item.content}
                          <div className="text-[12px] ml-[20px] mt-[1px] text-left text-txt-final">
                            {dayjs(item.dateCreate).from()}
                          </div>
                        </div>
                        {item.status === 2 && <div><p className="text-text-red">*</p></div>}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-txt">Không có thông báo mới</div>
                )}
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

export default NotificationComponent;
