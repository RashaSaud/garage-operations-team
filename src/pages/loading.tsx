const Loader = () => {

    return (
        <div className='flex justify-center items-center content-center h-screen w-screen  '>
            <div className={`h-2.5 w-2.5    rounded-full mr-1 animate-bounce px-1 bg-[#29bfa7] `}></div>
            <div
                className={`h-2.5 w-2.5    rounded-full mr-1 animate-bounce200 bg-[#e69779]`}
            ></div>
            <div className={`h-2.5 w-2.5    rounded-full animate-bounce400 bg-yellow-400 `}></div>
        </div>
    );
};

export default Loader;