import Heading from 'components/global/Heading'
import Layout from 'components/global/Layout'
import EditProfileForm from 'components/profile/EditProfileForm'
import UpdatePassword from 'components/profile/UpdatePassword'
import React from 'react'

const Profile = () => {
    return (
        <Layout>
            <div>
                <EditProfileForm />
            </div>
            <div className='mt-8'>
                <UpdatePassword />
            </div>
        </Layout>
    )
}

export default Profile