import BackBtn from 'components/global/BackBtn';
import Heading from 'components/global/Heading';
import Layout from 'components/global/Layout';
import Pagination from 'components/global/pagination';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';


const WalletHistory = () => {


    return (
        <Layout>
            <div>
                <div className='flex items-center justify-between gap-4'>
                    <Heading title='Wallet History' icon='bill' />
                    <BackBtn />
                </div>
                <div className=" shadow-bg overflow-x-auto rounded-lg mt-6">
                    <div className='py-4 px-4 flex justify-end'>
                        <select className='sm:w-[200px] w-[100px] py-1.5 px-3 border border-dark rounded-full '>
                            <option value="all">All</option>
                            <option value="all">Daily ROI</option>
                            <option value="all">Level 1</option>
                            <option value="all">Level 2</option>
                            <option value="all">Level 3</option>
                        </select>
                    </div>
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
                                [...Array(6).keys()].map((item , i) => (
                                    <Tr
                                    key={i} 
                                    className="bg-white border-b transition duration-300 ease-in-out"
                                    >
                                    <Td className={`  px-6 py-4 whitespace-nowrap sm:text-center text-right ${i===1 ? 'text-primary' : i === 2 ? 'text-red-500' : i===3 ? 'text-primary' : 'text-red-500'} `}>
                                            {
                                            i===1 ? '+5000' : i === 2 ? '-1350' : i===3 ? '+750' : '-1550'
                                            }
                                    </Td>
                                    <Td 
                                    className={`  px-6 py-4 whitespace-nowrap sm:text-center text-right ${i===1 ? 'text-primary' : i === 2 ? 'text-red-500' : i===3 ? 'text-primary' : 'text-red-500'} `}
                                    >
                                        {
                                            i===1 ? 'Received' : i === 2 ? 'Detucted' : i===3 ? 'Received' : 'Detucted'
                                        }
                                    </Td>
                                    <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                        10 Feb 2023
                                    </Td>
                                    <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                        {
                                            i===1 ? 'Daily ROI' : i === 2 ? 'Withdraw' : i===3 ? 'Sponser Bonus' : i===4 ? 'Invested In Tesla' : 'Withdraw'
                                        }
                                    </Td>
                                </Tr>
                                ))
                        }
                        
                        </Tbody>
                    </Table>
                    {
                        <Pagination 
                        currentPage={1}
                        pageCount={5}
                        setPage={''}
                        />
                    }
                </div>
            </div>
        </Layout>
    )
}

export default WalletHistory;