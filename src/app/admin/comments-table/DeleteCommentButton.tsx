"use client"

import { DOMAIN } from "@/util/Constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


interface DeleteCommentProps {
    commentId : number;
}
const DeleteCommentButton = ({commentId}:DeleteCommentProps) => {
    const router = useRouter();
    const DeleteCommentHandler = async () => {
        try {
            if (confirm("you want delete this comment, Are you sure?"))
              {
                await axios.delete(`${DOMAIN}/api/comments/${commentId}`)
                router.refresh();
                toast.success('Comment deleted');
              } 
            } catch (error) {
              toast.warning("Warning in server");
            }
    }
    return (
        <>
        <div onClick={DeleteCommentHandler} className="bg-red-600 rounded-lg cursor-pointer inline-block text-white px-2 py-1 transition hover:bg-red-800">
                Delete
              </div>
        </>
    )
}
export default DeleteCommentButton;