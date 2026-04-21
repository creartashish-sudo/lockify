import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Payment() {
    const [payments,setPayments] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    async function handleGetPayments() {
        // Logic to fetch payments can be added here
        try{
            const res = await axios.get(`${apiUrl}/payments`);
            setPayments(res.data.payments);
        }catch(err){
            console.log(err);
        }
    }
    useEffect(() => {   
        handleGetPayments();
    }, []);
    return (
        <section className="section">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Payments</h5>
                            {/* Default Table */}
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">User</th>
                                        <th scope="col">Payment Mode</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment, index) => (
                                        <tr key={payment.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{payment.amount}</td>
                                            <td>{payment.userId.name}</td>
                                            <td>{payment.payment_mode}</td>
                                            <td>{payment.status}</td>
                                            <td>{payment.createdAt}</td>
                                        </tr>
                                    ))}
                                    {/* <tr>
                                        <th scope="row">1</th>
                                        <td>Brandon Jacob</td>
                                        <td>b@gmail.com</td>
                                        <td>1234567890</td>
                                        <td>
                                            <button className='btn btn-primary'>View</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Ashleigh Langosh</td>
                                        <td>b@gmail.com</td>
                                        <td>1234567890</td>

                                        <td>
                                            <button className='btn btn-primary'>View</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Ashleigh Langosh</td>
                                        <td>b@gmail.com</td>
                                        <td>1234567890</td>
                                        <td>
                                            <button className='btn btn-primary'>View</button>
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

export default Payment
