import ItemNotFound from 'components/global/ItemNotFound';
import Pagination from 'components/global/pagination';
import moment from 'moment';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';


const TeamTable = ({ teamMembers }) => {
    return (
        teamMembers?.length > 0 
        ? 
            <div className="overflow-x-auto rounded-lg">
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
                                Deposit Amount
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody className='text-sm'>
                    {
                            teamMembers?.map((item , i) => (
                                <Tr
                                key={item?._id} 
                                className="bg-white border-b transition duration-300 ease-in-out"
                                >
                                <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                    {item?.firstName + ' ' + item?.lastName}
                                </Td>
                                <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                    {item?.phone}
                                </Td>
                                <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                    {moment(item?.createdAt).format('DD MMM YYYY')}
                                </Td>
                                <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                    {item?.level}
                                </Td>
                                <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                    {item?.totalDepositAmount?.toFixed(2)}
                                </Td>
                            </Tr>
                            ))
                    }
                    </Tbody>
                </Table>
            </div>
        :
            <ItemNotFound message='No team member found.' />
    )
}

export default TeamTable;