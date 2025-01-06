"use client"

import { DOMAIN } from "@/util/Constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


interface DeleteArticleProps {
    articleId : number;
}
const DeleteArticleButton = ({articleId}:DeleteArticleProps) => {
    const router = useRouter();
    const DeleteArticleHandler = async () => {
        try {
            if (confirm("you want delete this article,Are you sure?"))
              {
                await axios.delete(`${DOMAIN}/api/articles/${articleId}`)
                router.refresh();
                toast.success('Article deleted');
              } 
            } catch (error) {
              
              toast.warning("warning in the Server");            }
    }
    return (
        <>
        <div onClick={DeleteArticleHandler} className="bg-red-600 rounded-lg cursor-pointer inline-block text-white px-2 py-1 transition hover:bg-red-800">
                Delete
              </div>
        </>
    )
}
export default DeleteArticleButton;