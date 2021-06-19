import { Button, Tooltip } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import Logo from '../../assets/img/logo_64.png';
import './styles.scss'

const HeaderBar = (props) =>{
    const history = useHistory();

    const onLogout = () =>{
        localStorage.clear()
        history.go(0);
    }

    // const menu = (
    //     <Menu>
    //         <Menu.Item key="1">
    //             <Link to="/profile">
    //             <Button type="text">
    //                 Profile
    //             </Button>
    //             </Link>
    //         </Menu.Item>
    //         <Menu.Item key="3">
    //             <Button onClick={onLogout} type="text">
    //             Logout
    //             </Button>
    //         </Menu.Item>
    //     </Menu>
    // );
    
    // const DropdownMenu = () => (
    //     <Dropdown key="more" overlay={menu}>
    //     <Button
    //         style={{
    //         border: 'none',
    //         backgroundColor: '#00152a',
    //         padding: 0,
    //         }}
    //     >
    //         <MoreOutlined
    //         style={{
    //             fontSize: 20,
    //             verticalAlign: 'top',
    //             backgroundColor: '#00152a',
    //             color: 'white'
    //         }}
    //         />
    //     </Button>
    //     </Dropdown>
    // );
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const name = localStorage.getItem('name')
    return(
        <div className="header-bar">
            <Link to="/" className="logo-item"><img src={Logo} alt="Online Learning" /> Charity</Link>
            {
                (isAuthenticated)
                ?
                <div className="right-header-container">
                    {
                    (!name)
                    ? null
                    :<div to="/profile" className="profile-container">
                        {/* <div className="avatar">
                        {
                            (!props.user.picture)
                            ? props.user.fullName[0]
                            : <img alt="Avatar" src={props.user.picture}></img>
                        }
                        </div> */}
                        <Tooltip title={`${name}`} color="#00152a" >
                            <div className="name" style={{color: "white"}}>
                                {name}
                            </div>
                        </Tooltip>
                    </div>
                    }
                    {/* <DropdownMenu className="dropdown-menu" /> */}
                    <Tooltip title="Logout">
                        <Button onClick={onLogout} type="text" style={{color: "white"}}>
                            <LogoutOutlined />
                            Logout
                        </Button>
                    </Tooltip>
                    
                </div>
                :
                <div className="tool">
                    <Link to="/login" key="link_1">
                        <Button className="button" shape="round" type="primary">Login</Button>
                    </Link>
                    <Link to="/register" key="link_2">
                        <Button className="button" shape="round" type="primary">Register</Button>
                    </Link>
                </div>
            }
            
        </div>
    )
}

export default HeaderBar; 