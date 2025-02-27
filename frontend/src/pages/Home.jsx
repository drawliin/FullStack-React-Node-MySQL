import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Add user
  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/users`, { name, email });
      fetchUsers(); // Refresh the list
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button className="delete-btn" onClick={() => deleteUser(user.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}