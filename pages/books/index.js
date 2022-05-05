import { useState, useEffect } from 'react';

function BooksPage() {
	const [books, setBooks] = useState([]);
	const [title, setTitle] = useState('');
	const [pages, setPages] = useState(0);
	const [language, setLanguage] = useState('');

	const fetchBooks = () => {
		fetch('/api/books')
			.then((res) => res.json())
			.then((data) => setBooks(data));
	};
	useEffect(() => {
		fetchBooks();
	}, []);

	const submitBook = async () => {
		const response = await fetch('/api/books', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title,
				pages,
				language
			})
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const book = await response.json();
		setBooks([...books, book]);
	};

	const deleteBook = (id) => {
		fetch(`/api/books`, {
			method: 'DELETE',
			body: JSON.stringify(id)
		})
			.then((res) => res.json())
			.then(() => {
				setBooks(books.filter((book) => book.id !== id));
			});
	};

	return (
		<div align="center">
			<hr />
			<div align="center">
				{'Title: '}
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<br />
				{'Pages: '}
				<input
					type="number"
					value={pages}
					onChange={(e) => setPages(e.target.value)}
				/>
				<br />
				{'Language: '}
				<input
					type="text"
					value={language}
					onChange={(e) => setLanguage(e.target.value)}
				/>
				<br />
				<button onClick={submitBook}>Submit book</button>
			</div>
			<hr />
			{/* <button onClick={fetchBooks}>Get the latest books</button> */}
			{books &&
				books.map((book, idx) => (
					<div key={idx}>
						<h2>{book.title}</h2>
						<h3>{book.pages}</h3>
						<h4>{book.language}</h4>
						<button onClick={() => deleteBook(book.id)}>Delete</button>
						<hr />
					</div>
				))}
		</div>
	);
}

export default BooksPage;
