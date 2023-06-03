import Axios, { baseURL } from 'config/api';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed';
import { ClipLoader } from 'react-spinners';
import toastError from 'utils/toastError';

const ChatBox = ({ chat , setChat , messages , setMessages , socket }) => {
    const imgRef = useRef();

    const [message , setMessage] = useState([]);
    const [sendMessageLoading , setSendMessageLoading] = useState(false);
    const [messageType , setMessageType] = useState('text');
    const [fileName , setFileName] = useState('');
    const [newMessage , setNewMessage] = useState('');

    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        if(!socket) return;
        socket.on('new-message-recieved', (message) => {
            setNewMessage(message);
        })
    }, [socket]);

    useEffect(() => {
        if(newMessage) {
            setMessages(prev => ([...prev , newMessage]))
        }
    }, [newMessage])

    const sendMessageHandler = async (e) => {
        e.preventDefault();
        const newMessageData = {
            message ,
            sender : user ,
            chatId : chat?._id ,
            type : messageType ,
            senderType : "User"
        }

        try {
            setSendMessageLoading(true);
            const { data : { data : { doc } } } = await Axios.post('/message' , newMessageData );
            setMessages(prev => [...prev , doc]);
            socket?.emit('new-message' , doc);
            setMessage('');
            setFileName('');
            setMessageType('text')
            setSendMessageLoading(false);
        } catch (error) {
            setSendMessageLoading(false);
            toastError(error);
        }
    }

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if(!chatContainerRef.current) return;
        chatContainerRef.current.scrollTop = chatContainerRef?.current?.scrollHeight;
    }, [messages , chatContainerRef]);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setMessageType('file');
        setFileName(file?.name);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setMessage(reader.result);
        }
    }

    return (
        <div>
            <div className='py-4 px-4 flex items-center gap-4 border-b'>
                <div className='border rounded-full p-1'>
                    <img 
                    src={baseURL + '/user/default.png'} 
                    alt={chat?.admin?.firstName} 
                    className='w-[50px] h-[50px] rounded-full object-cover'
                    />
                </div>
                <div className='font-semibold'>
                    <p>{chat?.admin?.firstName + " " + chat?.admin?.lastName}</p>
                    {/* <p className='text-sm text-gray-500'>{chat?.admin?.phone}</p> */}
                </div>
            </div>
            <div>
            {
                messages?.length > 0
                ? 
                    <ScrollableFeed>
                        <div className='flex flex-col gap-4 p-4 h-[350px] overflow-auto '
                        ref={chatContainerRef}
                        >
                            {
                                messages?.map((item , i) => (
                                    <div 
                                    className={`
                                    ${item?.sender?._id === user?._id  ? 'flex justify-end' : ''}`} 
                                    key={i}>
                                        <div className='flex flex-col '>
                                        {
                                            item?.type === 'text' 
                                            ? 
                                            <div className={`w-fit max-w-[400px] rounded-md border p-3 text-[15px] 
                                            ${item?.sender?._id === user?._id ? "bg-primary text-white" : "bg-gray-200 text-black"}
                                            `}>
                                                {item?.message}
                                            </div>
                                            : 
                                            <div className={`w-fit max-w-[300px] max-h-[250px] h-auto rounded-md border p-3 text-[15px] 
                                            ${item?.sender?._id === user?._id ? "bg-primary text-white" : "bg-gray-200 text-black"}
                                            `}>
                                                <img 
                                                src={baseURL + item?.message}
                                                alt="" 
                                                className='w-full h-full object-cover'
                                                />
                                            </div>
                                        }
                                        {/* <div className='text-xs '>
                                            <TimeAgo date={new Date(item?.createdAt)} />
                                        </div> */}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </ScrollableFeed>
                :
                    <div className='w-full h-[350px] flex items-center justify-center font-semibold text-lg'>
                        No Message Found.
                    </div>
            }
            </div>
            <div className='w-full table-header-shadow rounded-md flex items-center gap-3 mt-4 border-t border-t-gray-300'>
                <form 
                className='flex items-center justify-between w-full px-3 gap-4 py-6'
                onSubmit={sendMessageHandler}
                >
                     <div className='w-fit'>
                        <input 
                        type="file" 
                        ref={imgRef} 
                        onChange={handleFileChange}
                        hidden 
                        />
                        <div className='cursor-pointer round-shadow rounded-full w-[40px] h-[40px] bg-gray-200 flex items-center justify-center text-xl'
                        onClick={() => imgRef.current.click() }>
                            <i className="uil uil-camera"></i>
                        </div>
                    </div>
                    <div className='w-full'>
                        <input 
                        placeholder='Write message here...'
                        className='rounded-full w-full py-2 px-4   bg-transparent outline-none  border border-gray-400 focus:border-primary'
                        value={messageType === 'file' ? fileName : message}
                        onChange={e => setMessage(e.target.value)}
                        readOnly={messageType==='file'}
                        />
                    </div>
                    <div className='flex-[0.1]'>
                        <button 
                        className='btn-primary py-2 px-4'
                        disabled={!message || sendMessageLoading}
                        >
                            {
                                sendMessageLoading 
                                ? 
                                    <ClipLoader size={20} color='white' />
                                : 
                                    'Send'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChatBox