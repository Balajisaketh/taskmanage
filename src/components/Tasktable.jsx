

// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faPlus, faUser, faEdit, faTrash,faTimes,faSave } from '@fortawesome/free-solid-svg-icons';
// import { useSelector } from 'react-redux';

// const TaskTable = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newTaskTitle, setNewTaskTitle] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const [newTaskStatus, setNewTaskStatus] = useState('Pending');
//   const [newTaskPriority, setNewTaskPriority] = useState('Medium');
//   const [newTaskCreatedAt, setNewTaskCreatedAt] = useState(new Date().toLocaleDateString());
//   const [editingTask, setEditingTask] = useState(null);
//   const [filterKeyword, setFilterKeyword] = useState('');
//   const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640);

//   // User data from Redux store
//   const user = useSelector((state) => state.tasks.user);
//   const username=user.split("@")


//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobileView(window.innerWidth < 640);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/tasks");
//       const data = await response.json();
//       setTasks(data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const filteredTasks = tasks.filter(
//     (task) =>
//       task.title.toLowerCase().includes(filterKeyword.toLowerCase()) ||
//       task.status.toLowerCase().includes(filterKeyword.toLowerCase()) ||
//       task.priority.toLowerCase().includes(filterKeyword.toLowerCase())
//   );

//   const handleEdit = (task) => {
//     setEditingTask({ ...task });
//   };

//   const handleCancelEdit = () => {
//     setEditingTask(null);
//   };

//   const handleUpdate = async () => {
//     try {
//       const response = await fetch(`http://localhost:3000/tasks/${editingTask.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(editingTask),
//       });

//       if (response.ok) {
//         await fetchTasks();
//         setEditingTask(null);
//       }
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const DeleteTask = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:3000/tasks/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         await fetchTasks();
//       }
//     } catch (err) {
//       console.error(`Error deleting task with id ${id}:`, err);
//     }
//   };

//   const handleAdd = async () => {
//     const newTask = {
//       title: newTaskTitle,
//       status: newTaskStatus,
//       priority: newTaskPriority,
//       createdAt: newTaskCreatedAt,
//     };

