import { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from 'axios';

function Manager() {
  const [siteName, setSiteName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwords, setPasswords] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // To track if we're editing a password
  const [editId, setEditId] = useState(null); // ID of the password we're editing

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdate(); // If in edit mode, update the password instead of saving a new one
    } else {
      try {
        const { data } = await axios.post("http://localhost:8080/api/v1/password/savepassword", {
          siteName,
          username,
          password
        });

        if (data) {
          toast.success("Saved successfully");
          setPasswords([...passwords, data]); // Add new password without reloading
          clearForm(); // Clear form after saving
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/password/updatepassword/${editId}`, {
        siteName,
        username,
        password
      });

      if (data) {
        toast.success("Updated successfully");
        // Update the passwords list with the new data
        const updatedPasswords = passwords.map((p) => (p._id === editId ? data : p));
        setPasswords(updatedPasswords);
        clearForm(); // Clear form and exit edit mode
        setIsEditing(false);
        setEditId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (password) => {
    // Populate the form fields with the selected password's data
    setSiteName(password.siteName);
    setUsername(password.username);
    setPassword(password.password);
    setIsEditing(true);
    setEditId(password._id); // Store the id of the password being edited
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/password/deletepassword/${id}`);
      if (data) {
        toast.success("Deleted successfully");
        getPasswords(); // Refetch passwords after deletion
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPasswords = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/password/getpassword");
      setPasswords(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    // Clear form fields
    setSiteName('');
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    getPasswords();
  }, []);

  return (
    <div className="w-full bg-zinc-800 text-white">
      <h1 className="text-center font-bold text-2xl pt-6">Password Manager</h1>
      <p className="text-xl capitalize text-center text-green-600">Your own password manager</p>

      <div className="flex w-full justify-center pt-7">
        <form onSubmit={handleSubmit} className="w-[700px] h-[200px] flex flex-col rounded-xl gap-5 relative">
          <input
            type="text"
            placeholder="Enter your website URL..."
            name="site"
            onChange={(e) => setSiteName(e.target.value)}
            value={siteName}
            className="p-2 rounded-xl bg-zinc-800 outline-none border-2 border-green-500"
          />
          <div className="flex gap-5 w-full">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              value={username}
              className="p-2 rounded-xl bg-zinc-800 outline-none border-2 w-[74%] border-green-500"
            />
            <input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
              className="p-2 rounded-xl bg-zinc-800 outline-none border-2 w-[24%] border-green-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex justify-center items-center py-1 px-3 bg-green-600 rounded-full hover:bg-green-800 w-fit text-black"
            >
              {isEditing ? 'Update' : 'Save'}
            </button>
          </div>

          <div className="passwords w-full mt-10">
            {passwords.length === 0 ? (
              <div className="text-center text-2xl text-green-500 font-bold">No passwords to show ☹</div>
            ) : (
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-green-700 h-10">
                    <th className="px-4 py-2">Site</th>
                    <th className="px-4 py-2">Username</th>
                    <th className="px-4 py-2">Password</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwords.map((p) => (
                    <tr key={p._id} className="text-black">
                      <td className="px-4 py-2 flex items-center justify-center gap-2">
                        {p.siteName}
                        <FaCopy
                          className="text-xl font-bold cursor-pointer"
                          onClick={() => copyText(p.siteName)}
                        />
                      </td>
                      <td className="px-4 py-2">{p.username}</td>
                      <td className="px-4 py-2 flex items-center justify-center gap-2">
                        {p.password}
                        <FaCopy
                          className="text-xl font-bold cursor-pointer"
                          onClick={() => copyText(p.password)}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <span className="mx-4">
                          <lord-icon
                            onClick={() => handleDelete(p._id)}
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#16c72e"
                            style={{ width: "20px" }}
                          >
                          </lord-icon>
                        </span>
                        <span>
                          <lord-icon
                            onClick={() => handleEditClick(p)}
                            src="https://cdn.lordicon.com/ghhwiltn.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#16c72e"
                            style={{ width: "20px" }}
                          >
                          </lord-icon>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Manager;
