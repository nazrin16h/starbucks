const MenuFeaturePage = ({ image, title, text, buttonText, reverse, bgColor, textColor, hoverBg }) => {
    return (
        <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center ${bgColor} ${textColor}`}>
            <div className="w-full md:w-1/2">
                <img src={image} alt={title} className="w-full object-cover max-w-[100%]" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center p-6 text-center justify-center">
                <h2 className="text-3xl md:text-4xl font-medium w-full max-w-[90%] md:max-w-[500px] lg:max-w-[600px] mb-5 break-words">
                    {title}
                </h2>
                <p className="mb-4 w-full max-w-[90%] md:max-w-[400px] lg:max-w-[450px] text-base md:text-lg lg:text-2xl font-medium break-words">
                    {text}
                </p>
                {buttonText && (
                    <button className={`bg-transparent ${textColor} px-4 py-1 rounded-full font-semibold border-2 mt-4 ${hoverBg} transition duration-300`}>
                        {buttonText}
                    </button>
                )}
            </div>
        </div>

    );
};

export default MenuFeaturePage;
