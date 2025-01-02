
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/util/verifyToken";
import { redirect } from "next/navigation";
import AddArticle from "./AddArticle";

const AdminPage = async () => {
  const cookie = await cookies();
    const token = cookie.get('jwtToken')?.value || "";
    if(!token) redirect('/');
  
    const payload = verifyTokenForPage(token);
    if(payload?.isAdmin === false) redirect('/');
  return (
    <div className="fix-height flex items-center justify-center px-5 lg:px-20">
      <div className="shadow p-4 bg-purple-200 rounded w-full">
        <h2 className="text-xl lg:text-2xl text-gray-700 font-semibold mb-4">
          Dashboard
        </h2>
        <AddArticle/>
      </div>
    </div>
  )
}

export default AdminPage;