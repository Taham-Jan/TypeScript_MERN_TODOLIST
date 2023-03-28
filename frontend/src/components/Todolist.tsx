import React, { useEffect, useState } from 'react';
import { todolist as listModel } from '../models/todolistModel';
import stylesicons from '../styles/Icons.module.css';
import styles from '../styles/TodolistStyle.module.css';

import { FaTrash } from 'react-icons/fa';
import * as todolistApi from '../api/todolist_api';

import { AiOutlineFileDone as MarkAsDone } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { MdFormatListBulletedAdd as AddNewTodo } from 'react-icons/md';
import { useMutation } from 'react-query';
import btnstyles from '../styles/Button.module.css';
import AddEditNewDialogBox from './AddEditListDialogBox';
import { formatDate } from './formatDate';
import styles404 from '../styles/NotFoundPage.module.css'

import Spinner from './Spinner';




interface TodoListProps {

	taskLogo: string,
	priorityLogo: string,
	dateTimeLogo: string,


}

const Todolist = ({ dateTimeLogo, priorityLogo, taskLogo }: TodoListProps) => {
	const [showModal, setShowModal] = React.useState<boolean>(false);
	const [onListEdit, setonListEdit] = useState<listModel | null>(null);
	const [todoLoading, setTodoLoading] = useState(false);
	const [ShowTodoLoadingError, setShowTodoLoadingError] = useState(false);




	const dialogOpen = () => setShowModal(true);
	const dialogClose = () => setShowModal(false);



	const [Todo, setTodo] = useState<listModel[]>([]);
	useEffect(() => {
		async function loadList() {
			try {
				setShowTodoLoadingError(false);
				setTodoLoading(true);
				const Todo = await todolistApi.fetchTodoList();
				setTodo(Todo)
				console.log(Todo)
			} catch (error) {
				console.log(error);
				setShowTodoLoadingError(true);
			} finally {
				setTodoLoading(false);
			}
		}

		loadList();
	}, []);
	const { mutate: handleComplete } = useMutation((list: listModel) => {
		return todolistApi.updateStatus({ ...list, status: !list.status },);
	}, {
		onSuccess: (data) => {
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

			{showModal &&
				<AddEditNewDialogBox
					onListSaved={(newList) => { setTodo([...Todo, newList]); setShowModal(false); }}
					dialogClose={dialogClose}
					taskLogo={taskLogo}
					priorityLogo={priorityLogo}
					dateTimeLogo={dateTimeLogo} />
			}
			{onListEdit &&
				<AddEditNewDialogBox
					onListSaved={(updatedTodo) => {
						setTodo(Todo.map(existingTodo => existingTodo._id === updatedTodo._id ? updatedTodo : existingTodo));
						setonListEdit(null)
					}}
					onListEdit={onListEdit}
					dialogClose={dialogClose}
					taskLogo={taskLogo}
					priorityLogo={priorityLogo}
					dateTimeLogo={dateTimeLogo} />
			}

			{todoLoading && <Spinner />}
			{ShowTodoLoadingError && <p>SOMETHING WENT WRONG</p>}
			{!todoLoading && !ShowTodoLoadingError &&
				<>
					<div className={btnstyles.DialogButtons} >
						<button onClick={dialogOpen} className={`${btnstyles.DialogButton} ${btnstyles.buttonDesign}`}><AddNewTodo className={stylesicons.ico3} style={{ fontSize: " 2.3rem", paddingRight: "15px" }} />ADD NEW TODO LIST</button>
					</div>
					{

						Todo.length > 0 ?
							<>


								<div className={styles.tblcontent}>
									{Todo.map((list, index) => {
										if (list.updatedAt > list.createdAt) {
											createdUpdatedDate = "Updated: " + formatDate(list.updatedAt);
										}
										else {
											createdUpdatedDate = "Created: " + formatDate(list.createdAt);
										}
										return <>
											<table>
												<tr key={list._id} className={`priority-${list.priority}-${list.status}`}>
												<th  key={index} style={{borderBottom: "3px solid #91d1d3"}}>
													<td className={styles.Numbering}>{index + 1}</td>
													<th style={{fontWeight:"bold"}}>TASK: </th>
												<th  className={styles.textBox} role="textbox" > {list.task}</th>
												<div style={{ display: "flex",flexDirection:"row", marginLeft:"auto" }}>
													<span className={styles.iconPopup}><MarkAsDone onClick={(e) => { handleComplete(list); e.stopPropagation(); }} className={stylesicons.ico} /><span>MARK AS DONE</span></span>
													<span className={styles.iconPopup}><FaEdit onClick={() => setonListEdit(list)} className={stylesicons.ico} /><span>UPDATE</span></span>
													<span className={styles.iconPopup}><FaTrash onClick={(e) => { deleteList(list); e.stopPropagation(); }} className={stylesicons.ico} /><span>DELETE</span></span>
													</div>
												</th>
													
													<th><td style={{margin:"auto"}}>CREATED AT: {formatDate(createdUpdatedDate)}</td> {list.duedate ? (<td style={{margin:"auto"}}>DEADLINE: {formatDate(list.duedate)}</td>) : (<td  style={{margin:"auto"}}>DEADLINE: NO DATE ASSIGNED</td>)}</th>
												</tr>
											</table>
{/* 
											<table>
												<tr key={list._id} className={`priority-${list.priority}`}>
													<th key={index} >{index + 1}</th>
													<th>task:
														<td className={styles.textBox} role="textbox" style={{ resize: list.task && list.task.length > 20 ? 'vertical' : 'none' }}> {list.task}</td>
														<h1 style={{ display: "flex", flexDirection: "column" }}>date created <h2>{formatDate(createdUpdatedDate)}</h2></h1>
													</th>

													<th>time to complete  {
														list.duedate ? (<td>{formatDate(list.duedate)}</td>) : (<td>NO DATE ASSIGNED</td>)
													}
													</th>
													<th>priority<td>{list.priority}</td></th>
													<th>Status
														{
															list.status ? (<td>Completed</td>) : (<td>Incomplete</td>)
														}</th>
													<th style={{ borderBottom: "none" }}>action <td style={{ display: "flex", gap: "15px" }}>
														<MarkAsDone onClick={(e) => { handleComplete(list); e.stopPropagation(); }} className={stylesicons.ico} />
														<FaEdit onClick={() => setonListEdit(list)} className={stylesicons.ico} />
														<FaTrash onClick={(e) => { deleteList(list); e.stopPropagation(); }} className={stylesicons.ico} />
													</td></th>
												</tr>
											</table> */}

										</>;
									}
									)}

								</div>

							</> : <div id={styles404.MainContainer}>
        <div className={styles404.MainContainer}>
            <div className={styles404.TextContent}>
           
                <h1><span>N</span><span>O</span><span>T</span><span>O</span><span>D</span><span>O</span> <span>A</span><span>D</span><span>D</span><span>E</span><span>D</span></h1>
            </div>

        </div>
    </div>
					}
				</>
			}




		</>
	)
}

export default Todolist