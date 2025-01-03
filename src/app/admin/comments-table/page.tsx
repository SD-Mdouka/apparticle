import { redirect, useRouter } from 'next/navigation';
import { verifyTokenForPage } from '@/util/verifyToken';
import { cookies } from 'next/headers';
import { Comment } from '@prisma/client';
import DeleteCommentButton from './DeleteCommentButton';
import { getAllComments } from '@/apiCals/adminApiCall';

const AdminCommentTable = async () => {

    const cookie = await cookies();
    const token = cookie.get('jwtToken')?.value || "";
    if(!token) redirect('/');
  
    const payload = verifyTokenForPage(token);
    if(payload?.isAdmin === false) redirect('/');

    const comments: Comment[] = await getAllComments(token);

    return (
        <section className="p-5">
        <h1 className="mb-7 text-2xl font-semibold text-gray-700">Comments</h1>
        <table className="table w-full text-left">
          <thead className="border-t-2 border-gray-500 lg:text-xl">
            <tr>
              <th className="p-1 lg:p-2">Title</th>
              <th className="lg;inline-block">Created At</th>
              <th>Actions</th>
              <th className="hidden lg:inline-block"></th>
            </tr>
          </thead>
          <tbody>
            {comments.map(comment => (
              <tr className="border-b border-t border-gray-300" key={comment.id}>
                <td className="p-3 text-gray-700">{comment.text}</td>
                <td className="hidden lg:inline-block text-gray-700 font-normal p-3">
                  {new Date(comment.createAt).toDateString()}
                </td>
                <td className="p-3">
                  
                  <DeleteCommentButton commentId={comment.id}/>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        {/* <Pagination pages={pages} pageNumber={parseInt(pageNumber)} route={"/admin/articles-table"}/> */}
      </section>
    )
}

export default AdminCommentTable;