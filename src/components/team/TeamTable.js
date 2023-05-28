import Pagination from 'components/global/pagination';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';


const TeamTable = () => {

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            <div className='py-4 px-4 flex justify-end'>
                <select className='sm:w-[200px] w-[100px] py-1.5 px-3 border border-dark rounded-full '>
                    <option value="all">All Levels</option>
                    <option value="all">Level 1</option>
                    <option value="all">Level 2</option>
                    <option value="all">Level 3</option>
                </select>
            </div>
            <Table className="w-full table-auto overflow-x-auto ">
                
                <Thead className="border-b text-sm">
                    <Tr className='bg-gradient text-white'>
                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                            Member Name
                        </Th>
                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                            Phone Number
                        </Th>
                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                            Joined
                        </Th>
                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                            Team Level
                        </Th>
                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                            Profit Earned
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
                            <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                John Doe
                            </Td>
                            <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                03490394584
                            </Td>
                            <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                23 April 2023
                            </Td>
                            <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                2
                            </Td>
                            <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                10,000
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
    )
}

export default TeamTable;