import React, {useState} from 'react';
import { Typography, Divider } from 'antd';
// import { PlusOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom';
import './styles.scss'

const { Title, Paragraph, Text, Link } = Typography;

const data = 
    {
      "projectId": 0,
      "projectName": "Ung ho nguoi tan tat5",
      "projectBeneficiaryCreateAddress": "04c5f5d991997ea260a52b9af3d0798056614082e2ad00a1f2797b51438ea6afc30c9a47e0eeb69cf13e6d9c81700f489f01c72423920ca71d34c429b4cd6b6b12",
      "projectOrganizationConfirmAddress": null,
      "projectDescription": "ung ho nguoi tan tat kho khan, vo gia cu",
      "projectCreateTimestamp": 1624028149403,
      "projectConfirmTimestamp": null,
      "projectDeadline": 1623870000000
    }
const ProjectItem = () => {
    const id = useParams().id;
    const [project, setProject] = useState(data)

    return(
        <div style={{ textAlign: "left" }}>
            <Typography level={3}>
                <Title>{project.projectName}</Title>
                <Paragraph>
                    <Text strong>
                        {project.projectDescription}
                    </Text>
                    </Paragraph>
            </Typography>
        </div>
    )
}

export default ProjectItem