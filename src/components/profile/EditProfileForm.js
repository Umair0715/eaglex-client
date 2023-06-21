import Heading from 'components/global/Heading'
import Input from 'components/global/Input'
import Loader from 'components/global/Loader';
import Axios, { baseURL } from 'config/api';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { updateProfile } from 'redux/actions/authActions';
import isBase64 from 'utils/isBase64';
import toastError from 'utils/toastError';

const EditProfileForm = () => {
    const imgRef = useRef(null);
    const [fetchLoading , setFetchLoading] = useState(false);
    const [profile , setProfile] = useState('');
    const [image , setImage] = useState('');
    const [firstName , setFirstName] = useState('');
    const [lastName , setLastName] = useState('');
    const dispatch = useDispatch();

    const { user , updateLoading } = useSelector(state => state.auth);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setFetchLoading(true);
                const { data : { data : { doc } }}  = await Axios('/user/profile' , {
                    headers : {
                        Authorization : `Bearer ${user?.token}`
                    }
                });
                setProfile(doc);
                setImage(doc?.image ? baseURL + doc?.image : baseURL + '/users/default.png');
                setFirstName(doc?.firstName);
                setLastName(doc?.lastName);
                setFetchLoading(false);
            } catch (error) {
                setFetchLoading(false);
                toastError(error);
            }
        }
        fetchProfile();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { firstName , lastName };
        if(isBase64(image)){
            data.image = image;
        }
        dispatch(updateProfile(data));
    }

    return (
        <div>
            <Heading title='Update Profile' showIcon={false} />
            {
                fetchLoading
                ? 
                    <Loader />
                : 
                <div className='shadow-bg p-4 mt-4'>
                    <form 
                    className='flex flex-col gap-4'
                    onSubmit={handleSubmit}
                    >
                        <div className='flex items-center justify-center flex-col mb-8'>
                            <div className='w-[120px] h-[120px] rounded-full border'>
                                <input 
                                type="file" 
                                hidden 
                                ref={imgRef} 
                                onChange={handleFileChange}
                                
                                />
                                <img 
                                src={image} 
                                alt={profile?.firstName}
                                className='w-full h-full rounded-full object-cover' 
                                />
                            </div>
                            <div className='mt-4'>
                                <button
                                type='button'
                                className="btn-secondary py-1.5 px-10"
                                onClick={() => imgRef.current.click() }
                                >
                                    Upload
                                </button>
                            </div>
                        </div>
                        <div className='flex sm:flex-row flex-col items-center gap-4'>
                            <Input 
                            label='First Name'
                            placeholder='Your First Name'
                            value={firstName}
                            setValue={setFirstName}
                            readOnly
                            title='You cannot update your name'

                            />
                            <Input 
                            label='Last Name'
                            placeholder='Your Last Name'
                            value={lastName}
                            setValue={setLastName}
                            disabled
                            title='You cannot update your name'
                            />
                        </div>
                        <div className='mt-4 flex items-end justify-end'>
                            <button 
                            className="btn-primary py-2 px-12"
                            disabled={updateLoading}
                            >
                                {
                                    updateLoading
                                    ? 
                                        <ClipLoader size={20} />
                                    : 
                                        'Save'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default EditProfileForm