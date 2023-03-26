'use client';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';

const Page = ({ params }: { params: { id: string } }) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const id = params.id;
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			const res = await fetch('/api/post', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					content,
					id,
				}),
			});

			router.push('/');
		} catch (error) {
			console.error(`Error ${error}`);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const res = await fetch(`/api/post/${id}`);
		const json = await res.json();

		if (!json) {
			router.push('/404');
			return;
		}

		setTitle(json.post.title);
		setContent(json.post.content);
	};

	return (
		<form
			className='w-[1000px] mx-auto pt-20 flex flex-col gap-2'
			onSubmit={handleSubmit}
		>
			<input
				type='text'
				value={title}
				placeholder='Masukan Judul'
				onChange={(e) => setTitle(e.target.value)}
				className='w-full border p-2 rounded-md'
			/>
			<input
				type='text'
				value={content}
				placeholder='Masukan Konten'
				onChange={(e) => setContent(e.target.value)}
				className='w-full border p-2 rounded-md'
			/>
			<button
				type='submit'
				disabled={isLoading}
				className='w-full bg-zinc-800 border p-2 rounded-md text-white hover:opacity-90'
			>
				{isLoading ? 'Loading...' : 'Submit'}
			</button>
		</form>
	);
};

export default Page;
