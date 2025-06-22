import { useEffect, useState } from 'react';
import { getMenu } from '../../services/api';
import MenuNavBar from './MenuNavBar';
import { Link, useParams } from 'react-router-dom';
import StoreSelect from './StoreSelect';
import { Helmet } from 'react-helmet';
import { useBasket } from '../../context/BasketContext'; // Əlavə et səhifənin yuxarısında


function MenuPage() {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { name, subname } = useParams();
    

    useEffect(() => {
        getMenu().then(res => setData(res));
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

    return (
        <div className='min-h-screen'>
            {/* Helmet: SEO və brauzer title üçün */}
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
                    content={
                        selectedCategory?.categoryImageURL || '/default-og.jpg'
                    }
                />
            </Helmet>

            <MenuNavBar />
            <div className='lg:flex lg:flex-row gap-28 container lg:w-[1200px] lg:px-12 pl-3 h-full mx-auto'>

                {/* Sol menyu */}
                <div className='hidden lg:block'>
                    {data.map((item, i) => (
                        <div key={i}>
                            <h2 className='font-medium mt-8 my-3 text-[20px]'>{item.name}</h2>
                            {item.children.map((d, ind) => (
                                <Link
                                    to={`/menu/${item.name.toLowerCase()}/${d.name.toLowerCase()}`}
                                    key={ind}
                                >
                                    <h3 className='cursor-pointer text-gray-500 py-2 font-medium lg:w-[150px] hover:text-green-600'>
                                        {d.name}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Sağ hissə */}
                <div>
                    <h1 className='mt-8 font-bold lg:text-[30px] text-[20px]'>Menu</h1>

                    {selectedCategory ? (
                        <div>
                            <h2 className='mt-8 font-bold lg:text-[24px] text-[20px]'>{selectedCategory.name}</h2>
                            <hr className='lg:w-[750px] text-gray-300 mt-4' />

                            {selectedCategory.children?.length > 0 ? (
                                selectedCategory.children.map(child => (
                                    <div key={child.name} className='mt-10'>
                                        <h3 className='text-[25px] font-bold mb-4'>{child.name}</h3>
                                        <div className='flex flex-wrap gap-5 mt-10'>
                                            {(child.products || []).map((product, i) => (
                                                <div key={i} className='mx-1 mb-5'>
                                                    <Link
                                                        to={`/menu/product/${child.name.toLowerCase()}/${product.productNumber}`}
                                                        state={{
                                                            product: {
                                                                name: product.name,
                                                                imageURL: product.imageURL,
                                                                size: product.sizes?.[0]?.sizeCode || "Grande",
                                                                sizes: product.sizes,
                                                                uri: product.uri,
                                                                price: product.sizes?.[0]?.price || 0,
                                                            },
                                                        }}

                                                        className="block"
                                                    >

                                                        <div className='w-30 h-30 overflow-hidden rounded-full'>
                                                            <img
                                                                src={product.imageURL}
                                                                alt={product.name}
                                                                className='w-full h-full object-cover scale-200'
                                                            />
                                                        </div>
                                                        <div className='w-[180px]'>
                                                            <p className='mt-2 font-medium text-[20px] w-[200px]'>{product.name}</p>
                                                        </div>
                                                    </Link>

                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : selectedCategory.products?.length > 0 ? (
                                <div className='flex flex-wrap gap-5'>
                                    {selectedCategory.products.map((product, i) => (
                                        <div key={i} className='mt-10'>
                                            <div className='w-28 h-28 overflow-hidden rounded-full'>
                                                <img
                                                    src={product.imageURL}
                                                    alt={product.name}
                                                    className='w-full h-full object-cover scale-110'
                                                />
                                            </div>
                                            <div className='w-[180px]'>
                                                <p className='mt-2 text-center font-medium text-[20px]'>{product.name}</p>
                                            </div>
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
                                <h2 className='mt-8 font-bold lg:text-[24px] text-[20px]'>{item.name}</h2>
                                <hr className='lg:w-[750px] text-gray-300 mt-4' />
                                <div className='flex flex-col lg:flex-row flex-wrap lg:w-[900px] lg:gap-x-[50px]'>
                                    {item.children.map((child, index) => (
                                        <Link
                                            key={index}
                                            to={`/menu/${item.name.toLowerCase()}/${child.name.toLowerCase()}`}
                                            className='flex mt-6 items-center gap-4 mb-6'
                                        >
                                            <div className='w-24 h-24 overflow-hidden rounded-full'>
                                                <img
                                                    src={child.categoryImageURL}
                                                    className='w-full h-full object-cover scale-190'
                                                    alt={child.name}
                                                />
                                            </div>
                                            <span className='font-medium text-lg w-[200px]'>{child.name}</span>
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
