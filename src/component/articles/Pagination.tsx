import Link from "next/link";

const pagesArray = [1, 2, 3]

const Pagination = () => {

    return (
        <div className='flex items-center justify-center mt-2 mb-10'>
            <Link href={''} className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition">
                Prev
            </Link>
            {pagesArray.map(page => (
                <Link href={''} className={`border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition`} key={page}>
                    {page}
                </Link>
            ))}
            <Link href={''} className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition">
                Next
            </Link>
        </div>
    )
}

export default Pagination;