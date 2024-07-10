import { Link, useNavigate } from "react-router-dom";
import { LuChevronDown } from "react-icons/lu";
import { useAuthContext } from "../../contexts/AuthProvider";
import configDev from "../../configs";
import useFetch from "../../hooks/useFetch";

const logo_url = "/logo.png";

export default function Navigator() {
	const { user, setUser } = useAuthContext();
	const { fetch, loading, error } = useFetch();
	const navigate = useNavigate();

	const onLogout = async () => {
		const options = {
			url: configDev['backendURL'] + "/auth/logOut",
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-client-id": user._id,
			},
			withCredentials: true,
		};

		const result = await fetch(options);
		clearUser();
		navigate("/login");
	};

	const clearUser = () => {
		setUser(null);
		localStorage.clear();
	};

	return (
		<header
			className="w-full h-[4.5rem] bg-main px-8
            flex items-center justify-between
            border-b-1 border-slate-500 shadow-messagebox"
		>
			<div className="flex items-center h-[100%] sm:ml-12 ml-0">
				<a
					href="/"
					className="flex items-center justify-start w-36"
				>
					<img src={logo_url} className="w-[50%]" />
				</a>
			</div>
			<div className="flex items-center justify-center h-[100%] mr-10 ml-auto">
				<div className="flex items-center text-zinc-800 text-sm">
					{user ? (
						<div className="flex items-center justify-between px-4 cursor-pointer gap-3">
							<div className="avatar">
								<div className="w-12 rounded-full">
									<img src={user.avatar} />
								</div>
							</div>

							<div className="dropdown dropdown-hover">
								<div
									tabIndex={0}
									role="button"
									className="flex flex-row py-2 w-32 rounded-badge gap-1 text-sm text-center items-center justify-center font-bold bg-[#ccc] hover:bg-[#71B190]"
								>
									{user.username} <LuChevronDown size={16} />
								</div>
								<ul
									tabIndex={0}
									className="dropdown-content z-[1] menu shadow-messagebox p-2 w-32"
								>
									<li onClick={onLogout}>
										<a>Logout</a>
									</li>
								</ul>
							</div>
						</div>
					) : (
						<Link to="/login" className="px-4 font-bold">
							Sign In | Sign Up
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
