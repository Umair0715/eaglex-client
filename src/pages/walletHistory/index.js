import BackBtn from 'components/global/BackBtn';
import Heading from 'components/global/Heading';
import Layout from 'components/global/Layout';
import Loader from 'components/global/Loader';
import Pagination from 'components/global/pagination';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import fetcher from 'utils/fetcher';


const WalletHistory = () => {
    const { user } = useSelector(state => state.auth);
    const [history , setHistory] = useState([]);
    const [currentPage , setCurrentPage] = useState(1);
    const [pages , setPages] = useState(1);

    const { isLoading , data } = useQuery('fetch-wallet-history' , () => {
        return fetcher('/wallet-history/my' , user)
    });

    useEffect(() => {
        if(data) {
            setHistory(data?.data?.data?.docs);
            setCurrentPage(data?.data?.data?.page);
            setPages(data?.data?.data?.pages);
        }
    }, [data])


    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4 mb-6'>
                    <Heading title='Wallet History' icon='history' />
                    <BackBtn />
                </div>
                {
                    isLoading
                    ? 
                        <Loader />
                    : 
                        <div className=" shadow-bg overflow-x-auto rounded-lg ">
                            <Table className="w-full table-auto overflow-x-auto ">
                                <Thead className="border-b text-sm">
                                    <Tr className='bg-gradient text-white'>
                                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                                            Amount
                                        </Th>
                                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                                            Action
                                        </Th>
                                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                                            Date
                                        </Th>
                                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                                            Description
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody className='text-sm'>
                                {
                                        history?.map((item , i) => (
                                            <Tr
                                            key={item?._id} 
                                            className="bg-white border-b transition duration-300 ease-in-out"
                                            >
                                            <Td className={`  px-6 py-4 whitespace-nowrap sm:text-center text-right ${
                                                item?.action === '+' ? 'text-primary' : item?.action === '-' ? 'text-red-500' : ''} `
                                            }>
                                                {item?.action + item?.amount}
                                            </Td>
                                            <Td 
                                            className={`  px-6 py-4 whitespace-nowrap sm:text-center text-right 
                                            ${
                                                item?.action === '+' ? 'text-primary' : item?.action === '-' ? 'text-red-500' : ''}
                                            `}
                                            >
                                                {item?.action === '+' ? 'Added' : 'Detucted'}
                                            </Td>
                                            <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                                {moment(item?.createdAt).format('DD MMM YYYY')}
                                            </Td>
                                            <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap  text-center">
                                                {item?.description}
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
                                />
                            }
                        </div>

                }
            </div>
        </Layout>
    )
}

export default WalletHistory;