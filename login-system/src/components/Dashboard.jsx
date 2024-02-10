import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

export const Dashboard = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    age: '',
    dob: '',
    phone: ''
  });

  let navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/getUser')
      .then(res => {
        if (res.data.valid) {
          setUser(res.data.user);
          setUpdatedUser(res.data.user);
        } else {
          navigate('/login');
        }
      })
      .catch(err => console.log(err))
  }, [])

  const handleEditDetails = () => {
    setEditMode(true);
  }

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  }

  const handleUpdate = () => {
    axios.put('http://localhost:5000/updateUser', updatedUser)
      .then(res => {
        setUser(res.data.user);
        setEditMode(false);
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <Header />
      <div className='text-white h-screen flex flex-col items-center justify-center '>
        <h1 className='text-3xl font-semibold my-4'>{user.name} Dashboard</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead className="bg-white text-black">
              <tr>
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Email</th>
                <th className="border border-gray-400 px-4 py-2">Age</th>
                <th className="border border-gray-400 px-4 py-2">DOB</th>
                <th className="border border-gray-400 px-4 py-2">Phone</th>
              </tr>
            </thead>
            <tbody className="bg-white text-black">
              <tr>
                <td className="border border-gray-400 px-4 py-2">
                  {editMode ? <input type="text" name="name" value={updatedUser.name} onChange={handleChange} /> : user.name}
                </td>
                <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                <td className="border border-gray-400 px-4 py-2">
                  {editMode ? <input type="text" name="age" value={updatedUser.age} onChange={handleChange} /> : user.age}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {editMode ? <input type="text" name="dob" value={updatedUser.dob} onChange={handleChange} /> : user.dob}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {editMode ? <input type="text" name="phone" value={updatedUser.phone} onChange={handleChange} /> : user.phone}
                </td>
              </tr>
            </tbody>
          </table>
          {editMode ? <button className=' mt-4 p-2 bg-green-600 rounded text-xl font-semibold' onClick={handleUpdate}>Save Changes</button> :
            <button className=' mt-4 p-2 bg-green-600 rounded text-xl font-semibold' onClick={handleEditDetails}>Edit Details</button>}
        </div>
      </div>
    </>
  )
}
export default Dashboard;