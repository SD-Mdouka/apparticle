"use client";
import { CommentWithUser } from '@/util/type';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UpdateCommentModel from './UpdateCommentModel';
import { useState } from 'react';

interface CommentItemProps {
  comment:CommentWithUser
}
const CommentItem = ( { comment }:CommentItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{backgroundColor:"#e5e7eb",marginBottom:'20px',padding:"12px",borderRadius:"2px",borderColor:"#d1d5db"}}>
       <div className='flex items-center justify-between mb-2'>
          <strong className='text-gray-800 uppercase'>
            {comment.user.username}
          </strong>
          <span className='bg-yellow-700 px-1 rounded-lg text-white' style={{backgroundColor:"#a16207"}}>
          {new Date(comment.createAt).toDateString()}
          </span>
       </div>
       <p className='text-gray-800 mb-2'>
            {comment.text}
       </p>
       <div className='items-center' style={{display: "flex", justifyContent:"end"}}>
         <FaEdit onClick={ () => setOpen(true)} className='text-green-600 text-xl cursor-pointer me-3' style={{color:"#16a34a"}}/>
         <FaTrash className='text-red-600 text-xl cursor-pointer' style={{color:"#dc2626"}}/>
       </div>
       {open && <UpdateCommentModel />}
       
       
    </div>
  )
}

export default CommentItem