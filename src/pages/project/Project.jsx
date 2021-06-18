import React, {useEffect, useState} from 'react'
import { Table, Tag, Divider, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './styles.scss'
import { createNewProjectService, getProjectsService } from '../../services/project.service';

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
      title: 'Start Date',
      dataIndex: 'projectCreateTimestamp',
      key: 'projectDeadline',
      render: deadline => {
          const date_ob = new Date(parseInt(deadline))
          console.log(date_ob)
          const year = date_ob.getFullYear();
          const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
          const date = ("0" + date_ob.getDate()).slice(-2);
          return(
          <span>{year}/{month}/{date}</span>
      )}
  },
  {
    title: 'End Date',
    dataIndex: 'projectDeadline',
    key: 'projectDeadline',
    render: deadline => {
        const date_ob = new Date(parseInt(deadline))
        console.log(date_ob)
        const year = date_ob.getFullYear();
        const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        const date = ("0" + date_ob.getDate()).slice(-2);
        return(
        <span>{year}/{month}/{date}</span>
    )}
  },
  {
    title: 'Status',
    dataIndex: 'projectDeadline',
    key: 'status',
    render: deadline => {
      const deadlineDate = new Date(parseInt(deadline))
      const isExpired = Date.now() > deadlineDate && 1
      return (
      
        <Tag color={isExpired ? 'green' : 'gold'}>
          {isExpired ? 'Success' : 'Processing'}
        </Tag>
    )},
  },
];

const Project = () => {

  const history = useHistory();
  const [projectList, setProjectList] = useState()

  useEffect(()=>{
    getProjectsService()  
    .then((res)=>{
      setProjectList(res.data)
    })
    .catch(err => console.log(err))
  },[])

  return(
    <div>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
        <h1 style={{float: "left"}}>Projects</h1>
        <Button onClick={()=>{history.push("/create-new-project")}} type="primary" htmlType="submit" className="register-form-button" icon={<PlusOutlined />}>
          Create New Project
        </Button>
      </div>
      <Divider/>
      <Table 
        columns={columns} 
        dataSource={projectList}
        rowKey="projectId"
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              console.log(record, rowIndex)
              history.push(`/projects/${record.projectId}`);
            },
          };
        }}
      />
    </div>
  )
}

export default Project