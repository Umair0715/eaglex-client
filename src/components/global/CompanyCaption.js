import Bg from 'assets/images/homeBg.jpg';

const CompanyCaption = () => {
    return (
        <div className='rounded-lg w-full h-[200px] relative'
            style={{
                backgroundImage : `url(${Bg})` , 
                backgroundSize : 'cover' ,
                backgroundPosition : 'center center'
            }}
        >
            <div className="overlay-gradient absolute top-0 left-0 w-full h-full rounded-lg bg-black bg-opacity-50"></div>
            <div className='flex items-center justify-center text-white text-4xl font-semibold relative z-10 h-full '>
            <h1>Eagle<span>X</span> , Pakistan's Leading Platform</h1>
            </div>
        </div>
    )
}

export default CompanyCaption