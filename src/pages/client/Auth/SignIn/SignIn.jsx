import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../../redux/apiRequest';
import './SignIn.css';

const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loginError = useSelector((state) => state.auth.login.error);

	const onSubmit = (data) => {
		loginUser(data, dispatch, navigate);
	};

	return (
		<div className="signIn">
			<div className="container flex flex-c flex-column">
				<div className="section-title">
					<h2>Sign In</h2>
				</div>
				<div className="flex flex-column">
					<p>Username: quocnguyen</p>
					<p>Password: 123456</p>
				</div>
				<form className="signIn-form" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group flex flex-column">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							placeholder="username"
							{...register('username', {
								required: true,
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
							{...register('password', {
								required: true,
								minLength: 6,
							})}
						/>
						{errors.username?.type === 'required' && (
							<span>Trường này không được để trống!</span>
						)}
						{errors.password?.type === 'minLength' && (
							<span>Mật khẩu tối thiểu 6 kí tự</span>
						)}
						{loginError ? <span>Mật khẩu không chính xác</span> : ''}
					</div>
					<button className="btn-signin" type="submit">
						Sign In
					</button>
					<p className="link">
						Dont have an account? <Link to="/signup">Sign up</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