//     try {
//       const response = await fetch("http://localhost:3000/tasks", {
//         method: "POST",
//         body: JSON.stringify(newTask),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         await fetchTasks();
//         setNewTaskTitle('');
//         setNewTaskStatus('Pending');
//         setNewTaskPriority('Medium');
//         setNewTaskCreatedAt(new Date().toLocaleDateString());
//         setIsModalOpen(false);
//       }
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority.toLowerCase()) {
//       case 'high':
//         return 'bg-red-100 text-red-800';
//       case 'medium':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'low':
//         return 'bg-green-100 text-green-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'completed':
//         return 'bg-emerald-100 text-emerald-800';
//       case 'in progress':
//         return 'bg-blue-100 text-blue-800';
//       case 'pending':
//         return 'bg-purple-100 text-purple-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-xl">
//       {/* Profile Section */}
//       <div className="flex flex-col sm:flex-row gap-6 items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-md">
//         <div className="flex-shrink-0">
//          <FontAwesomeIcon icon={faUser} size={500}/>
//         </div>
//         <div className="text-center sm:text-left">
//           <h2 className="text-2xl font-bold">{username[0] || "User Name"}</h2>
//           <p className="text-sm">{user|| "user@example.com"}</p>
//         </div>
//       </div>

//       {/* Task Manager Section */}
//       <div className="space-y-4 pb-6 sm:pb-8 mt-6">
//         <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
//           Task Manager
//         </h1>
//         <div className="flex flex-wrap gap-4">
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="w-full sm:w-auto mt-4 sm:mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-150 flex items-center justify-center gap-2 sm:gap-3"
//           >
//             <FontAwesomeIcon icon={faPlus} />
//             Add New Task
//           </button>
//           <div className="flex items-center w-full sm:w-auto bg-gray-100 px-4 py-2 rounded-lg shadow-md">
//             <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
//             <input
//               type="text"
//               placeholder="Filter by Name or Status"
//               value={filterKeyword}
//               onChange={(e) => setFilterKeyword(e.target.value)}
//               className="w-full bg-transparent border-none focus:outline-none"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Task Table */}
//       <div className="overflow-x-auto rounded-lg shadow-lg">
//         <table className="min-w-full table-auto">
//           <thead>
//             <tr className="border-b border-gray-200">
//               <th className="p-4 text-left text-lg font-semibold text-gray-600">Title</th>
//               <th className="p-4 text-left text-lg font-semibold text-gray-600">Status</th>
//               <th className="p-4 text-left text-lg font-semibold text-gray-600">Priority</th>
//               <th className="p-4 text-left text-lg font-semibold text-gray-600">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTasks.map((task) => (
//               <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                 <td className="p-4">
//                   {editingTask && editingTask.id === task.id ? (
//                     <input
//                       type="text"
//                       value={editingTask.title}
//                       onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
//                       className="w-full p-2 border rounded"
//                     />
//                   ) : (
//                     <span className="font-medium text-gray-800">{task.title}</span>
//                   )}
//                 </td>
//                 <td className="p-4">
//                   {editingTask && editingTask.id === task.id ? (
//                     <select
//                       value={editingTask.status}
//                       onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
//                       className="p-2 border rounded"
//                     >
//                       <option>Pending</option>
//                       <option>In Progress</option>
//                       <option>Completed</option>
//                     </select>
//                   ) : (
//                     <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
//                       {task.status}
//                     </span>
//                   )}
//                 </td>
//                 <td className="p-4">
//                   {editingTask && editingTask.id === task.id ? (
//                     <select
//                       value={editingTask.priority}
//                       onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
//                       className="p-2 border rounded"
//                     >
//                       <option>High</option>
//                       <option>Medium</option>
//                       <option>Low</option>
//                     </select>
//                   ) : (
//                     <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
//                       {task.priority}
//                     </span>
//                   )}
//                 </td>
//                 <td className="p-2 ">
//                   <div className="flex gap-4 justify-center ">
                    
//                     {editingTask && editingTask.id === task.id ? (
//                       <>
//                         <button onClick={handleUpdate} className="text-blue-600 hover:text-blue-800 transition-colors">
//                         <FontAwesomeIcon icon={faSave} />
//                         </button>
//                         <button onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-800 transition-colors">
//                         <FontAwesomeIcon icon={faTimes} />
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                       <div className='flex aligap-4 justify-center bg-red-900'>
//                         <button onClick={() => handleEdit(task)} className=" text-blue-600 hover:text-blue-800 transition-colors">
//                           <FontAwesomeIcon icon={faEdit} className='text-center'/>
//                         </button>
//                         <button onClick={() => DeleteTask(task.id)} className="justify-center text-red-600 hover:text-red-800 transition-colors">
//                         <FontAwesomeIcon icon={faTrash}/>
//                         </button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
//           <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-8">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Add New Task</h2>
//             <div className="space-y-4 sm:space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//                 <input
//                   type="text"
//                   value={newTaskTitle}
//                   onChange={(e) => setNewTaskTitle(e.target.value)}
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   placeholder="Enter task title"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
//                 <select
//                   value={newTaskPriority}
//                   onChange={(e) => setNewTaskPriority(e.target.value)}
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 >
//                   <option>High</option>
//                   <option>Medium</option>
//                   <option>Low</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                 <select
//                   value={newTaskStatus}
//                   onChange={(e) => setNewTaskStatus(e.target.value)}
//                   className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 >
//                   <option>Pending</option>
//                   <option>In Progress</option>
//                   <option>Completed</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Created At</label>
//                 <input
//                   type="text"
//                   value={newTaskCreatedAt}
//                   disabled
//                   className="w-full p-3 border rounded-lg bg-gray-50 text-gray-500"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAdd}
//                 className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150"
//               >
//                 Add Task
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TaskTable;
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faUser, faEdit, faTrash, faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const TaskTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTaskStatus, setNewTaskStatus] = useState('Pending');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskCreatedAt, setNewTaskCreatedAt] = useState(new Date().toLocaleDateString());
  const [editingTask, setEditingTask] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 640);

  // User data from Redux store
  const user = useSelector((state) => state.tasks.user);
  const username = user.split("@");

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      task.status.toLowerCase().includes(filterKeyword.toLowerCase()) ||
      task.priority.toLowerCase().includes(filterKeyword.toLowerCase())
  );

  const handleEdit = (task) => {
    setEditingTask({ ...task });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingTask),
      });

      if (response.ok) {
        await fetchTasks();
        setEditingTask(null);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const DeleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchTasks();
      }
    } catch (err) {
      console.error(`Error deleting task with id ${id}:`, err);
    }
  };

  const handleAdd = async () => {
    const newTask = {
      title: newTaskTitle,
      status: newTaskStatus,
      priority: newTaskPriority,
      createdAt: newTaskCreatedAt,
    };

    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await fetchTasks();
        setNewTaskTitle('');
        setNewTaskStatus('Pending');
        setNewTaskPriority('Medium');
        setNewTaskCreatedAt(new Date().toLocaleDateString());
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-xl">
      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row gap-6 items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-md">
        <div className="flex-shrink-0">
          <FontAwesomeIcon icon={faUser} size={500} />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold">{username[0] || "User Name"}</h2>
          <p className="text-sm">{user || "user@example.com"}</p>
        </div>
      </div>

      {/* Task Manager Section */}
      <div className="space-y-4 pb-6 sm:pb-8 mt-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">
          Task Manager
        </h1>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto mt-4 sm:mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-150 flex items-center justify-center gap-2 sm:gap-3"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add New Task
          </button>
          <div className="flex items-center w-full sm:w-auto bg-gray-100 px-4 py-2 rounded-lg shadow-md">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Filter by Name or Status"
              value={filterKeyword}
              onChange={(e) => setFilterKeyword(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="p-4 text-left text-lg font-semibold text-gray-600">Title</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-600">Status</th>
              <th className="p-4 text-left text-lg font-semibold text-gray-600">Priority</th>
              {/* <th className="p-4 text-left text-lg font-semibold text-gray-600">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  {editingTask && editingTask.id === task.id ? (
                    <input
                      type="text"
                      value={editingTask.title}
                      onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <span className="font-medium text-gray-800">{task.title}</span>
                  )}
                </td>
                <td className="p-4">
                  {editingTask && editingTask.id === task.id ? (
                    <select
                      value={editingTask.status}
                      onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                      className="p-2 border rounded"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  ) : (
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  )}
                </td>
                <td className="p-4">
                  {editingTask && editingTask.id === task.id ? (
                    <select
                      value={editingTask.priority}
                      onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                      className="p-2 border rounded"
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  ) : (
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  )}
                </td>
                <td className="p-2">
                  <div className="flex gap-4 justify-center">
                    {editingTask && editingTask.id === task.id ? (
                      <>
                        <button onClick={handleUpdate} className="text-blue-600 hover:text-blue-800 transition-colors">
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button onClick={handleCancelEdit} className="text-gray-600 hover:text-gray-800 transition-colors">
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(task)} className="text-blue-600 hover:text-blue-800 transition-colors">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => DeleteTask(task.id)} className="text-red-600 hover:text-red-800 transition-colors">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Add New Task</h2>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={newTaskStatus}
                  onChange={(e) => setNewTaskStatus(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Created At</label>
                <input
                  type="text"
                  value={newTaskCreatedAt}
                  disabled
                  className="w-full p-3 border rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTable;

