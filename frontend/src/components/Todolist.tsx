import React, { useEffect, useState } from 'react'
import styles from '../styles/TodolistStyle.module.css'
import stylesicons from '../styles/Icons.module.css'
import { todolist as listModel } from '../models/todolistModel';
import useLocalStorage from 'react-use-localstorage'
import btnstyles from '../styles/Button.module.css';
import AddNewDialogBox from './AddEditListDialogBox';
import * as todolistApi from '../api/todolist_api'
import moon from '../assets/moon.svg'
import sun from '../assets/sun.svg'
import taskW from '../assets/taskW.svg'
import taskB from '../assets/taskB.svg'
import priorityB from '../assets/priorityB.svg'
import priorityW from '../assets/priorityW.svg'
import datetimeW from '../assets/datetimeW.svg'
import datetimeB from '../assets/datetimeB.svg'
import { formatDate } from './formatDate';
import { FaTrash } from 'react-icons/fa'
import { MdFormatListBulletedAdd as AddNewTodo } from 'react-icons/md'
import { AiOutlineFileDone as MarkAsDone } from 'react-icons/ai';
import { useMutation } from 'react-query'

const todoCover = require('../assets/TODO-LIST.jpg');
const todoCoverDark = require('../assets/TODO-LIST-D.jpg');


const Todolist = () => {
  // THEME
  const [themeLogo, setThemeLogo] = useLocalStorage("themeLogo", moon);
  const [taskLogo, setTaskLogo] = useLocalStorage("taskLogo", taskW);
  const [priorityLogo, setpriorityLogo] = useLocalStorage('priorityLogo', priorityW);
  const [dateTimeLogo, setdateTimeLogo] = useLocalStorage('dateTimeLogo', datetimeW);
  const [todoHeader, setTodoHeader] = useLocalStorage("todoHeader", todoCover);
  const [theme, setTheme] = useLocalStorage("theme", "light-theme");


  const [showModal, setShowModal] = React.useState<boolean>(false);
  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    setThemeLogo(newTheme === "dark-theme" ? sun : moon);
    setTodoHeader(newTheme === "dark-theme" ? todoCoverDark : todoCover);
    setTaskLogo(newTheme === "dark-theme" ? taskB : taskW);
    setpriorityLogo(newTheme === "dark-theme" ? priorityB : priorityW);
    setdateTimeLogo(newTheme === "dark-theme" ? datetimeB : datetimeW);
  };
  useEffect(() => {
    document.body.className = theme;
  }, [theme])


  const dialogOpen = () => setShowModal(true);
  const dialogClose = () => setShowModal(false);



  const [Todo, setTodo] = useState<listModel[]>([]);
  useEffect(() => {
    async function loadList() {
      try {
        const Todo = await todolistApi.fetchTodoList();
        setTodo(Todo)
        console.log(Todo)
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }

    loadList();
  }, []);
  const { mutate: handleComplete } = useMutation((list: listModel) => {
    return todolistApi.updateTodoList({ ...list, status: !list.status });
  }, {
    onSuccess: (data) => {
      // update the todoList state with the updated data
      setTodo(prevState => {
        return prevState.map(list => {
          if (list._id === data._id) {
            return { ...list, status: data.status };
          } else {
            return list;
          }
        });
      });
    }
  });
  async function deleteList(list: listModel) {
    try {
      await todolistApi.deleteTodoList(list._id);
      setTodo(Todo.filter(existingList => existingList._id !== list._id))
    } catch (error) {
      console.log(error)
      alert(error);
    }
  }
  let createdUpdatedDate: string;

  return (
    <>
      <div className={styles.letter}>
        <img className={styles.letterimg} src={todoHeader} alt="ICON" />
        <div className={styles.paper}>
          <div className={styles.papercontent}>
            <div className={btnstyles.DialogButtons} >
              <button onClick={dialogOpen} className={`${btnstyles.DialogButton} ${btnstyles.buttonDesign}`}><AddNewTodo style={{fontSize:" 2.5vw",paddingRight:"15px"}} />ADD NEW TODO LIST</button>
              <img src={themeLogo} id='moonlogo' alt=' ' onClick={() => toggleTheme()} style={{ cursor: "pointer",height:"9vw",width:"9vw",marginLeft:"auto"}}/>
            </div>
            {showModal &&
              <AddNewDialogBox onListSaved={(newList) => { setTodo([...Todo, newList]); setShowModal(false); }} dialogClose={dialogClose} taskLogo={taskLogo} priorityLogo={priorityLogo} dateTimeLogo={dateTimeLogo} />
            }
            {/* 
              <div className={styles.tblheader}>
                <table>
                  <thead>
                    <tr>
                      <th style={{width:"30%"}}>task</th>
                      <th>date created</th>
                      <th>time to complete </th>
                      <th>priority</th>
                      <th>Status</th>
                      <th>action</th>
                    </tr>
                  </thead>
                </table>
              </div> */}
    
              <div className={styles.tblcontent}>
                {Todo.map((list) => {
                  if (list.updatedAt > list.createdAt) {
                    createdUpdatedDate = "Updated: " + formatDate(list.updatedAt);
                  }
                  else {
                    createdUpdatedDate = "Created: " + formatDate(list.createdAt);
                  }
                  return <>
                  <center>
                    <table>
                      <tr key={list._id} className={`priority-${list.priority}`}>
                        <th>task: <td className={styles.textBox} role="textbox" style={{ resize: list.task && list.task.length > 20 ? 'vertical' : 'none' }}> {list.task}</td></th>
                        <th>date created <td>{formatDate(createdUpdatedDate)}</td></th>
                        <th>time to complete  {
                          list.duedate ? (<td>{formatDate(list.duedate)}</td>) : (<td>NO DATE ASSIGNED</td>)
                        }
                        </th>
                        <th>priority<td>{list.priority}</td></th>
                        <th>Status
                          {
                            list.status ? (<td>Completed</td>) : (<td>Incomplete</td>)
                          }</th>
                        <th>action <td>
                          <MarkAsDone onClick={(e) => { handleComplete(list); e.stopPropagation(); }} className={stylesicons.ico} />
                          <FaTrash onClick={(e) => { deleteList(list); e.stopPropagation(); }} className={stylesicons.ico} />
                        </td></th>
                      </tr>
                    </table>
                    </center>
                  </>;
                }
                )}
              </div>
         
            <br></br>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todolist