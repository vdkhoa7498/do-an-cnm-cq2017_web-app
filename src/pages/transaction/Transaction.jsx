import { Table, Divider } from 'antd';

const columns = [
    {
      title: 'From address',
      dataIndex: 'TransactionName',
      key: 'TransactionName',
      // render: text => <a>{text}</a>,
    },
    {
      title: 'To address',
      dataIndex: 'TransactionDescription',
      key: 'TransactionDescription',
    },
    {
      title: 'Amount',
      dataIndex: 'TransactionBeneficiaryCreateAddress',
      key: 'TransactionBeneficiaryCreateAddress',
    },
    {
        title: 'Date',
        dataIndex: 'TransactionDeadline',
        key: 'TransactionDeadline',
        render: deadline => {
            const date_ob = new Date(parseInt(deadline))
            console.log(date_ob)
            const year = date_ob.getFullYear();
            const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            const date = ("0" + date_ob.getDate()).slice(-2);
      
            const hours = ("0" + date_ob.getHours()).slice(-2);
            const minutes = ("0" + date_ob.getMinutes()).slice(-2);
            const seconds = ("0" + date_ob.getSeconds()).slice(-2);
            return(
            <span>{year}/{month}/{date} - {hours}:{minutes}:{seconds}</span>
        )}
      
    },
  ];
  
  const data = [
    {
      key: '1',
      TransactionName: 'Ung ho nguoi tan tat',
      TransactionDescription: 'ung ho nguoi tan tat kho khan, vo gia cu',
      TransactionBeneficiaryCreateAddress: 'abc',
      status: 'confirmed',
      TransactionDeadline: '1623869336954',
    },
    {
      key: '2',
      TransactionName: 'Ung ho nguoi tan tat',
      TransactionDescription: 'ung ho nguoi tan tat kho khan, vo gia cu',
      TransactionBeneficiaryCreateAddress: 'abc',
      status: 'confirmed',
      TransactionDeadline: '1623869336954',
    },
    {
      key: '3',
      TransactionName: 'Ung ho nguoi tan tat',
      TransactionDescription: 'ung ho nguoi tan tat kho khan, vo gia cu',
      TransactionBeneficiaryCreateAddress: 'abc',
      status: 'confirmed',
      TransactionDeadline: '1623869336954',
    },
  ];

  const Transaction = (props) => {
    const {title} = props
      return(
        <div style={{display: "flex", alignItems: "flex-start", flexDirection: "column"}}>
          <h1>{title}</h1>
          <Divider/>
          <Table columns={columns} dataSource={data} style={{width: "100%"}} />
        </div>
      )
  }

export default Transaction