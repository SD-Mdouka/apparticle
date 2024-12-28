"use client"

import { DOMAIN } from "@/util/Constant";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const LogoutButton = () => {
    const router = useRouter();
    const logoutHandler = async () => {
        try {
            await axios.get(`${DOMAIN}/api/users/logout`)
            router.push("/");
            router.refresh();
            toast.success('Successfully logged in')
          } catch (error: any) {
            toast.warning("Something went wrong");
          }
    }
    return (
        <>
        <button onClick={logoutHandler} className="bg-[#fff] block font-semibold text-red Alpha  px-[25px] py-[12px] transition hover:bg-grayLighterAlpha w-full text-left">
                Logout
              </button>
        </>
    )
}
export default LogoutButton;