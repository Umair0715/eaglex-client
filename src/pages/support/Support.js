import Layout from 'components/global/Layout';
import Heading from 'components/global/Heading';


const Support = () => {
 

    return (
        <Layout>
            <Heading 
            title={'Need help? Message us'} icon='envelope' 
            />
            <div className='w-full shadow-bg  mt-6'>
                
                <div 
                className='flex items-center justify-center h-[200px]'>
                   <a
                    href="https://wa.me/+923341769106"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="btn-primary py-2 px-12"
                    >
                        Start Chat
                    </a>
                </div>
            </div>
        </Layout>
    )
}

export default Support