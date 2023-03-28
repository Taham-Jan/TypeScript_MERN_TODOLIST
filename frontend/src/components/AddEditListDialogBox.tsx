import styles from '../styles/TodolistStyle.module.css'
import btnstyles from '../styles/Button.module.css'
import { useEffect } from 'react'
import { todolist as listModel } from '../models/todolistModel';
import { useForm } from 'react-hook-form';
import { ListInput } from '../api/todolist_api';
import * as ListApi from '../api/todolist_api';

interface AddEditListDialogBoxProps {
	dialogClose: () => void,
	onListEdit?: listModel,
	onListSaved: (todolist: listModel) => void,
	taskLogo: string,
	priorityLogo: string,
	dateTimeLogo: string,
}

const AddEditListDialogBox = ({ dialogClose, onListEdit, onListSaved, taskLogo, priorityLogo, dateTimeLogo }: AddEditListDialogBoxProps) => {


	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ListInput>({
		defaultValues: {
			task: onListEdit?.task || "",
			priority: onListEdit?.priority || [],
			duedate: onListEdit?.duedate || "",
			status: onListEdit?.status || false,
		}
	});



	async function onSubmit(input: ListInput) {
		try {
			let todoListResponse: listModel;
			if (onListEdit) {
				todoListResponse = await ListApi.updateTodoList(onListEdit._id, input);
			}
			else {
				todoListResponse = await ListApi.createTodoList(input);
			}
			onListSaved(todoListResponse);
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}

	useEffect(() => {
		document.body.style.overflowY = "hidden";

		return () => {
			document.body.style.overflowY = "scroll";
		}
	}, []);

	return (
		<>
			<form autoComplete="off" onSubmit={handleSubmit(onSubmit)} >
				<div className={styles.modalWrapper} onClick={dialogClose} ></div>
				<div className={styles.DialogBoxContainer}>
					<h1 className={styles.HeadingModal}>
						{
							onListEdit ? "EDIT TODO" : "ADD TODO"
						}
					</h1>
					<div className={styles.flexrow}>
						<label className={styles.label} htmlFor="Task">
							<img src={taskLogo} alt='' width='25' height='25' />
							<label className={styles.placeholder}>Task</label>
						</label>
						<input type="text" id="task" className={styles.input} placeholder=' ' {...register("task", { required: "dyy bhai" })} />
					</div>

					<div className={styles.flexrow}>
						<label className={styles.label} htmlFor="Priority">
							<img src={priorityLogo} alt='' width='25' height='25' />
							<label className={styles.placeholder}>PRIORITY</label>
						</label>
						<select className={styles.input} {...register("priority", { required: "NO PRIORITY SET" })}>
							<option value=" " disabled selected hidden>Set Your Priotity</option>
							<option value="HIGH">HIGH</option>
							<option value="MEDIUM">MEDIUM</option>
							<option value="LOW">LOW</option>
						</select>
					</div>

					<div className={styles.flexrow}>
						<label className={styles.label} htmlFor="Date&Time">
							<img src={dateTimeLogo} alt='' width='25' height='25' />
							<label className={styles.placeholder}>Date | Time</label>
						</label>
						<input id="duedate" className={styles.input} type='datetime-local'  {...register("duedate")} />
						{errors.duedate && <p>{errors.duedate.message}</p>}
					</div>

					<div className={btnstyles.DialogButtons}>
						<button className={`${btnstyles.DialogButton} ${btnstyles.buttonDesign}`} type="submit">Yes</button>
						<button onClick={dialogClose} className={`${btnstyles.DialogButton} ${btnstyles.buttonDesign}`} >Close</button>
					</div>
				</div>
			</form>
		</>
	)
}

export default AddEditListDialogBox