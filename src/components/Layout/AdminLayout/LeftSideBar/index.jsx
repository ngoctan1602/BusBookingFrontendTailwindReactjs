import './main.css'

export default function LeftSideBar (){

    const menus =  ["dasbord", "bus", "driver", "route", "ticket", "user", "report"]
    return (
        <div class="side-bar">
            <div class="menu">
                <div>
                    {menus.map((menu, index) => (
                        <div key={index} class="item">
                            <a className='Subbtn'>{menu}
                                <div className="sub-menu">
                                    <a href="#">Sub Item 01</a>
                                    <a href="#">Sub Item 01</a>
                                    <a href="#">Sub Item 01</a>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}