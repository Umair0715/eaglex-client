import { useEffect, useRef, useState } from 'react'
import ScrollableFeed from 'react-scrollable-feed';
import users from 'data/users';
import Layout from 'components/global/Layout';
import Heading from 'components/global/Heading';
import { useQuery } from 'react-query';
import fetcher from 'utils/fetcher';
import { useSelector } from 'react-redux';
import Axios, { baseURL } from 'config/api';
import { ClipLoader } from 'react-spinners';
import Loader from 'components/global/Loader';
import ChatBox from './ChatBox';
import { io } from 'socket.io-client';
import toastError from 'utils/toastError';


const Support = ({ selectedChat = users[0] }) => {
    const imgRef = useRef();
    const [chat , setChat] = useState(null);
    const [messages , setMessages] = useState([]);   
    const [chatExist , setChatExist] = useState(false);
    const [socket , setSocket] = useState(null);
    const [createLoading , setCreateLoading] = useState(false);

    const { user } = useSelector(state => state.auth);
    const { isLoading , data } = useQuery('fetch-my-chat' , () => fetcher(`/chat/my` , user));

    useEffect(() => {
        setSocket(io(baseURL))
    }, []);
    

    useEffect(() => {
        if(data) {
            setChatExist(data?.data?.data?.chatExist)
            setChat(data?.data?.data?.chat);
            setMessages(data?.data?.data?.messages || []);
            if(data?.data?.data?.chatExist) {
                socket?.emit('join-chat' , data?.data?.data?.chat);
            }
        }
    }, [data]);

    const startConversationHandler = async () => {
        try {
            setCreateLoading(true);
            const { data : { data : { doc } } } = await Axios.post('/chat' , {
                userId : user?._id 
            });
            setChat(doc);
            setChatExist(true);
            setMessages([]);
            setCreateLoading(false);
        } catch (error) {
            setCreateLoading(false);
            toastError(error);
        }
    }

    return (
        <Layout>
            <Heading title='Need help? Message us' icon='envelope' />
            {
                isLoading 
                ? 
                    <Loader />
                :
                    <div className='w-full shadow-bg  mt-6'>
                        {
                            chatExist
                            ?
                                <ChatBox 
                                chat={chat}
                                setChat={setChat}
                                messages={messages}
                                setMessages={setMessages}
                                socket={socket}
                                />
                            :
                                <div 
                                className='flex items-center justify-center h-[200px]'>
                                    <button 
                                    className="btn-primary py-2 px-12"
                                    onClick={startConversationHandler}
                                    >
                                        {
                                            createLoading
                                            ? 
                                                <ClipLoader size={20} color='white' />
                                            : 
                                                'Start Conversation'
                                        }
                                    </button>
                                </div>
                        }
                    </div>
            }
        </Layout>
    )
}

export default Support