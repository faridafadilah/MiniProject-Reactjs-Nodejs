import React, { useState, useEffect, useMemo, useRef } from "react";
import UserService from "../services/user.service";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";

const BoardSuperAdmin = (props) => {
  const [users, setUsers] = useState([]);
  const [searchUsername, setSearchUsername] = useState("");
  const usersRef = useRef();
  const navigate = useNavigate();
  usersRef.current = users;

  useEffect(() => {
    retrieveUser();
  }, []);

  const onChangeSearchUsername = (e) => {
    const searchUsername = e.target.value;
    setSearchUsername(searchUsername);
  };

  const retrieveUser = () => {
    UserService.getUserRole()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByUsername = () => {
    UserService.findByUsername(searchUsername)
    .then((response) => {
      setUsers(response.data);
    })
    .catch((e) => {
      console.log(e);
    })
  };
  const openUser = (rowIndex) => {
    const id = usersRef.current[rowIndex].id;

    navigate("/super/"+ id);
  }

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Role",
        accessor: "name",
      },
      {
        Header: "Role ID",
        accessor: "roleId",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openUser(rowIdx)}>
              <i class="ri-edit-2-line"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
} = useTable({
  columns,
  data: users,
});
console.log(users);

return (
  <div className="list row">
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchUsername}
          onChange={onChangeSearchUsername}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByUsername}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-12 list">
      <table
        className="table table-striped table-bordered"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
}


export default BoardSuperAdmin;
// import React, { Component } from "react";
// import UserService from "../services/user.service";
// import EventBus from "../common/EventBus";
// import { Link } from "react-router-dom";
// import { Pagination } from "@mui/material";
// import { Container } from "@mui/system";

// export default class BoardSuperAdmin extends Component {
//   constructor(props) {
//     super(props);
//     this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
//     this.retrieveUser = this.retrieveUser.bind(this);
//     this.setActiveUser = this.setActiveUser.bind(this);
//     this.refreshList = this.refreshList.bind(this);
//     this.searchUsername = this.searchUsername.bind(this);
//     this.handlePageChange = this.handlePageChange.bind(this);
//     this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

//     this.state = {
//       content: "",
//       users: [],
//       currentUser: null,
//       currentIndex: -1,
//       searchUsername: "",

//       page: 1,
//       count: 0,
//       pageSize: 3,
//     };

//     this.pageSizes = [3, 6, 9];
//   }

//   componentDidMount() {
//     this.retrieveUser();
//     UserService.getSuperAdminBoard().then(
//       (response) => {
//         this.setState({
//           content: response.data,
//         });
//       },
//       (error) => {
//         this.setState({
//           content:
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString(),
//         });

//         if (error.response && error.response.status === 401) {
//           EventBus.dispatch("logout");
//         }
//       }
//     );
//   }

//   onChangeSearchUsername(e) {
//     const searchUsername = e.target.value;

//     this.setState({
//       searchUsername: searchUsername,
//     });
//   }

//   getRequestParams(searchUsername, page, pageSize) {
//     let params = {};

//     if(searchUsername) {
//       params["username"] = searchUsername;
//     }

//     if(page) {
//       params["page"] = page - 1;
//     }

//     if(pageSize) {
//       params["size"] = pageSize;
//     }

//     return params;
//   }

//   retrieveUser() {
//     const { searchUsername, page, pageSize } = this.state;
//     const params = this.getRequestParams(searchUsername, page, pageSize);

//     UserService.getUserRole(params)
//       .then((response) => {
//         const { users, totalPages } = response.data;

//         this.setState({
//           users: users,
//           count: totalPages,
//         });
//         console.log(response.data);
//     }).catch((e) => {
//       console.log(e);
//     })
//   }

//   refreshList() {
//     this.retrieveUser();
//     this.setState({
//       currentUser: null,
//       currentIndex: -1,
//     });
//   }

//   setActiveUser(user, index) {
//     this.setState({
//       currentUser: user,
//       currentIndex: index,
//     });
//   }

//   searchUsername() {
//     UserService.findByUsername(this.state.searchUsername)
//       .then((response) => {
//         this.setState({
//           users: response.data,
//         });
//         console.log(response.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }

//   handlePageChange(event, value) {
//     this.setState({
//       page: value,
//     }, () => {
//       this.retrieveUser();
//     });
//   }

//   handlePageSizeChange(event) {
//     this.setState({
//       pageSize: event.target.value,
//       page: 1
//     }, () => {
//       this.retrieveUser();
//     });
//   }

//   render() {
//     const { searchUsername, users, currentUser, currentIndex, page, count, pageSize } = this.state;
//     return (
//       <Container>
//         <div style={{ padding: "2rem", marginTop: "70px" }}>
//         <div className="list row">
//         <h3>{this.state.content}</h3>
//         <div className="col-md-8">
//           <div className="input-group mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by username"
//               value={searchUsername}
//               onChange={this.onChangeSearchUsername}
//             />
//             <div className="input-group-append">
//               <button
//                 className="btn btn-secondary"
//                 type="button"
//                 onClick={this.retrieveUser}
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <h4>Data Admin</h4>

//           <div className="mt-3">
//             {"Items per Page: "}
//             <select onChange={this.handlePageSizeChange} value={pageSize}>
//               {this.pageSizes.map((size) => (
//                 <option key={size} value={size}>
//                   {size}
//                 </option>
//               ))}
//             </select>

//             <Pagination
//               className="my-3"
//               count={count}
//               page={page}
//               siblingCount={1}
//               boundaryCount={1}
//               variant="outlined"
//               shape="rounded"
//               onChange={this.handlePageChange}
//              />
//           </div>

//           <div className="d-flex">
//           <ul className="list-group" style={{ width: "50%", marginRight: "6%"}}>
//             {users &&
//               users.map((user, index) => (
//                 <li
//                   className={
//                     "list-group-item " + (index === currentIndex ? "active" : "")
//                   }
//                   onClick={() => this.setActiveUser(user, index)}
//                   key={index}
//                 >
//                   {user.username}
//                 </li>
//               ))}
//           </ul>
//           <div className="col-md-6">
//             {currentUser ? (
//               <div>
//                 <h4>Data</h4>
//                 <div>
//                   <label>
//                     <strong>Username</strong>
//                   </label>{" "}
//                   {currentUser.username}
//                 </div>
//                 <div>
//                   <label>
//                     <strong>Email</strong>
//                   </label>{" "}
//                   {currentUser.email}
//                 </div>
//                 {/* <div>
//                   <label>
//                     <strong>Role</strong>
//                   </label>{" "}
//                   {currentUser.roles &&
//                     currentUser.roles.map((role, index) => (
//                       <li key={index}>{role}</li>
//                     ))}
//                 </div> */}
//                 <Link
//                   to={"/super/" + currentUser.id}
//                   className="btn btn-warning"
//                 >
//                   Edit
//                 </Link>
//               </div>
//             ) : (
//               <div>
//                 <br />
//                 <p>Please click on a user...</p>
//               </div>
//             )}
//           </div>
//           </div>
//         </div>
//       </div>
//       </div>
//       </Container>
//     );
//   }
// }
