import { generatePaginationNumber } from '@/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

interface Props {
  currentPage: number
  totalPages: number
}
export const Pagination = ({ currentPage, totalPages }: Props) => {
  // const pathname = usePathname()
  // const searchParams = useSearchParams()
  // const currentPageClient = Number(searchParams.get('page')) ?? 1
  // console.log({ searchParams, pathname, currentPageClient })

  const arrayNumberPage = generatePaginationNumber(currentPage, totalPages)

  const handleNavigate = (page: number | string) => {
    if (page === '...') return '#'
    return `?page=${page}`
  }

  return (
    <div className='flex justify-center my-10'>
      <nav aria-label='Page navigation example'>
        <ul className='flex list-style-none'>
          <li className='page-item disabled'>
            <Link
              className={clsx(
                'page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none',
                {
                  'cursor-none pointer-events-none !text-gray-400':
                    currentPage <= 1,
                },
              )}
              href={`?page=${currentPage - 1}`}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {arrayNumberPage.map((page, index) => (
            <li key={`item-${index}${page}`} className='page-item active'>
              <Link
                className={clsx(
                  'page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none',
                  {
                    '!bg-blue-600 outline-none transition-all  text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md':
                      page === currentPage,
                  },
                )}
                href={handleNavigate(page)}
              >
                {page}
                {/* <span className='visually-hidden'></span> */}
              </Link>
            </li>
          ))}
          <li className='page-item'>
            <Link
              className={clsx(
                'page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none',
                {
                  'cursor-none pointer-events-none !text-gray-400':
                    +currentPage >= +totalPages,
                },
              )}
              href={`?page=${currentPage + 1}`}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
