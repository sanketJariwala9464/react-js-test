import { useEffect, useState } from 'react';
import { Table, Button, Space, Tag } from 'antd';
import { PlusOutlined, ReloadOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import OrderForm from '../components/OrderFormModal';
import { message } from 'antd';
import repositories from "../repositories"


const Home = () => {

  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const [isOpenOrderForm, setOpenOrderForm] = useState(false)

  const OrderTableColumns = [
    {
      title: 'Symbol',
      dataIndex: 'symbol',
    },
    {
      title: 'Order Tag',
      dataIndex: 'order_tag',
    },
    {
      title: 'Request Quantity',
      dataIndex: 'request_quantity',
    },
    {
      title: "Filled Quantity",
      dataIndex: "filled_quantity",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text) => {
        let color = "green";
        if (text == "cancel" || text == "error") {
          color = "red";
        } else if (text == "open") {
          color = "blue";
        }
        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "20px",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" disabled={text == "open"} icon={<EditOutlined />} onClick={() => editOrder(record.order_id)}>Edit</Button>
          <Button type="primary" icon={<CloseOutlined />} danger onClick={() => console.log(record)}>Cancel</Button>
        </Space>
      ),
    },
  ]


  const fetchOrderData = async () => {
    try {
      setLoading(true);
      const response = await repositories.Order.getAll();
      if (response.data.success) {
        setOrderData(response.data.payload);
        setLoading(false);
      } else {
        setLoading(false);
        message.error(response.data.message);
      }
    } catch (error) {
      setLoading(true);
      message.error("Something went wrong");
    }
  }

  const openOrderForm = () => {
    setOpenOrderForm(true);
  }

  const closeOrderForm = () => {
    setOpenOrderForm(false);
  }


  const editOrder = (id) => {
    setOrderId(id);
    openOrderForm();
  }

  useEffect(() => {
    fetchOrderData();
  }, []);

  const hanldeClose = () => {
    fetchOrderData();
    closeOrderForm();
    setOrderId(null);
  }
  
  return (
    <>
      <OrderForm isOpen={isOpenOrderForm} handleClose={hanldeClose} orderId={orderId}/>
      <div>
        <div className='order-buttons'>
          <Space size="middle">
            <Button type="primary" icon={<ReloadOutlined />} onClick={() => fetchOrderData()}>Reload</Button>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => openOrderForm()}>Add Order</Button>
          </Space>
        </div>
        <Table
          columns={OrderTableColumns}
          rowKey={(record) => record.order_id}
          dataSource={orderData}
          loading={loading}
        />
      </div>
    </>
  );
};
export default Home;