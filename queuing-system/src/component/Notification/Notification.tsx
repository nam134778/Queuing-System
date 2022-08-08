import React from "react";
import 'antd/dist/antd.css';
import imagelogo from '../Images/Logoalta.png';
import "../Menubar/Menubar.css";
import { MoreOutlined, BellFilled } from '@ant-design/icons';
import {Menu, Button, Popover, Typography, List } from 'antd';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../store/index'
import { userSelector} from "../../store/reducers/userSlice";
import { matchPath } from "react-router-dom";
import { useState } from "react";
import {
    giveNumberSelector,
    getAll,
} from "../../store/reducers/giveNumberSlice";
import moment from "moment";
import './Notify.css';
const { Title, Text } = Typography;
const Notification = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, giveNumbers } = useAppSelector(giveNumberSelector);
    const { userLogin } = useAppSelector(userSelector);
    const [showNotify, setShowNotify] = useState<boolean>(false);
 return (
    <div className="notifyContainer">
                    <Button
                        type="primary"
                        className="BellNotify"
                        shape="circle"
                        icon={<BellFilled />}
                        onClick={() => setShowNotify(!showNotify)}
                    />
                    <List
                        className="PopupMenu"
                        style={{ display: showNotify ? "block" : "none" }}
                        header={
                            <Typography.Title className="title">
                                Thông báo
                            </Typography.Title>
                        }
                        bordered
                        dataSource={giveNumbers}
                        renderItem={(item) => (
                            <List.Item
                                className="item"
                                onClick={() => {
                                    navigate(`../provider/detail/${item.id}`);
                                    setShowNotify(false);
                                }}
                            >
                                <List.Item.Meta
                                    title={
                                        <Typography.Text
                                            style={{
                                                fontSize: "16px",
                                                color: "#BF5805",
                                            }}
                                        >
                                            Người dùng: {item.name}
                                        </Typography.Text>
                                    }
                                    description={
                                        <Typography.Text
                                            style={{
                                                fontSize: "16px",
                                                color: "#535261",
                                                fontWeight: 400,
                                            }}
                                        >
                                            Thời gian nhận số:{" "}
                                            {moment(
                                                item.timeGet.toDate()
                                            ).format("HH:mm") +
                                                " ngày " +
                                                moment(
                                                    item.timeGet.toDate()
                                                ).format("DD/MM/YYYY")}
                                        </Typography.Text>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
 )
}

export default Notification;