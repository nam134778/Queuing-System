import React from "react";
import 'antd/dist/antd.css';
import "../Devices/devices.css";
import {
    CaretDownOutlined,
    UploadOutlined,
    UserOutlined,
    SearchOutlined,
    CaretRightFilled ,
    CaretLeftFilled ,
    VideoCameraOutlined,
    BellFilled } from '@ant-design/icons';
import { Avatar, Badge, Card, Select, Input, DatePicker, Space, InputNumber, Form, Typography, Layout, Menu, Breadcrumb, Button, Tooltip, Dropdown, Row, Col } from 'antd';
import { Table, Divider, Tag } from 'antd';
import EditIcon from "../Icons/EditIcon";
import RollbackIcon from "../Icons/RollbackIcon";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Moment } from "moment";
import { RangeValue } from "rc-picker/lib/interface";
import { useAppSelector, useAppDispatch } from "../../store";
import { serviceSelector, get } from "../../store/reducers/serviceSlice";
import {
    giveNumberSelector,
    getByIdService,
} from "../../store/reducers/giveNumberSlice";
import { userSelector } from "../../store/reducers/userSlice";
import Menubar from "../Menubar/Menubar";
import { Link, Navigate } from "react-router-dom";
import   Notification  from "../Notification/Notification";

const { Option } = Select;
const {RangePicker} = DatePicker;


  const { Header, Content, Sider } = Layout;
  function itemRender(current:any, type:any, originalElement:any) {
    if (type === "prev") {
      return <Button style={{border:"none",background:"none"}}><CaretLeftFilled style={{fontSize:"1.2rem",color:"rgba(126, 125, 136, 1)"}}/></Button>;
    }
    if (type === "next") {
      return <Button style={{border:"none",background:"none"}}><CaretRightFilled style={{fontSize:"1.2rem",color:"rgba(126, 125, 136, 1)"}}/></Button>;
    }
    return originalElement;
  }
  const menu = (
    <Menu
      items={[
        {
          label: <a href="https://www.antgroup.com">1st menu item</a>,
          key: '0',
        },
        {
          label: <a href="https://www.aliyun.com">2nd menu item</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: '3rd menu item',
          key: '3',
        },
      ]}
    />
  );
  const columns = [
    {
        title: "Số thứ tự",
        key: "stt",
        dataIndex: "stt",
    },
    {
        title: "Trạng thái",
        key: "status",
        dataIndex: "status",
    },
];
const ServiceDetails = () => {
    const idLogin = localStorage.getItem("userId");
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { service } = useAppSelector(serviceSelector);
    const { loading, giveNumbersFilter } = useAppSelector(
        giveNumberSelector
    );
    const { userLogin } = useAppSelector(userSelector);
    const [status, setStatus] = useState<string | null>(null);
    const [keywords, setKeywords] = useState<string>("");
    const [dateRange, setDateRange] = useState<RangeValue<Moment>>(null);
    const [active, setActive] = useState<boolean | null>(null);
    const [value, setValue] = useState<string>('')
    useEffect(() => {
        if (id) {
            dispatch(
                getByIdService({
                    id,
                    filter: {
                        status,
                        keywords,
                        dateRange: dateRange
                            ? [dateRange[0] as Moment, dateRange[1] as Moment]
                            : null,
                    },
                })
            );
        }
    }, [id, status, keywords, dateRange]);
    useEffect(() => {
        if (id) {
            dispatch(get(id));
        }
    }, [id]);

    if (!idLogin) return <Navigate to="/login"></Navigate>;
    return (
        <div>
<Layout style={{"height":"100vh","fontFamily":"Nunito"}}>
    <Sider
    style={{background:"white"}}
    >
      <Menubar />
    </Sider>
    <Layout>
    <Header
                className="header"
                >
                    <Row style={{marginTop:"25px"}}>
                    <Col span={8}>
                     <Breadcrumb separator=">" style={{fontWeight:"700",fontSize:"20px",color: "#7E7D88"}}>
                        <Breadcrumb.Item>Thiết bị</Breadcrumb.Item>
                        <Breadcrumb.Item href="/devices">Danh sách dịch vụ</Breadcrumb.Item>
                        <Breadcrumb.Item>Chi tiết</Breadcrumb.Item>
                      </Breadcrumb>
                    </Col>
                        <Col span={12}></Col>
                        <Col 
                        span={1}>
                        <Notification />
                        </Col>
                    <Col span={3}>
                        <Row>
                        <Col span={6}>
                        <Avatar size="large" icon={<UserOutlined />} />
                        </Col >
                        <Col 
                        span={18}
                        style={{marginTop:"-0.7rem"}}
                        >
                        <Link to='/profile'>
                            <Row><Typography.Text>Xin chào</Typography.Text></Row>
                            <Row><Typography.Text  style={{marginTop:"-40px", fontWeight:"700"}}>{userLogin?.name}</Typography.Text ></Row>
                        </Link>
                        </Col>
                        </Row>
                    </Col>
                    </Row>
                </Header>
                <Content
        style={{
          margin: '31px 0rem 0 3rem',
        }}
      >
        <div
          className="site-layout-background"
        >
          <p style={{fontSize:"28px",color:"#FF7506",fontWeight:"700"}}>Quản lý dịch vụ</p>
        </div>
        <Row>
          <Col span={8}>
          <Form layout="vertical" className="section">
            <Card style={{borderRadius:"20px",height:"650px", paddingLeft:"10px"}}>
                <Row>
                    <Col>
                        <Typography.Title className="title" style={{fontSize:"24px",color:"#FF7506",fontWeight:"700"}}>
                            Thông tin dịch vụ
                        </Typography.Title>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <Col>
                        <Row>
                        <Typography.Text style={{fontSize:"16px", fontWeight:"700"}}>Mã dịch vụ:</Typography.Text>
                        <Typography.Text style={{fontSize:"16px", marginLeft:"70px"}}> {service?.code}</Typography.Text>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <Col>
                        <Row>
                        <Typography.Text style={{fontSize:"16px", fontWeight:"700"}}>Tên dịch vụ:</Typography.Text>
                        <Typography.Text style={{fontSize:"16px", marginLeft:"65px"}}> {service?.name}</Typography.Text>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <Col>
                        <Row>
                        <Typography.Text style={{fontSize:"16px", fontWeight:"700"}}>Mô tả:</Typography.Text>
                        <Typography.Text style={{fontSize:"16px", marginLeft:"105px"}}> {service?.description}</Typography.Text>
                        </Row>
                    </Col>
                </Row>
                <Row style={{marginTop:"30px"}}>
                    <Col>
                        <Typography.Title className="title" style={{fontSize:"24px",color:"#FF7506",fontWeight:"700"}}>
                            Quy tắc cấp số
                        </Typography.Title>
                    </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                <Col span={7}>
                                <Typography.Text style={{fontSize:"16px", fontWeight:"700"}}>
                                    Tăng tự động:
                            </Typography.Text>
                        </Col>
                        <Col span={17} style={{marginTop:"-5px"}}>
                            <Row>
                            { service?.isAuto ? (
                                <>
                                {" "}
                                <Form.Item>
                                <InputNumber 
                                    readOnly
                                    value={service?.increaseStart}
                                    size="large"
                                    style={{borderRadius:"8px"}}
                                />
                            </Form.Item>
                            <Typography.Text style={{margin:"0 30px", marginTop:"5px", fontSize:"16px", fontWeight:"500"}}>đến</Typography.Text>
                            <Form.Item>
                                <InputNumber 
                                    readOnly
                                    value={service?.increaseEnd}
                                    size="large"
                                    style={{borderRadius:"8px"}}
                                />
                            </Form.Item>
                                </>
                            ) : (<Typography.Text style={{margin:"0 30px", marginTop:"5px", fontSize:"16px", fontWeight:"500", marginLeft:"5px"}}>Không xác định</Typography.Text>)}
                            </Row>
                        </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                <Col span={7}>
                                <Typography.Text style={{fontSize:"16px", fontWeight:"700"}}>
                                    Prefix:
                            </Typography.Text>
                        </Col>
                        <Col span={17} style={{marginTop:"-5px"}}>
                            <Row>
                                { service?.isPrefix ? (
                                    <>
                                    {" "}
                                    <Form.Item>
                                <InputNumber 
                                    readOnly
                                    value={service?.prefix}
                                    size="large"
                                    style={{borderRadius:"8px"}}
                                />
                            </Form.Item>
                                    </>
                                ) : (<Typography.Text style={{margin:"0 30px", marginTop:"5px", fontSize:"16px", fontWeight:"500", marginLeft:"5px"}}>Không xác định</Typography.Text>)
                                }
                            </Row>
                        </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                <Col span={7}>
                                <Typography.Text style={{fontSize:"16px", fontWeight:"700"}}>
                                    Surfix:
                            </Typography.Text>
                        </Col>
                        <Col span={17} style={{marginTop:"-5px"}}>
                            <Row>
                            { service?.isSurfix ? (
                                    <>
                                    {" "}
                                    <Form.Item>
                                <InputNumber 
                                    readOnly
                                    value={service?.surfix}
                                    size="large"
                                    style={{borderRadius:"8px"}}
                                />
                            </Form.Item>
                                    </>
                                ) : (<Typography.Text style={{margin:"0 30px", marginTop:"5px", fontSize:"16px", fontWeight:"500", marginLeft:"5px"}}>Không xác định</Typography.Text>)
                                }
                            </Row>
                        </Col>
                </Row>
                <Row style={{marginTop:"20px"}}>
                <Col span={10}>
                                <Typography.Text style={{fontSize:"16px", fontWeight:"700"}}>
                                    { service?.reset? "Reset mỗi ngày" : "Không reset mỗi ngày"}
                            </Typography.Text>
                        </Col>
                </Row>
            </Card>
        </Form>
          </Col>
          <Col span={1}>
          </Col>
          <Col span={13}>
          <Card style={{borderRadius:"20px",height:"650px"}}>
                <Form layout="vertical">
                <Row justify="space-between" className='inputContainer'>
                  <Col>
                    <Space>
                      <Form.Item
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px"}}>Trạng thái</Typography.Text>}
                      className='selectContainer'
                      >      
                        <Select 
                        size="large"
                        defaultValue={null}
                        value={status}
                        onChange={(value) =>
                            setStatus(value)
                        }
                        style={{width:"200px", height:"50px", borderRadius:"10px"}} className="first-select" suffixIcon={
                          <CaretDownOutlined
                            style={{ fontSize: "20px", color: "#FF7506" }}
                          />
                        }>
                            <Option value={null}>
                                Tất cả
                            </Option>
                            <Option value="used">
                                Đã hoàn thành
                            </Option>
                            <Option value="waiting">
                                Đang thực hiện
                            </Option>
                            <Option value="skip">
                                Vắng
                            </Option>
                              </Select>
                          </Form.Item>
                          <Form.Item
                      label={<Typography.Text strong className="text-1" style={{fontSize:"16px", marginLeft:"10px"}}>Chọn thời gian</Typography.Text>}
                      >      
                            <div className="date-pick1" style={{marginLeft:"10px"}}>
                              <RangePicker format="DD/MM/YYYY" style={{height:"52px",fontSize:"24px",width:"320px"}} onChange={(e) =>setDateRange(e)}
                                />
                            </div>
                          </Form.Item>
                      </Space>
                    </Col>
                    <Col>
                      <Form.Item
                        label={<Typography.Text strong className="text-3" style={{fontSize:"16px"}}>Từ khóa</Typography.Text>}
                      >
                            <Input
                              type="text"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              onPressEnter={(e) => setKeywords(value)}
                            placeholder="Nhập từ khóa" style={{ width: '300px', height:"50px" }} className="thirst-select" size="large" suffix={<SearchOutlined style={{fontSize:"20px", color:"#FF7506"}}/>}/>
                      </Form.Item>
                    </Col>
                  
                </Row>
                            <Row>
                                <Col span={24}>
                                    <Table
                                        columns={columns}
                                        loading={loading}
                                        dataSource={giveNumbersFilter.map(
                                            (giveNumber) => {
                                                return {
                                                    key: giveNumber.id,
                                                    stt: giveNumber.number,
                                                    status: (
                                                        <Badge color={giveNumber.status == "skip" ? 'volcano' : giveNumber.status == "waiting" ? 'blue' : 'rgb(190, 190, 190)'} text={giveNumber.status == "waiting"
                                                        ? "Đang thực hiện"
                                                        : giveNumber.status ==
                                                          "used"
                                                        ? "Đã hoàn thành"
                                                        : "Vắng"} />
                                                      ),
                                                };
                                            }
                                        )}
                                        bordered
                                        size="middle"
                                        pagination={
                                            {pageSize: 7, itemRender: itemRender}
                                          }
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                    </Col>
          <Col span={2}>
            <Row>
            <Button
            // type="primary"
            className="add"
            style={{marginLeft:"1rem",height:"100px",width:"80px", fontWeight:"700", position:"absolute",right:"0",textAlign:"center",background:"#FFF2E7"}}
            >
               <Link to={`/edit-service/${service?.id}`}><EditIcon /><br />
                Cập nhật<br/>thiết bị</Link></Button>
            </Row>
            <Row>
            <Button
            // type="primary"
            className="add"
            style={{marginLeft:"1rem",height:"100px",width:"80px", fontWeight:"700", position:"absolute",right:"0",textAlign:"center",background:"#FFF2E7",marginTop:"110px"}}
            >
               <Link to={`/services`}><RollbackIcon /><br />
                Quay lại</Link></Button>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  </Layout>
        </div>
    )
}

export default ServiceDetails;