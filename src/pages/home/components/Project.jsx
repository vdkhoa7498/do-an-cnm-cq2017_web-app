import { Table, Tag, Layout, Menu } from 'antd';

const columns = [
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'projectDescription',
      key: 'projectDescription',
    },
    {
      title: 'Address',
      dataIndex: 'projectBeneficiaryCreateAddress',
      key: 'projectBeneficiaryCreateAddress',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: status => (
          <Tag color={status === 'confirmed' ? 'green' : 'volcano'} key={status}>
              {status.toUpperCase()}
          </Tag>
      ),
    },
    {
        title: 'Dealine',
        dataIndex: 'projectDeadline',
        key: 'projectDeadline',
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
      projectName: 'Ung ho nguoi tan tat',
      projectDescription: 'ung ho nguoi tan tat kho khan, vo gia cu',
      projectBeneficiaryCreateAddress: 'abc',
      status: 'confirmed',
      projectDeadline: '1623869336954',
    },
    {
      key: '2',
      projectName: 'Ung ho nguoi tan tat',
      projectDescription: 'ung ho nguoi tan tat kho khan, vo gia cu',
      projectBeneficiaryCreateAddress: 'abc',
      status: 'confirmed',
      projectDeadline: '1623869336954',
    },
    {
      key: '3',
      projectName: 'Ung ho nguoi tan tat',
      projectDescription: 'ung ho nguoi tan tat kho khan, vo gia cu',
      projectBeneficiaryCreateAddress: 'abc',
      status: 'confirmed',
      projectDeadline: '1623869336954',
    },
  ];

  const Project = () => {
      return(
        <Table columns={columns} dataSource={data} />
      )
  }

export default Project