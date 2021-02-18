// import React, { useState } from 'react';
// import './MainPage.css';
// import MainLoader from '../MainLoader';
// import mockSections from '../../mock/mock';

// let data = mockSections[0];
// let data2 = [];
// let data3 = [];

// const Section = ({ title, taskList, newSpots, requireSpot }) => {
//   // const onChangeSection = (e, task) => {
//   //   e.dataTransfer.setData('text', JSON.stringify(task));
//   // };

//   // const onDrop = (e) => {
//   //   e.preventDefault(); // By default, dropped data is opened as link
//   //   const task = JSON.parse(e.dataTransfer.getData('text'));
//   //   data2.push(task);
//   //   console.log(task, data2);
//   // };

//   // const allowDrop = (e) => {
//   //   e.preventDefault(); // By default, data cannot be dropped
//   // };

//   return (
//     <div className="section-container">
//       <div className="section-title">{title}</div>
//       <hr />
//       <div className="section-taskList">
//         {taskList.map((task) => (
//           <Task key={task.title} task={task} requireSpot={requireSpot} />
//         ))}
//         {newSpots && (
//           <div
//             className="section-addTask"
//             onDragEnter={(e) => {
//               e.target.style.backgroundColor = 'rgba(119, 136, 153, 0.411)';
//             }}
//             onDragLeave={(e) => {
//               e.target.style.backgroundColor = 'transparent';
//             }}
//           >
//             +
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const Element = ({ idx, todo, onChangeOrder, allowDropTask, onDropTask }) => {
//   const [droppable, setDroppable] = useState(false);
//   let drag = true;
//   const dragRef = React.useRef(null);

//   return (
//     <div className={`todo-container ${droppable ? 'todo-droppable' : ''}`}>
//       <div
//         ref={dragRef}
//         className={'todo'}
//         draggable
//         onDragStart={(e) => {
//           e.stopPropagation();
//           drag = false;
//           setTimeout(() => {
//             dragRef.current.classList.add('hide-children');
//           }, 0);
//           onChangeOrder(e, idx);
//         }}
//         onDragEnd={(e) => {
//           e.stopPropagation();
//           dragRef.current.classList.remove('hide-children');
//         }}
//         onDragOver={allowDropTask}
//         onDragEnter={(e) => {
//           if (!drag) return;
//           setDroppable(true);
//         }}
//         onDragLeave={(e) => {
//           // drag = true; // > Allow re-enter? (only style effect)
//           setDroppable(false);
//         }}
//         onDrop={(e) => {
//           setDroppable(false);
//           onDropTask(e, idx);
//         }}
//       >
//         <div>{todo.title}</div>
//         <div>{todo.endDate}</div>
//       </div>
//     </div>
//   );
// };

// const Task = ({ task, requireSpot }) => {
//   const [todos, setTodos] = useState(task.todos);

//   const onChangeOrder = (e, idx) => {
//     e.dataTransfer.setData('text', idx);
//   };

//   const allowDropTask = (e) => {
//     e.stopPropagation();
//     e.preventDefault(); // By default, data cannot be dropped
//   };

//   const onDropTask = (e, idx) => {
//     e.preventDefault(); // By default, dropped data is opened as link

//     const transferedData = e.dataTransfer.getData('text');
//     let idxToReplace;
//     let parsedData;
//     if (!Number.isNaN(parseInt(transferedData))) {
//       idxToReplace = parseInt(e.dataTransfer.getData('text'));
//       const draggedTodo = { ...todos[idxToReplace] };
//       const newOrderTodos = todos.filter((e, i) => i !== idxToReplace);
//       newOrderTodos.splice(idx, 0, draggedTodo);
//       setTodos(newOrderTodos);
//     } else {
//       parsedData = JSON.parse(transferedData);
//       const newTodos = todos.map((t) => ({ ...t }));
//       newTodos.splice(idx, 0, ...parsedData.todos);

//       console.log(newTodos);
//       setTodos(newTodos);
//     }
//   };

//   const taskWrapper = React.useRef();

//   return (
//     <div
//       ref={taskWrapper}
//       className="task-container"
//       onDragStart={(e) => {
//         console.log('from parent');
//         e.dataTransfer.setData('text', JSON.stringify(task));
//       }}
//       onDragEnd={() => {
//         console.log('end');
//         taskWrapper.current.setAttribute('draggable', 'false');
//         requireSpot(false);
//       }}
//     >
//       <div
//         className="task-title"
//         onMouseDown={(e) => {
//           taskWrapper.current.setAttribute('draggable', 'true');
//           requireSpot(true);
//           console.log('start');
//         }}
//       >
//         {task.title}
//       </div>
//       <div className="task-todos">
//         {todos.map((todo, idx) => (
//           <Element
//             key={todo.id}
//             idx={idx}
//             todo={todo}
//             onChangeOrder={onChangeOrder}
//             allowDropTask={allowDropTask}
//             onDropTask={onDropTask}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default function MainPage() {
//   const [newSpots, setNewSpots] = useState(false);
//   const requireSpot = (status) => {
//     setNewSpots(status);
//   };
//   return (
//     <div className="container">
//       <Section
//         title="Subjects"
//         taskList={data}
//         newSpots={newSpots}
//         requireSpot={requireSpot}
//       ></Section>
//       <Section
//         title="Should Do"
//         taskList={data2}
//         newSpots={newSpots}
//         requireSpot={requireSpot}
//       ></Section>
//       <Section
//         title="In Process"
//         taskList={data3}
//         newSpots={newSpots}
//         requireSpot={requireSpot}
//       ></Section>
//     </div>
//   );
// }
