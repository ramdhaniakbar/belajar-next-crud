'use client';
import { Post } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
	post: Post;
}

const Item = ({ post }: Props) => {
	const router = useRouter();

	const handleDelete = async (id: number) => {
		await fetch(`/api/post?id=${id}`, {
			method: 'DELETE',
		});
		router.refresh();
	};

	return (
		<div className='border rounded-md p-4 flex flex-col'>
			<h2 className='text-sm'>ID: {post.id}</h2>
			<h1>{post.title}</h1>
			<p>{post.content}</p>
			<div className='inline-flex mt-4 space-x-2'>
				<Link
					href={`/update/${post.id}`}
					className='text-xs hover:text-zinc-800 font-bold'
				>
					Update
				</Link>
				<button
					className='text-xs text-red-500 hover:text-red-400 font-bold'
					onClick={() => handleDelete(post.id)}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Item;
