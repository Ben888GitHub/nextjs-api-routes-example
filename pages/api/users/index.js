import { users } from '../../../users';

export default async function handler(req, res) {
	res.json(users);
}
