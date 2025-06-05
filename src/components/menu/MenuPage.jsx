import { useEffect, useState } from 'react'
import { getMenu } from '../../services/api'
import MenuNavBar from './MenuNavBar';
import LocationSelect from './LocationSelect';

function MenuPage() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getMenu().then(res => {
            setData(res);
        });
    }, []);

    return (
        <div className='min-h-screen ' >
            <MenuNavBar />
            <div className='lg:flex lg:flex-row  gap-28  container lg:w-[1200px] lg:px-12 pl-3 h-full mx-auto '>

                <div className='hidden lg:block' >
                    {
                        data.map((item, i) => (
                            <div key={i}>
                                <h2 className='font-medium mt-8  my-3 text-[20px]'>{item.name}</h2>
                                {item.children.map((sub) => (
                                    <div key={sub.name}>
                                        <h3 className='text-gray-500 py-2 font-medium lg:w-[150px]'>{sub.name}</h3> {/* Hot Coffees */}
                                    </div>
                                ))}
                            </div>
                        ))
                    }
                </div>
                <div>
                    <h1 className='mt-8 font-bold lg:text-[30px] text-[20px]'>Menu</h1>
                    {data.map((item, i) => (
                        <div key={i} >
                            <h2 className='mt-8 font-bold lg:text-[24px] text-[20px]'>{item.name}</h2>
                            <hr className='lg:w-[750px] text-gray-300 mt-4' />
                            <div className='flex flex-row flex-wrap lg:w-[900px]  lg:gap-x-[50px]'>

                                <div className='flex flex-col lg:flex-row flex-wrap lg:w-[900px]  lg:gap-x-[50px]'>
                                    {item.children?.map((last, index) => (
                                        <div key={last.id || index} className='flex mt-6 items-center gap-4 mb-6'>
                                            <div className='w-29 h-29 overflow-hidden rounded-full'>

                                                <img
                                                    src={
                                                        last.categoryImageURL
                                                    }
                                                    className='w-full h-full object-cover scale-220'
                                                    alt={last.name}
                                                />
                                            </div>
                                            <span className='font-medium text-lg lg:w-[200px] w-[200px]'>{last.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* <MenuProducts/> */}
                </div>
            </div>
            <LocationSelect />
        </div>
    )
}

export default MenuPage