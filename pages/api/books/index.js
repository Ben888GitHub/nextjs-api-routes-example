import { books } from '../../../books';

export default function handler(req, res) {
	if (req.method === 'GET') {
		res.status(200).json(books);
	} else if (req.method === 'POST') {
		const newBook = req.body;
		books.push({ id: Date.now(), ...newBook });
		res.status(201).json(newBook);
	} else if (req.method === 'DELETE') {
		const { id } = req.body;
		console.log(`ID: ${req.body}`);
		const book = books.filter((book) => book.id !== parseInt(id));
		if (!book) {
			res.status(404).json({
				status: 404,
				message: 'Book not found'
			});
		}

		res.status(200).json(book);
	}
}
