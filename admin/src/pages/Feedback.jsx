import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
function Feedback() {
    const [feedbacks,setFeedbacks] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    // const navigate = useNavigate();
    async function handleGetUsers() {
        // Logic to fetch feedbacks can be added here
        try{
            const res = await axios.get(`${apiUrl}/feedbacks/`);
            setFeedbacks(res.data.data);
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
                    <h5 className="card-title">Feedback</h5>
                    {/* Default Table */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Comment</th>
                                <th scope="col">Rating</th>
                                <th scope="col">User Name</th>
                                {/* <th scope="col">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.map((feedback, index) => (
                                <tr key={feedback.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{feedback.createdAt}</td>
                                    <td>{feedback.comment}</td>
                                    <td>{feedback.rating}</td>
                                    <td>{feedback.userId.name}</td>
                                    {/* <td>
                                        <button className='btn btn-primary' onClick={()=>navigate("/feedback-details",{state:{feedback:feedback}})}>View</button>
                                    </td> */}
                                </tr>
                            ))}
                           
                            
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

export default Feedback
