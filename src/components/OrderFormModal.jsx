import PropTypes from 'prop-types';
import { Modal, Form, Input, Button, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import repositories from "../repositories"

const OrderForm = (props) => {
    const [form] = Form.useForm();

    const [orderPayload, setOrderPayload] = useState({
        symbol: "",
        quantity: 10,
        order_id: null,
    })

    const [isBtnLoading, setBtnLoading] = useState(false)

    const handleOk = async () => {
        form
            .validateFields()
            .then(async () => {
                setBtnLoading(true);
                if (!orderPayload.order_id) {
                    const response = await repositories.Order.create(orderPayload);
                    if (response.data.success) {
                        setBtnLoading(false);
                        clearForm();
                        props.handleClose();
                        message.success(response.data.message);
                    } else {
                        setBtnLoading(false);
                        message.error(response.data.message);
                    }
                } else {
                    const response = await repositories.Order.update(orderPayload);
                    if (response.data.success) {
                        setBtnLoading(false);
                        clearForm();
                        props.handleClose();
                        message.success(response.data.message);
                    } else {
                        setBtnLoading(false);
                        message.error(response.data.message);
                    }
                }
            })
            .catch(() => {
                setBtnLoading(false);
                return false;
            });
    }

    const clearForm = () => {
        form.resetFields();
        orderPayload.order_id = null;
        orderPayload.symbol = "";
        orderPayload.quantity = 10;
    }

    const changeValue = (changedValues, allValues) => {
        orderPayload.symbol = allValues.symbol;
        orderPayload.quantity = allValues.quantity;
        form.setFieldValue("symbol", allValues.symbol);
        form.setFieldValue("quantity", allValues.quantity);
    }

    const getSingle = async (id) => {
        try {
            const response = await repositories.Order.get(id);
            if (response.data.success) {
                // setOrderPayload(prev => ({...prev, 
                //     symbol: response.data.payload.symbol,
                //     quantity: response.data.payload.request_quantity,
                //     order_id: response.data.payload.order_id,
                // }));
                orderPayload.symbol = response.data.payload.symbol;
                orderPayload.quantity = response.data.payload.request_quantity;
                orderPayload.order_id = response.data.payload.order_id;
                form.setFieldValue("symbol", response.data.payload.symbol);
                form.setFieldValue("quantity", response.data.payload.request_quantity);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error("Something went wrong");
        }
    }

    const hanldeCancel = () => {
        clearForm();
        props.handleClose();
    }

    useEffect(() => {
        if (props.isOpen) {
            clearForm();
            form.setFieldValue("symbol", orderPayload.symbol);
            form.setFieldValue("quantity", orderPayload.quantity);
        }
    }, [props.isOpen]);

    useEffect(() => {
        if (props.orderId) {
            getSingle(props.orderId);
        }
    }, [props.orderId]);

    return (
        <>
            <Modal
                title="Add Order"
                open={props.isOpen}
                onOk={handleOk}
                onCancel={hanldeCancel}
                footer={[
                    <Button key="back" onClick={hanldeCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={isBtnLoading} onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <Form name="create-order" layout="vertical" autoComplete="off" form={form} onValuesChange={changeValue}>
                    <Form.Item label="Symbol" name="symbol"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your symbol!',
                            },
                        ]}
                    >
                    <Input />
                    </Form.Item>

                    <Form.Item label="Quantity" name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your quantity!',
                            },
                            {
                                type: 'number',
                                min: 1,
                                max: 20,
                                message: 'Please input between 1 and 20',
                            }
                        ]}
                    >
                    <InputNumber />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

OrderForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    orderId: PropTypes.string,
};

export default OrderForm;