import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';





const Employees = props => (



    <tbody>
        <tr>
            <td>{props.employee.firstName}</td>
            <td>{props.employee.lastName}</td>
            <td>{props.employee.emailid}</td>
            <td class="">
                <Link to={"/update/" + props.employee._id} ><button className="btn-success" >Update</button></Link>
                <Link to={"/view"}  >
                    <button className="btn-warning" onClick={(e) => { props.deleteEmployee(props.employee._id) }}>Delete</button>
                </Link>
                <Link to={"/viewone/" + props.employee._id} ><button className="btn-success">View</button></Link>
            </td>

        </tr>
    </tbody>



)


export default class View extends Component {
    constructor(props) {
        super(props);
        this.state = { employee: [] };
    }



    componentDidMount() {
        axios.get('http://localhost:9090/api/v1/employees/')
            .then(response => {
                console.log(response.data)
                const employee = response.data
                this.setState({ employee })
            })
            .catch((error) => {
                console.log(error);
            })


    }


    employeesList() {
        return this.state.employee.map(emp => {
            return <Employees className="card-deck card" employee={emp} key={emp._id} deleteEmployee={this.deleteEmployee} />;
        })
    }


    deleteEmployee(id) {

        axios.delete('http://localhost:9090/api/v1/employees/' + id)
            .then(response => { console.log(response.data) });

        window.location.reload(false);
    }



    render() {
        return (
            <div>

                <br /><br /><br />
                <h3>Employees</h3>
                <br />
                <Link to={"/create"} ><button className="btn-danger">Create a new Employee</button></Link>
                <br /><br />

                <div className="row">

                    <div className="container col-md-10 mx-auto">

                        <div className="row">

                            <div className="col">

                            </div>

                            <div className="col-8">

                                <table className="table ">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>First Name</th>
                                            <th>Surname</th>
                                            <th>Email</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    {this.employeesList()}
                                </table >
                            </div>
                            <div className="col">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
