import Navbar from './../Navbar/Navbar';
import SearchForm from './../SearchForm/SearchForm';
import './Header.css';

const Header = () => {
	return (
		<header className="header">
			<Navbar />
			<div className="header-content flex flex-c text-center text-white">
				<h2 className="header-title text-capitalize">
					Đọc sách là đứng lên vai người khổng lồ.
				</h2>
				<br />
				<p className="header-text fs-18 fw-3">
					Sách không chỉ là kho tàng kiến thức mà còn là phép màu kỳ diệu với
					tâm hồn mỗi người. Đọc sách cũng là một phương pháp thư giãn tinh thần
					và giải tỏa stress hiệu quả. Khi bạn đắm chìm vào những câu từ xinh
					đẹp, mọi mệt mỏi dường như tan biến.
				</p>
				<SearchForm />
			</div>
		</header>
	);
};

export default Header;
