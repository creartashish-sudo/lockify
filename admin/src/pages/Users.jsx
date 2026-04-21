import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Users() {
    const [users,setUsers] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    async function handleGetUsers() {
        // Logic to fetch users can be added here
        try{
            const res = await axios.get(`${apiUrl}/users`);
            setUsers(res.data.user_details);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {   
        handleGetUsers();
    }, []);
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Users</h5>
                            {/* Default Table */}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Contact</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={user.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.contact}</td>
                                            <td>
                                                <button className='btn btn-primary' onClick={()=>navigate("/user-details",{state:{user:user}})}>View</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* <tr>
                                        <th scope="row">1</th>
                                        <td>Brandon Jacob</td>
                                        <td>b@gmail.com</td>
                                        <td>1234567890</td>
                                        <td>
                                            <button className='btn btn-primary' onClick={()=>navigate("/user-details")}>View</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Ashleigh Langosh</td>
                                        <td>b@gmail.com</td>
                                        <td>1234567890</td>

                                        <td>
                                            <button className='btn btn-primary' onClick={()=>navigate("/user-details")}>View</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Ashleigh Langosh</td>
                                        <td>b@gmail.com</td>
                                        <td>1234567890</td>
                                        <td>
                                            <button className='btn btn-primary' onClick={()=>navigate("/user-details")}>View</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Angus Grady</td>
                                        <td>b@gmail.com</td>
                                        <td>1234567890</td>
                                        <td>
                                            <button className='btn btn-primary'>View</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Raheem Lehner</td>
                                        <td>b@gmail.com</td>
                                        <td>1234567890</td>
                                        <td>
                                            <button className='btn btn-primary'>View</button>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                            {/* End Default Table Example */}
                        </div>
                    </div>




                </div>

            </div>
        </section>

    )
}

export default Users
