import React, { Component } from 'react'
import axios from 'axios';



export default class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            emailid: '',
            employee: []
        }
    }



    componentDidMount = () => {
        axios.get('http://localhost:9090/api/v1/employees/')
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    emailid: response.data.emailid
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:9090/api/v1/employees/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        employee: response.data.map(employee => employee.firstName),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }

    firstNameChange = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }

    surnameChange = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }
    emailChange = (e) => {
        this.setState({
            emailid: e.target.value
        })
    }
    submitForm = (e) => {

        const employees = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailid: this.state.emailid
        }

        console.log(employees);

        axios.post('http://localhost:9090/api/v1/employees/', employees)
            .then(res => console.log(res.data));

    }

    render() {
        return (
            <div>
                <br /><br /><br />
                <h2>Create A New Employee</h2>
                <br />
                <div className="row">
                    <div className="container col-md-8 mx-auto">
                        <div className="row">
                            <div className="col">
                            </div>
                            <div className="col-6">
                                <form onSubmit={this.submitForm} action="/view">

                                    <div className="form-group">
                                        <label>First Name </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.firstName}
                                            onChange={this.firstNameChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Surname </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.lastName}
                                            onChange={this.surnameChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="text"
                                            required
                                            className="form-control"
                                            value={this.state.emailid}
                                            onChange={this.emailChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Submit" className="btn btn-success" />
                                        <a href="/view"><button className="btn btn-warning" >Cancel</button> </a>
                                    </div>
                                </form>

                                

                            </div>
                            <div className="col">
                            </div>
                        </div>
                    </div>
                </div >

            </div >
        )
    }
}
