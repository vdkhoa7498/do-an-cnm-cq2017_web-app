import UserProject from './UserProject'
import OrganizationProject from './OrganizationProject'

const MyProject = () => {
    const role = localStorage.getItem('role')
    console.log(role)
    return(
        <div>
            {
                (role==="user")
                ? <UserProject/>
                : <OrganizationProject/>
            }
        </div>
    )
}

export default MyProject