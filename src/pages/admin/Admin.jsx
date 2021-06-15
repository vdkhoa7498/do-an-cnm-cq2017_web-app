import { Form, Input, Button, Select, Divider } from "antd";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Admin = () => {
  return (
    <div>
        <input type="checkbox" id="sidebar-toggle"/>
    <div class="sidebar">
        <div class="sidebar-header">
            <h3 class="brand">
                <span class="ti-unlink"></span>
                <span>Genuine Charity</span>
            </h3>
            <label for="sidebar-toggle" class="ti-menu-alt"></label>
        </div>

        <div class="sidebar-menu">
            <ul>
                <li>
                    <a href="index.html">
                        <span class="ti-home"></span>
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a href="projects.html">
                        <span class="ti-agenda"></span>
                        <span>Projects</span>
                    </a>
                </li>
                <li>
                    <a href="donators.html">
                        <span class="ti-clipboard"></span>
                        <span>Donators</span>
                    </a>
                </li>
                <li>
                    <a href="beneficiaries.html">
                        <span class="ti-folder"></span>
                        <span>Beneficiaries</span>
                    </a>
                </li>
                <li>
                    <a href="transaction.html">
                        <span class="ti-time"></span>
                        <span>Transaction History</span>
                    </a>
                </li>

                <li>
                    <a href="">
                        <span class="ti-settings"></span>
                        <span>Account</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>


    <div class="main-content">

        <header>
            <div class="search-wrapper">
                <span class="ti-search"></span>
                <input type="search" placeholder="Search"/>
            </div>

            <div class="social-icons">
                <span class="ti-bell"></span>
                <span class="ti-comment"></span>
                <div></div>
            </div>
        </header>

        <div>

            <h2 class="dash-title">Overview</h2>

            <div class="dash-cards">
                <div class="card-single">
                    <div class="card-body">
                        <span class="ti-briefcase"></span>
                        <div>
                            <h5>Projects</h5>

                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="projects.html">View all</a>
                    </div>
                </div>

                <div class="card-single">
                    <div class="card-body">
                        <span class="ti-reload"></span>
                        <div>
                            <h5>Donators</h5>

                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="donators.html">View all</a>
                    </div>
                </div>

                <div class="card-single">
                    <div class="card-body">
                        <span class="ti-check-box"></span>
                        <div>
                            <h5>Benificiaries</h5>

                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="beneficiaries.html">View all</a>
                    </div>
                </div>
            </div>



            <div class="recent">
                <div class="activity-grid">
                    <div class="activity-card">
                        <h3>Recent activity</h3>

                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Project</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Amount Donated</th>
                                        <th>Transaction Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Project Meal</td>
                                        <td>15 Aug, 2021</td>
                                        <td>22 Aug, 2021</td>
                                        <td>$1000</td>
                                        <td>
                                            <span class="badge success">Success</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Project Education</td>
                                        <td>12 Dec, 2020</td>
                                        <td>6 May, 2021</td>
                                        <td>$4000</td>
                                        <td>
                                            <span class="badge warning">Processing</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Project Elder</td>
                                        <td>4 April, 2020</td>
                                        <td>27 Aug, 2020</td>
                                        <td>$3600</td>
                                        <td>
                                            <span class="badge success">Success</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Project Food</td>
                                        <td>24 October, 2021</td>
                                        <td>13 November, 2021</td>
                                        <td>$2300</td>
                                        <td>
                                            <span class="badge warning">Processing</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Project Surgery</td>
                                        <td>5 March, 2021</td>
                                        <td>10 July, 2021</td>
                                        <td>$5000</td>
                                        <td>
                                            <span class="badge success">Success</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="summary">
                        <div class="summary-card">
                            <div class="summary-single">
                                <span class="ti-id-badge"></span>
                                <div>
                                    <h5>196</h5>
                                    <small>Number of donors</small>
                                </div>
                            </div>
                            <div class="summary-single">
                                <span class="ti-calendar"></span>
                                <div>
                                    <h5>16</h5>
                                    <small>Number of Beneficiaries</small>
                                </div>

                            </div>
                            <div class="summary-single">
                                <span class="ti-face-smile"></span>
                                <div>
                                    <h5>12</h5>
                                    <small>Profile update request</small>
                                </div>
                            </div>
                        </div>
                        <div class="button">
                          <a href="#">Accept request</a>

                        </div>

                        <div class="button-2">
                          <a href="#">Send Money</a>

                        </div>
                        </div>
                    </div>
                </div>


            </div>


        </div>

    </div>
  );
};

export default Admin