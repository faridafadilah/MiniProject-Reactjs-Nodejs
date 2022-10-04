import React, {Component} from "react";
import DataUserService from "../../services/super.service";
import { withRouter } from "../../common/with-router";

class SuperAdmin extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            currentUser: {
                id: null,
                username: "",
                email: "",
                roles: "",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getUser(this.props.router.params.id);
    }

    onChangeUsername(e) {
        const username = e.target.value;

        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    username: username
                }
            }
        });
    }

    onChangeEmail(e) {
        const email = e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                email: email
            }
        }));
    }

    onChangeRole(e) {
        const roles = e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                roles: roles
            }
        }));
    }

    getUser(id) {
        DataUserService.get(id)
         .then(response => {
            this.setState({
                currentUser: response.data
            });
            console.log(response.data);
         })
          .catch(e => {
            console.log(e);
          });
    }

    updateUser() {
        DataUserService.update(
            this.state.currentUser.id,
            this.state.currentUser
        )
         .then(response => {
            console.log(response.data);
            this.setState({
                message: "User update successfully"
            });
         })
         .catch(e => {
            console.log(e);
        });
    }

    deleteUser() {
        DataUserService.delete(this.state.currentUser.id)
         .then(response => {
            console.log(response.data);
            this.props.router.navigate('/super');
         })
          .catch(e => {
            console.log(e);
          })
    }

    render() {
        const {currentUser} = this.state;
        return (
            <div>
                {currentUser? (
                    <div className="edit-form">
                        <h4>Data User</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    value={currentUser.username}
                                    onChange={this.onChangeUsername}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    value={currentUser.email}
                                    onChange={this.onChangeEmail}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="roles">Role</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="roles"
                                    name="roles"
                                    value={currentUser.roles}
                                    onChange={this.onChangeRoles}
                                />
                            </div>
                        </form>

                        <button className="btn btn-danger" onClick={this.deleteUser}>
                            Delete
                        </button>

                        <button className="btn btn-success m-lg-3" onClick={this.updateUser} type="submit">Update</button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a User</p>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(SuperAdmin);