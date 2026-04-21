import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Inquiry() {
    const [inquries,setInquries] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    async function handleGetUsers() {
        // Logic to fetch inquries can be added here
        try{
            const res = await axios.get(`${apiUrl}/inquiries`);
            setInquries(res.data.data);
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
                    <h5 className="card-title">Inquiry</h5>
                    {/* Default Table */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquries.map((inquiry, index) => (
                                <tr key={inquiry.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{inquiry.name}</td>
                                    <td>{inquiry.email}</td>
                                    <td>{inquiry.contact}</td>
                                    <td>{inquiry.subject}</td>
                                    <td>{inquiry.message}</td>
                                </tr>
                            ))}
                            {/* <tr>
                                <th scope="row">1</th>
                                <td>Brandon Jacob</td>
                                <td>b@gmail.com</td>
                                <td>1234567890</td>
                                <td>password</td>
                                <td>sdadalkjdalkdjsbasdkl</td>
                               
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Ashleigh Langosh</td>
                                <td>b@gmail.com</td>
                                <td>1234567890</td>

                                <td>password</td>
                                <td>sdadalkjdalkdjsbasdkl</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Ashleigh Langosh</td>
                                <td>b@gmail.com</td>
                                <td>1234567890</td>
                                <td>password</td>
                                <td>sdadalkjdalkdjsbasdkl</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Angus Grady</td>
                                <td>b@gmail.com</td>
                                <td>1234567890</td>
                                <td>password</td>
                                <td>sdadalkjdalkdjsbasdkl</td>
                            </tr>
                            <tr>
                                <th scope="row">5</th>
                                <td>Raheem Lehner</td>
                                <td>b@gmail.com</td>
                                <td>1234567890</td>
                                <td>password</td>
                                <td>sdadalkjdalkdjsbasdkl</td>
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

export default Inquiry
