import { Form, Pagination, Select, Spin } from "antd";
import { useState } from "react";
const { Option } = Select;
const SelectOption = ({ props, data, loading, handleChangePage, handleChangeSelected, itemSelected }) => {
    // const [loading, setLoading] = useState(false)
    // console.log(data)
    const handleChange = (value) => {
        handleChangeSelected(value)
    };
    return (
        <div>
            {loading ?
                <Form.Item
                    hasFeedback
                    name={props.name !== null && props.name !== undefined && props.name}
                    label={props.label !== null && props.label !== undefined && props.label}
                    rules={[
                        {
                            required: true,
                            message: props.name !== null && props.name !== undefined && String(props.message)
                        }
                    ]}
                >
                    <Select

                        style={{ width: "100%" }}
                        placeholder={props.placeholder !== null && props.placeholder !== undefined && props.placeholder}
                        dropdownRender={menu => (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
                                    <Spin />
                                </div>
                            </>
                        )}
                    >
                        <Option >
                        </Option>
                    </Select>
                </Form.Item> :
                <Form.Item
                    name={props.name !== null && props.name !== undefined && props.name}
                    label={props.label !== null && props.label !== undefined && props.label}
                    rules={[
                        {
                            required: true,
                            message: String(props.message)
                        }
                    ]}
                >
                    <Select
                        // value={Number(itemSelected)}
                        style={{ width: "100%" }}
                        placeholder={props.placeholder !== null && props.placeholder !== undefined && props.placeholder}
                        onChange={(handleChangeSelected !== null && handleChangeSelected !== undefined) ? handleChange : null}
                        dropdownRender={menu => (
                            <>
                                {menu}
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
                                    <Pagination
                                        simple
                                        current={data.pageCurrent}
                                        pageSize={10}
                                        total={data.totalPage}
                                        onChange={handleChangePage}
                                    />
                                </div>
                            </>
                        )}
                    >

                        {
                            data.data !== undefined && data.data !== null && data.data.length > 0
                            &&
                            data.data.map((item, index) => (
                                <Option key={item.id} value={item.id} >
                                    {props.key.map((i, j) => <>
                                        {(
                                            props.key.length > 0 && j === 0)
                                            ?
                                            item[`${i}`] + " - " :
                                            i === "value" ?
                                                item[`${i}`] + "%" :
                                                item[`${i}`]
                                        }
                                    </>
                                    )}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>

            }
        </div >
    );
}

export default SelectOption
