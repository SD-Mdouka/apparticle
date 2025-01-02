import { toast } from 'react-toastify';
import { redirect, useRouter } from 'next/navigation';
import { verifyTokenForPage } from '@/util/verifyToken';
import { cookies } from 'next/headers';

const AdminCommentTable = async () => {

    const cookie = await cookies();
    const token = cookie.get('jwtToken')?.value || "";
    if(!token) redirect('/');
  
    const payload = verifyTokenForPage(token);
    if(payload?.isAdmin === false) redirect('/');

    return (
        <div className="flex flex-col">
            comments table
        </div>
    )
}

export default AdminCommentTable;