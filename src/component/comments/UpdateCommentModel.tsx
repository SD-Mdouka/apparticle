"use client"

import { DOMAIN } from "@/util/Constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { IoMdCloseCircleOutline, IoMdCloudOutline } from "react-icons/io";
import { toast } from "react-toastify";

interface UpdateCommentModelProps {
    setOpen : Dispatch<SetStateAction<boolean>>;
    text:string;
    commentId:number;
}

const UpdateCommentModel = ({setOpen ,text,commentId}:UpdateCommentModelProps) => {
    const [updatedText,setUpdatedText] = useState(text);
    const router = useRouter();
    const formSubmitCommentHandel = async (e:FormEvent) => {
        e.preventDefault();
        if(updatedText === "") return toast.error('Please write something');

        try {
            await axios.put(`${DOMAIN}/api/comments/${commentId}`,{ text:updatedText})
            router.refresh();
            setUpdatedText("");
            setOpen(false)
            toast.success('Successfully logged in')
          } catch (error: any) {
            toast.warning(error?.response?.data.message);
          }
    }
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black bg-opacity-40 flex items-center justify-center"
             style={{ position:"fixed",top:'0',left:'0',bottom:'0',right:'0',backgroundColor:'black',display:'flex',zIndex:'10',opacity:'40',alignItems:'center',justifyContent:'center'}}>
            <div className="w-11/12 lg:w-1/4 bg-white rounded-lg p-3"
            style={{width:'91.666667%',backgroundColor:'white',borderRadius:'8px',padding:'12px'}}>
                <div className="flex justify-end items-start mb-5"
                style={{display:'flex', justifyContent:'end',alignItems:'start'}}>
                    <IoMdCloseCircleOutline onClick={() => setOpen(false)} className="text-3xl"  style={{color:'red',cursor:'pointer',}}/>
                </div>
                <form onSubmit={formSubmitCommentHandel}>
                    <input 
                    type="text"
                    placeholder="Edit Comment..."
                    className="text-xl rounded-lg p-2 w-full bg-white mb-2"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    />
                    <button style={{backgroundColor:'#15803d'}} 
                    className="bg-green-700 w-full text-white mt-2 p-1 text-xl rounded-lg hover:bg-green-900 transition" type="submit">
                        Edit
                    </button>
                </form>
            </div>
        </div>
    )
}
export default UpdateCommentModel;