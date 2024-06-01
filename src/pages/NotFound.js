import { useLocation } from 'react-router-dom';
// const location = useLocation();
// const currentUrl = location.pathname;

const NotFound = () => {
    console.log("hello")
    return (
        <div className='absolute top-[10%] left-[35%] text-center'>
            <div
             className=' p-[100px] relative h-[400px]'>
                <p className='text-[30px] uppercase'>Not Found</p>
                <h1 className='text-[200px] font-bold absolute top-[30%] left-[15%] '>
                    <span className='drop-shadow-2xl'>4</span>
                    <span>0</span>
                    <span>4</span>
                </h1>
             </div>
             <h2 className=' uppercase'>we are sorry, but the page you requested was not found</h2>
        </div>
    );
}

export default NotFound;