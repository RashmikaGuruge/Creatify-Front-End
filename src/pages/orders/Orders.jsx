import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import newRequest from './../../utils/newRequest';
import { useQuery } from '@tanstack/react-query';

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  const fetchUserName = async (uid) => {
    try {
      const response = await newRequest.get(`/users/${uid}`);
      const user = response.data;
      return user.username;
    } catch (err) {
      console.log(err);
      return 'Unknown User';
    }
  }

  const renderOrders = async () => {
    const rows = [];

    for (const order of data) {
      const userName = await fetchUserName(currentUser.isSeller ? order.buyerId : order.sellerId);

      rows.push({
        orderId: order._id,
        imageSrc: order.img,
        title: order.title,
        price: order.price,
        userName: userName,
        sellerId: order.sellerId,
        buyerId: order.buyerId
      });
    }

    return rows;
  }

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    renderOrders().then((orders) => setOrders(orders));
  }, [data]);

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
 
  return (
    <div className="orders">
      {isLoading ? ("loading") : error ? ("something went wrong!") : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                {<th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>}
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>
                    <img
                      className="image"
                      src={order.imageSrc}
                      alt=""
                    />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>{order.userName}</td>
                  <td>
                    <img className="message" src="./img/message.png" alt="" onClick={() => handleContact(order)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
