import React, { useState, useEffect } from 'react';
import API from '../utils/api';

function Table() {
    const [employees, setEmployees] = useState([{}]);
    const [orderedEmployees, setOrderedEmployees] = useState([]);
    const [order, setOrder] = useState("descending");

    function handleChange(val) {
        console.log(val);
        let filteredEmployees = employees.filter(emp => {
            let values = Object.values(emp)
              .join("")
              .toLowerCase();
              console.log(values)
            return values.indexOf(val.toLowerCase()) !== -1;
          });
          setOrderedEmployees(filteredEmployees);
    }

    useEffect(() => {
        API.getEmployees().then(res => {
            setEmployees(res.data.results)
            setOrderedEmployees(res.data.results)
          });
      },[]);

      function employeeOrderByFirst() {
          if (order === "ascending") setOrder("descending")
          else setOrder("ascending")
        function compare(x,y) {
            const first = x.name.first.toUpperCase();
            const second = y.name.first.toUpperCase();

            let compare = 0;
            if (first > second) {
                compare = 1;
            } else if (first < second) {
                compare = -1;
            }
            if (order === "descending") compare *= -1
            return compare;
        }
        orderedEmployees.sort(compare);
      }
      function employeeOrderByLast() {
        if (order === "ascending") setOrder("descending")
        else setOrder("ascending")
      function compare(x,y) {
          const first = x.name.last.toUpperCase();
          const second = y.name.last.toUpperCase();

          let compare = 0;
          if (first > second) {
              compare = 1;
          } else if (first < second) {
              compare = -1;
          }
          if (order === "descending") compare *= -1
          return compare;
      }
      orderedEmployees.sort(compare);
    }


    return (
        <div>
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className="navbar-collapse row" id="navbarNav">
                    <form className="form-inline active-cyan-4 center">
                        <input 
                            className="form-control form-control-sm mr-3 w-75" 
                            type="text" 
                            placeholder="Search"
                            aria-label="Search"
                            onChange={e => {handleChange(e.target.value)}}
                            />
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </form>
                </div>
            </nav>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Image</th>
                    <th onClick={ () => {employeeOrderByFirst()}} scope="col">First</th>
                    <th onClick={ () => {employeeOrderByLast()}} scope="col">Last</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email Address</th>
                    </tr>
                </thead>
                <tbody>
                    {orderedEmployees.length > 0 ? (
                        orderedEmployees.map((employee) => (
                            <tr key={employee.login.uuid}>
                                <td><img src={employee.picture.medium} alt=""></img></td>
                                <td>{employee.name.first}</td>
                                <td>{employee.name.last}</td>
                                <td>{employee.cell}</td>
                                <td>{employee.email}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <th>No Content</th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table;