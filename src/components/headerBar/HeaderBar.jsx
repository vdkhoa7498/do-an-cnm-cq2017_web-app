import { Button, Menu, Dropdown, message, Tooltip } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './styles.scss'

const HeaderBar = (props) =>{
    const onLogout = () =>{
        
    }

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Link to="/profile">
                <Button type="text">
                    Profile
                </Button>
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/change-password">
                <Button type="text">
                    Change Password
                </Button>
                </Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Button onClick={onLogout} type="text">
                Logout
                </Button>
            </Menu.Item>
        </Menu>
    );
    
    const DropdownMenu = () => (
        <Dropdown key="more" overlay={menu}>
        <Button
            style={{
            border: 'none',
            backgroundColor: '#00152a',
            padding: 0,
            }}
        >
            <MoreOutlined
            style={{
                fontSize: 20,
                verticalAlign: 'top',
                backgroundColor: '#00152a',
                color: 'white'
            }}
            />
        </Button>
        </Dropdown>
    );
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    
    return(
        <div className="header-bar">
            <Link to="/" className="logo-item">Logo</Link>
            {
                (isAuthenticated)
                ?
                <div className="right-header-container">
                    {
                    (!props.user)
                    ? null
                    :<Link to="/profile" className="profile-container">
                        <div className="avatar">
                        {
                            (!props.user.picture)
                            ? props.user.fullName[0]
                            : <img alt="Avatar" src={props.user.picture}></img>
                        }
                        </div>
                    <Tooltip title={`${props.user.fullName}`} color="#00152a" >
                        <div className="name">
                            {props.user.fullName}
                        </div>
                        </Tooltip>
                    </Link>
                    }
                    <DropdownMenu className="dropdown-menu" />
                    
                </div>
                :
                <div className="tool">
                    <Link to="/login" key="link_1">
                        <Button className="button" shape="round" type="primary">Đăng nhập</Button>
                    </Link>
                    <Link to="/register" key="link_2">
                        <Button className="button" shape="round" type="primary">Đăng Ký</Button>
                    </Link>
                </div>
            }
            
        </div>
    )
}

export default HeaderBar; 