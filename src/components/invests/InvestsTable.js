import Pagination from 'components/global/pagination';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useClickOutside from 'utils/clickOutside';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';


const InvestTable = () => {
    const dropMenuRef = useRef(null);
    const [showDropMenu , setShowDropMenu] = useState(false);
    const [selectedMenuIndex , setSelectedMenuIndex]  = useState(0);

    useClickOutside(dropMenuRef , () => setShowDropMenu(false));

    return (
        <div className=" shadow-bg overflow-x-auto rounded-lg">
            <div className='py-4 px-4 flex justify-end'>
                <select className='sm:w-[200px] w-[100px] py-1.5 px-3 border border-dark rounded-full '>
                    <option value="all">All</option>
                    <option value="all">In Progress</option>
                    <option value="all">Completed</option>
                </select>
            </div>
            <Table className="w-full table-auto overflow-x-auto ">
                
                <Thead className="border-b text-sm">
                    <Tr className='bg-gradient text-white'>
                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                            Company Name
                        </Th>
                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                            Invested Amount
                        </Th>
                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                            Profit
                        </Th>
                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                            Start Date
                        </Th>
                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                            End Date
                        </Th>
                        <Th scope="col" className=" font-medium px-6 py-4 text-center">
                            Status
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
                                Tesla
                            </Td>
                            <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                10,000
                            </Td>
                            <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                50,000
                            </Td>
                            <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                23 April 2023
                            </Td>
                            <Td className=" text-gray-900  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                3 May 2023
                            </Td>
                            
                            <Td className=" text-primary  px-6 py-4 whitespace-nowrap sm:text-center text-right">
                                Completed
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

export default InvestTable;