import ItemNotFound from 'components/global/ItemNotFound';
import Loader from 'components/global/Loader';
import RequestStatus from 'components/global/RequestStatus';
import Pagination from 'components/global/pagination';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import fetcher from 'utils/fetcher';


const DepositsTable = () => {
    const [deposits , setDeposits] = useState([]);
    const [status , setStatus] = useState('');
    const [currentPage , setCurrentPage] = useState(1);
    const [pages , setPages] = useState(1);
    

    const { user } = useSelector(state => state.auth);

    const { isLoading , data } = useQuery(['fetch-deposits-requests' , status , currentPage] , () => fetcher(`/deposit/my?status=${status}&page=${currentPage}` , user));

    useEffect(() => {
        if (data) {
            setDeposits(data?.data?.data?.docs);
            setCurrentPage(data?.data?.data?.page);
            setPages(data?.data?.data?.pages);
        }
    }, [data])

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            <div className='py-4 px-4 flex justify-end'>
                <select 
                className='sm:w-[200px] w-[100px] py-1.5 px-3 border border-dark rounded-full'
                onChange={e => setStatus(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="declined">Declined</option>
                </select>
            </div>
            {
                isLoading
                ? 
                    <Loader />
                : 
                deposits?.length > 0 
                ? 
                    <>
                        <Table className="w-full table-auto overflow-x-auto ">
                            
                            <Thead className="border-b text-sm">
                                <Tr className='bg-gradient text-white'>
                                    <Th scope="col" className=" font-medium px-6 py-4 text-center">
                                        Deposit Amount
                                    </Th>
                                    <Th scope="col" className=" font-medium px-6 py-4 text-center">
                                        Date
                                    </Th>
                                    <Th scope="col" className=" font-medium px-6 py-4 text-center">
                                        Bank Name
                                    </Th>
                                    <Th scope="col" className=" font-medium px-6 py-4 text-center">
                                        Account Holder
                                    </Th>
                                    <Th scope="col" className=" font-medium px-6 py-4 text-center">
                                        Account Number
                                    </Th>
                                    <Th scope="col" className=" font-medium px-6 py-4 text-center">
                                        Status
                                    </Th>
                                    <Th scope="col" className=" font-medium px-6 py-4 text-center ">
                                        View
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody className='text-sm'>
                            {
                                deposits?.map((item , i) => (
                                    <Tr
                                    key={item?._id} 
                                    className="bg-white border-b transition duration-300 ease-in-out"
                                    >
                                        <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                            {item?.amount}
                                        </Td>
                                        <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                            {moment(item?.createdAt).format('DD MMM YYY')}
                                        </Td>
                                        <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                            {item?.bankName}
                                        </Td>
                                        <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                            {item?.accountHolder}
                                        </Td>
                                        <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                            {item?.accountNo}
                                        </Td>
                                        <Td className="px-6 py-4 whitespace-nowrap text-red-500 sm:text-center text-right">
                                            <RequestStatus status={item?.status} />
                                        </Td>
                                        <Td className="px-6 py-4 whitespace-nowrap underline text-primary sm:text-center text-right"
                                        >
                                            <Link to={`/deposits/details/${item?._id}`} className='sm:text-center text-right'>
                                                Details
                                            </Link>
                                        </Td>
                                        
                                    </Tr>
                                    ))
                            }
                            
                            </Tbody>
                        </Table>
                        {
                            <Pagination 
                            currentPage={currentPage}
                            pageCount={pages}
                            setPage={setCurrentPage}
                            redux={false}
                            />
                        }
                    </>
                :
                    <ItemNotFound />
            }
        </div>
    )
}

export default DepositsTable;