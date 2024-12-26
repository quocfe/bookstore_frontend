import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../../../redux/apiRequest';
import './SignUp.css';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import userApi from '../../../../api/client/user';

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const password = useRef({});
	password.current = watch('password', '');

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await userApi.getAllUser();
			setUsers(response.data);
		};

		fetchUsers();
	}, []);

	const validateEmail = (value) => {
		const existingEmail = users.find((user) => user.email === value);
		return !existingEmail ? true : 'Email đã tồn tại';
	};

	const validateUsername = (value) => {
		const existingUser = users.find((user) => user.username === value);
		return !existingUser ? true : 'Username đã tồn tại';
	};

	const validateConfirm = (value) => {
		return value === password.current ? true : ' Mật khẩu không khớp ';
	};

	const onSubmit = (data) => {
		const user = {
			username: data.username,
			email: data.email,
			password: data.password,
		};
		registerUser(user, dispatch, navigate);
	};

	return (
		<div className="signUp">
			<div className="container flex flex-c flex-column">
				<div className="section-title">
					<h2>Sign Up</h2>
				</div>
				<form className="signUp-form" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group flex flex-column">
						<label htmlFor="email">Email</label>
						<input
							type="text"
							name="email"
							placeholder="email"
							{...register('email', {
								required: true,
								validate: validateEmail,
							})}
						/>
						{errors.email?.type === 'required' && (
							<span>Trường này không được để trống!</span>
						)}
						{errors.email?.message && <span>{errors.email.message}</span>}
					</div>
					<div className="form-group flex flex-column">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							placeholder="username"
							{...register('username', {
								required: true,
								validate: validateUsername,
							})}
						/>
						{errors.username?.type === 'required' && (
							<span>Trường này không được để trống!</span>
						)}
						{errors.username?.message && <span>{errors.username.message}</span>}
					</div>
					<div className="form-group flex flex-column">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							placeholder="password"
							{...register('password', { required: true, minLength: 6 })}
						/>
						{errors.password?.type === 'required' && (
							<span>Trường này không được để trống!</span>
						)}
						{errors.password?.type === 'minLength' && (
							<span>Mật khẩu tối thiểu 6 kí tự</span>
						)}
					</div>
					<div className="form-group flex flex-column">
						<label htmlFor="passwordConfirm">Password Confirmation</label>
						<input
							type="password"
							name="passwordConfirm"
							placeholder="passwordConfirm"
							{...register('passwordConfirm', {
								required: true,
								minLength: 6,
								validate: validateConfirm,
							})}
						/>
						{errors.passwordConfirm?.type === 'required' && (
							<span>Trường này không được để trống!</span>
						)}
						{errors.passwordConfirm?.message && (
							<span>{errors.passwordConfirm.message}</span>
						)}
					</div>
					<button className="btn-signUp" type="submit">
						Sign Up
					</button>

					<p className="link">
						Have an account? <Link to="/signin">Sign in</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
