import styles from '../styles/TodolistStyle.module.css'
import btnstyles from '../styles/Button.module.css'
import { useForm } from 'react-hook-form';
import { LoginCredentials } from '../api/todolist_api';
import * as ListApi from '../api/todolist_api'
import { User } from '../models/userModel';
import { useEffect } from 'react';
import {FaUser} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'

import stylesicons from '../styles/Icons.module.css';


interface LoginModalProps {
	dialogClose: () => void,
	onLoginSuccessfull: (user: User) => void,
}

const LoginModal = ({ dialogClose, onLoginSuccessfull }: LoginModalProps) => {

	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

	async function onSubmit(credentials: LoginCredentials) {
		try {
			const user = await ListApi.login(credentials);
			onLoginSuccessfull(user);
		} catch (error) {
			alert(error);
			console.log(error);
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
						LOGIN
					</h1>
					<div className={styles.flexrow}>
						<label className={styles.label} htmlFor="Username">
							<FaUser className={stylesicons.ico2}/>
							<label className={styles.placeholder}>Username</label>
						</label>
						<input type="text" id="username" className={styles.input} placeholder='Enter your username... ' {...register("username", { required: "dyy bhai" })} />
					</div>
					<div className={styles.flexrow}>
						<label className={styles.label} htmlFor="Password">
							<RiLockPasswordFill  className={stylesicons.ico2}/>
							<label className={styles.placeholder}>Password</label>
						</label>
						<input type="password" id="password" className={styles.input} placeholder='Enter your password...' {...register("password", { required: "dyy bhai" })} />
					</div>
					<div className={btnstyles.DialogButtons}>
						<button className={`${btnstyles.DialogButton} ${btnstyles.buttonDesign}`} type="submit" disabled={isSubmitting}>LOGIN</button>
						<button onClick={dialogClose} className={`${btnstyles.DialogButton} ${btnstyles.buttonDesign}`} >Close</button>
					</div>
				</div>
			</form>
		</>
	);
}

export default LoginModal;