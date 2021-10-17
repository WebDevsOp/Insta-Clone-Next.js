import { BookmarkIcon, ChatIcon, DotsHorizontalIcon, EmojiHappyIcon, HeartIcon, PaperAirplaneIcon } from "@heroicons/react/outline"

import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { useEffect, useState } from "react"
import { useSession } from 'next-auth/react'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "@firebase/firestore"
import { db } from "../firebase"
import Moment from "react-moment"

const Post = ({ id, username, userImg, postImg, caption }) => {
	const { data: session } = useSession();
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState('');
	const [readMore, setReadMore] = useState(false);
	useEffect(() =>
		onSnapshot(
			query(
				collection(db, 'posts', id, 'comments'),
				orderBy('timeStamp', 'desc')
			),
			(snapshot) => setComments(snapshot.docs)
		), [db]);

	const sendComment = async (e) => {
		e.preventDefault();
		const commentToSend = comment;
		setComment('');
		await addDoc(collection(db, 'posts', id, 'comments'), {
			comment: commentToSend,
			username: session.user.username,
			userImage: session.user.image,
			timeStamp: serverTimestamp(),
		})
	}
	return (
		<div className='bg-white my-7 border rounded-sm'>
			<div className="flex items-center p-5 ">
				{/* Header */}
				<img src={userImg} className='rounded-full h-12 w-12 object-contain border p-1 m-3' />
				<p className="flex-1 font-bold">{username}</p>
				<DotsHorizontalIcon className='h-5' />
			</div>
			{/* Img */}
			<img src={postImg} className="object-cover w-full" />

			{/* Buttons */}
			{session && (
				<div className="flex justify-between px-4 pt-4">
					<div className="flex space-x-4">
						<HeartIcon className="button" />
						<ChatIcon className="button" />
						<PaperAirplaneIcon className="button" />
					</div>
					<BookmarkIcon className="button" />
				</div>
			)}
			{/* Captions */}
			<p className={readMore ? "p-5" : "p-5 truncate"}>
				<span className="font-bold mr-1">{username} </span>
				<p className="font-mono inline">{caption}</p>
				<p onClick={() => setReadMore(!readMore)} className="cursor-pointer font-extrabold text-blue-700">{readMore ? 'Show Less' : 'Show More'}</p>
			</p>
			{/* comments */}

			{comments.length > 0 && (
				<div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
					{comments.map(comment => (
						<div key={comment.id} className="flex items-center space-x-2 mb-3">
							<img src={comment.data().userImage} alt="" className="h-7 rounded-full" />
							<p className="text-sm flex-1 font-mono"><span className="font-bold">{comment.data().username}   </span>{comment.data().comment}</p>
							<Moment fromNow className="pr-5 text-xs">{comment.data().timeStamp?.toDate()}</Moment>
						</div>
					))}
				</div>
			)}

			{/* Input Box */}
			{session && (
				<form className="flex items-center p-4">
					<EmojiHappyIcon className="h-7" />
					<input
						type="text"
						className="border-none flex-1 focus:ring-0 outline-none"
						placeholder="Add a Comment ..."
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<button className="font-semibold text-blue-500 disabled:text-gray-300 disabled:cursor-not-allowed" onClick={sendComment} type="submit" disabled={!comment.trim()}>Post</button>
				</form>
			)}
		</div >
	)
}

export default Post