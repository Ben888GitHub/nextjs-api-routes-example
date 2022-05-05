import { users } from '../../../users';

export default async function handler(req, res) {
	const { id } = req.query;

	const user = users.find((user) => user.id === parseInt(id));

	if (!user) {
		res.status(404).json({
			status: 404,
			message: 'User not found'
		});
	}
	res.json(user);
	console.log(req.method);
}
