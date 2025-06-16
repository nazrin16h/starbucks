import { useEffect, useState } from 'react'
import { getMenu } from '../../services/api'
import MenuNavBar from './MenuNavBar';
import LocationSelect from './LocationSelect';
import { useParams, useNavigate } from 'react-router-dom';

function MenuPage() {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        getMenu().then(res => {
            setData(res);
        });
    }, []);

    return (
        <div className='min-h-screen'>
            <MenuNavBar />
            <div className='lg:flex lg:flex-row gap-28 container lg:w-[1200px] lg:px-12 pl-3 h-full mx-auto'>
                {/* Sol sidebar */}
                <div className='hidden lg:block'>
                    {
                        data.map((item, i) => (
                            <div key={i}>
                                <h2 className='font-medium mt-8 my-3 text-[20px]'>{item.name}</h2>
                                {item.children.map((sub) => (
                                    <div
                                        key={sub.name}
                                        onClick={() => handleCategoryClick(sub)}
                                        className='cursor-pointer text-gray-500 py-2 font-medium lg:w-[150px] hover:text-green-600'
                                    >
                                        {sub.name}
                                    </div>
                                ))}
                            </div>
                        ))
                    }
                </div>

                {/* Sağ hissə */}
                <div>
                    <h1 className='mt-8 font-bold lg:text-[30px] text-[20px]'>Menu</h1>

                    {selectedCategory ? (
                        <div>
                            <h2 className='mt-8 font-bold lg:text-[24px] text-[20px]'>{selectedCategory.name}</h2>
                            {selectedCategory.children?.map((child, index) => (
                                <div key={index}>
                                    <h3 className='font-bold text-[25px] mt-10'>{child.name}</h3>
                                    <hr className='lg:w-[750px] text-gray-300 mt-4' />
                                    <div className='flex flex-wrap gap-5'>
                                        {child.products?.map((product, i) => (
                                            <div key={i} className='mt-10'>
                                                <div className='w-29 h-29 overflow-hidden rounded-full'>
                                                    <img
                                                        src={product.imageURL}
                                                        alt={product.name}
                                                        className='w-full h-full object-cover scale-220'
                                                    />
                                                </div>
                                                <div className='w-[180px]'>
                                                    <p className='mt-2 text-center font-medium text-[20px] mx-auto'>{product.name}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Default göstərilən hissə
                        data.map((item, i) => (
                            <div key={i}>
                                <h2 className='mt-8 font-bold lg:text-[24px] text-[20px]'>{item.name}</h2>
                                <hr className='lg:w-[750px] text-gray-300 mt-4' />
                                <div className='flex flex-col lg:flex-row flex-wrap lg:w-[900px] lg:gap-x-[50px]'>
                                    {item.children?.map((last, index) => (
                                        <div key={index} className='flex mt-6 items-center gap-4 mb-6'>
                                            <div className='w-29 h-29 overflow-hidden rounded-full'>
                                                <img
                                                    src={last.categoryImageURL}
                                                    className='w-full h-full object-cover'
                                                    alt={last.name}
                                                />
                                            </div>
                                            <span className='font-medium text-lg lg:w-[200px] w-[200px]'>{last.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <LocationSelect />
        </div>
    );
}

export default MenuPage;
