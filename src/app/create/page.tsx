'use client';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';

const Page = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			const res = await fetch('/api/post', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					content,
				}),
			});

			setIsLoading(false);

			router.push('/');

			return await res.json();
		} catch (error) {
			console.error(`Error ${error}`);
		}
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
