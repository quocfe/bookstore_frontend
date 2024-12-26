import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteAdmin = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	return user && user.isAdmin == 'true' ? (
		<Outlet />
	) : (
		<Navigate to="/signin" />
	);
};

export default PrivateRouteAdmin;
