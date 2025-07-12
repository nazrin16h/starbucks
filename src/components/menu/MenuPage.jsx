import { useEffect, useState } from 'react';
import { getMenu } from '../../services/api';
import MenuNavBar from './MenuNavBar';
import { Link, useLocation, useParams } from 'react-router-dom';
import StoreSelect from './StoreSelect';
import { Helmet } from 'react-helmet';
import Loading from '../../utils/Loading';

function MenuPage() {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { name, subname } = useParams();
    const location = useLocation();
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        setLoading(true);  // fetch başlamazdan əvvəl loading-i aç
        getMenu()
            .then(res => {
                setData(res);
                setLoading(false); // data gəldikdən sonra loading-i bağla
            })
            .catch(() => {
                setLoading(false); // xəta olsa da loading bağlanmalı
            });
    }, []);

    useEffect(() => {
        if (data.length > 0 && name && subname) {
            const category = data.find(item => item.name.toLowerCase() === name.toLowerCase());
            if (!category) return setSelectedCategory(null);

            const subCategory = category.children.find(
                child => child.name.toLowerCase() === subname.toLowerCase()
            );

            if (subCategory) return setSelectedCategory(subCategory);

            for (let child of category.children) {
                const deeper = child.children?.find(
                    deep => deep.name.toLowerCase() === subname.toLowerCase()
                );
                if (deeper) return setSelectedCategory(deeper);
            }

            setSelectedCategory(null);
        } else {
            setSelectedCategory(null);
        }
    }, [name, subname, data]);
    if (loading) {
        return <Loading />; 
    }

    return (
        <div className='min-h-screen'>
            <Helmet>
                <title>
                    {selectedCategory
                        ? `${selectedCategory.name} - Starbucks Menu`
                        : 'Menu - Starbucks'}
                </title>
                <meta
                    name="description"
                    content={
                        selectedCategory
                            ? `Explore ${selectedCategory.name} drinks and products at Starbucks.`
                            : 'Explore the full Starbucks menu and discover your favorites.'
                    }
                />
                <meta
                    property="og:title"
                    content={
                        selectedCategory
                            ? `${selectedCategory.name} - Starbucks`
                            : 'Starbucks Menu'
                    }
                />
                <meta
                    property="og:image"
                    content={selectedCategory?.categoryImageURL || '/default-og.jpg'}
                />
            </Helmet>

            <MenuNavBar />

            <div className='flex flex-col lg:flex-row gap-12 lg:gap-28 container max-w-[1200px] px-4 md:px-8 lg:px-12 mx-auto'>
                {/* Sol menyu */}
                <div className='hidden lg:block min-w-[200px] ml-4 lg:ml-0'>
                    {data.map((item, i) => (
                        <div key={i}>
                            <h2 className='font-medium mt-8 mb-3 text-[20px]'>{item.name}</h2>
                            {item.children.map((d, index) => {
                                const path = `/menu/${item.name.toLowerCase()}/${d.name.toLowerCase()}`;
                                const isActive = location.pathname === path;

                                return (
                                    <Link to={path} key={index}>
                                        <h3
                                            className={`cursor-pointer py-2 font-medium lg:w-[150px] ${selectedCategory && selectedCategory.name.toLowerCase() === d.name.toLowerCase()
                                                ? 'text-green-600 font-semibold'
                                                : 'text-gray-500 hover:text-green-600'
                                                }`}
                                        >
                                            {d.name}
                                        </h3>
                                    </Link>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Sağ hissə */}
                <div className='flex-1'>
                    <h1 className='mt-8 font-bold text-[24px] md:text-[28px] lg:text-[30px]'>Menu</h1>

                    {selectedCategory ? (
                        <div>
                            <h2 className='mt-8 font-bold text-[20px] md:text-[22px] lg:text-[24px]'>{selectedCategory.name}</h2>
                            <hr className='max-w-[750px] text-gray-300 mt-4' />

                            {selectedCategory.children?.length > 0 ? (
                                selectedCategory.children.map(child => (
                                    <div key={child.name} className='mt-10'>
                                        <h3 className='text-[22px] md:text-[24px] font-bold mb-4'>{child.name}</h3>
                                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-10'>
                                            {(child.products || []).map((product, i) => (
                                                <div key={i} className='text-center w-[120px] md:w-[140px] lg:w-[160px] mx-auto'>
                                                    <Link
                                                        to={`/menu/product/${child.name.toLowerCase()}/${product.productNumber}`}
                                                        state={{
                                                            product: {
                                                                name: product.name,
                                                                imageURL: product.imageURL,
                                                                size: product.sizes?.[0]?.sizeCode || 'Grande',
                                                                sizes: product.sizes,
                                                                uri: product.uri,
                                                                price: product.sizes?.[0]?.price || 0,
                                                            },
                                                        }}
                                                        className="block"
                                                    >
                                                        <div className='w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-full mx-auto'>
                                                            <img
                                                                src={product.imageURL}
                                                                alt={product.name}
                                                                className='w-full h-full object-cover scale-220 cursor-pointer'
                                                            />
                                                        </div>
                                                        <p className='mt-2 text-[14px] md:text-[16px] font-medium truncate'>{product.name}</p>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : selectedCategory.products?.length > 0 ? (
                                <div className='flex flex-wrap gap-5 mt-10'>
                                    {selectedCategory.products.map((product, i) => (
                                        <div key={i} className='text-center w-[120px] md:w-[140px] lg:w-[160px]'>
                                            <div className='w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-full mx-auto'>
                                                <img
                                                    src={product.imageURL}
                                                    alt={product.name}
                                                    className='w-full h-full object-cover scale-220'
                                                />
                                            </div>
                                            <p className='mt-2 text-[14px] md:text-[16px] font-medium truncate'>{product.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-gray-500 mt-4'>Bu kateqoriyada məhsul yoxdur.</p>
                            )}
                        </div>
                    ) : (
                        data.map((item, i) => (
                            <div key={i}>
                                <h2 className='mt-8 font-bold text-[20px] md:text-[22px] lg:text-[24px]'>{item.name}</h2>
                                <hr className='max-w-[750px] text-gray-300 mt-4' />
                                <div className='flex flex-wrap gap-5 lg:gap-x-[50px] mt-6'>
                                    {item.children.map((child, index) => (
                                        <Link
                                            key={index}
                                            to={`/menu/${item.name.toLowerCase()}/${child.name.toLowerCase()}`}
                                            className='flex items-center gap-4 w-full md:w-[48%] lg:w-auto'
                                        >
                                            <div className='w-24 h-24 md:w-28 md:h-28 overflow-hidden rounded-full'>
                                                <img
                                                    src={child.categoryImageURL}
                                                    alt={child.name}
                                                    className='w-full h-full object-cover scale-220'
                                                />
                                            </div>
                                            <span className='font-medium text-[16px] md:text-[18px] lg:text-[20px] w-[160px] md:w-[180px] lg:w-[200px]'>{child.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <StoreSelect />
        </div>
    );
}

export default MenuPage;
