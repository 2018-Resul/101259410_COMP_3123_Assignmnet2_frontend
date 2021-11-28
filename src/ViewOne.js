import React, { Component } from 'react'
import axios from 'axios';


export default class ViewOne extends Component {

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
        axios.get('http://localhost:9090/api/v1/employees/' + this.props.match.params.id)
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

    
    

   

    render() {
        return (
            <div>
                <br /><br /><br />
                <h3>Employee Details</h3>
                <br />
                <div className="row">
                    <div className="container col-md-8 mx-auto">
                        <div className="row">
                            <div className="col">
                            </div>
                            <div className="col-6">

                                <div className="form-group">
                                    <strong> First Name :</strong> {this.state.firstName}
                                </div>

                                <div className="form-group">
                                    <strong>Surname : </strong>{this.state.lastName}
                                </div>
                                <div className="form-group">
                                    <strong> Email address : </strong>{this.state.emailid}
                                </div>
                            </div>
                            <div className="col">
                            </div>
                        </div>
                    </div>
                </div>
                <a href="/view"><button className="btn btn-success" >OK</button> </a>

            </div >
        )
    }
}
