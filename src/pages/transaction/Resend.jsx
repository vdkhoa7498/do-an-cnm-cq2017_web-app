import { useEffect, useState } from "react";
import "./styles.scss";
import { Table, Divider, Input } from "antd";
const { TextArea } = Input;
const columns = [
  {
    title: "From address",
    dataIndex: "sendback_txs_from_address",
    key: "sendback_txs_from_address",
    render: text => {return(<TextArea style={{border: "none"}} autoSize={{ minRows: 2, maxRows: 6 }} value={text} />)},
  },
  {
    title: "To address",
    dataIndex: "sendback_txs_to_address",
    key: "sendback_txs_to_address",
    render: (text) => {
      return <TextArea style={{border: "none"}} autoSize={{ minRows: 2, maxRows: 6 }} value={text} />;
    },
  },
  {
    title: "Amount",
    dataIndex: "sendback_txs_amount",
    key: "sendback_txs_amount",
  },
  {
    title: "Date",
    dataIndex: "sendback_txs_timestamp",
    key: "sendback_txs_timestamp",
    render: (resendDate) => {
      const date_ob = new Date(resendDate);
      console.log(date_ob);
      const year = date_ob.getFullYear();
      const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      const date = ("0" + date_ob.getDate()).slice(-2);

      const hours = ("0" + date_ob.getHours()).slice(-2);
      const minutes = ("0" + date_ob.getMinutes()).slice(-2);
      const seconds = ("0" + date_ob.getSeconds()).slice(-2);
      return (
        <span>
          {year}/{month}/{date} - {hours}:{minutes}:{seconds}
        </span>
      );
    },
  },
];

const sample = [
  {
    sendback_txs_from_address:
      "04eb0fbee3f7ea657d0343a33c812d7114d5d2ab7fabb1456fb3b4888382a18042f10038d5997e256ccd9592367af1da16fc683051aa02d2c4512148d4899353ff",
    sendback_txs_to_address:
      "04eb0fbee3f7ea657d0343a33c812d7114d5d2ab7fabb1456fb3b4888382a18042f10038d5997e256ccd9592367af1da16fc683051aa02d2c4512148d4899353ff",
    sendback_txs_amount: "12000",
    sendback_txs_timestamp: "2021-06-27 00:16:34",
  },
];

const Resend = () => {
  const [resendList, setResendList] = useState(sample);

  useEffect(() => {}, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <h1>User Resend List</h1>
      <Divider />
      <Table
        columns={columns}
        dataSource={resendList}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default Resend;
