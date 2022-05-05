import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
function User() {
	const router = useRouter();
	const { id } = router.query;
	const [user, setUser] = useState({
		name: '',
		id: 0
	});

	const fetchUser = async () => {
		const response = await fetch(`/api/users/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const user = await response.json();
		setUser({
			name: user.name,
			id: user.id
		});
	};

	useEffect(() => {
		// if (!id) {
		// 	return;
		// }
		id && fetchUser();
	}, [id]);

	console.log('hh');

	return (
		<>
			{user && (
				<>
					<h1>{user?.name}</h1>
					<h1>{user?.id}</h1>
					<button onClick={() => router.push('/')}>Home</button>
				</>
			)}
		</>
	);
}

export default User;
