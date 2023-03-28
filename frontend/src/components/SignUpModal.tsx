import styles from '../styles/TodolistStyle.module.css'
import btnstyles from '../styles/Button.module.css'
import { useForm } from "react-hook-form";
import { SignUpCredentials } from "../api/todolist_api";
import { User } from "../models/userModel";
import * as ListApi from '../api/todolist_api'
import { useEffect } from 'react';
import {FaUser} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import {MdEmail} from 'react-icons/md'
import stylesicons from '../styles/Icons.module.css';


interface SignUpModalProps {
	dialogClose: () => void,
	onSignUpSuccessfull: (user: User) => void,
}
const SignUpModal = ({ dialogClose, onSignUpSuccessfull }: SignUpModalProps) => {

	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpCredentials>();

	async function onSubmit(credentials: SignUpCredentials) {
		try {
			const newUser = await ListApi.signUp(credentials);
			onSignUpSuccessfull(newUser);
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
						SIGNUP
					</h1>
					<div className={styles.flexrow}>
						<label className={styles.label} htmlFor="Username">
						<FaUser className={stylesicons.ico2}/>
							<label className={styles.placeholder}>Username</label>
						</label>
						<input type="text" id="username" className={styles.input} placeholder='Enter your username... ' {...register("username", { required: "dyy bhai" })} />
					</div>
					<div className={styles.flexrow}>
						<label className={styles.label} htmlFor="Email">
						<MdEmail  className={stylesicons.ico2}/>
							<label className={styles.placeholder}>Email</label>
						</label>
						<input type="email" id="email" className={styles.input} placeholder='Enter your email...' {...register("email", { required: "dyy bhai" })} />
					</div>
					<div className={styles.flexrow}>
						<label className={styles.label} htmlFor="Password">
						<RiLockPasswordFill  className={stylesicons.ico2}/>
							<label className={styles.placeholder}>Password</label>
						</label>
						<input type="password" id="password" className={styles.input} placeholder='Enter your password...' {...register("password", { required: "dyy bhai" })} />
					</div>
					<div className={btnstyles.DialogButtons}>
						<button className={`${btnstyles.DialogButton} ${btnstyles.buttonDesign}`} type="submit" disabled={isSubmitting}>SIGN-UP</button>
						<button onClick={dialogClose} className={`${btnstyles.DialogButton} ${btnstyles.buttonDesign}`} >Close</button>
					</div>
				</div>
			</form>
		</>
	);
}

export default SignUpModal;