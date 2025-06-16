import { useLocation, useParams } from 'react-router-dom';

const CategoryContent = () => {
    const location = useLocation();
    const { category: selectedCategory } = location.state || {};

    if (!selectedCategory) {
        return <div>Kateqoriya seçilməyib.</div>;
    } 
    const { category, subcategory } = useParams();

    return (
        <div>
            <h2 className='mt-8 font-bold lg:text-[24px] text-[20px]'>{selectedCategory.name}</h2>
            {selectedCategory.children?.map((child, index) => (
                <div key={child.id || index}>
                    <h3 className='font-bold text-[25px] mt-10'>{child.name}</h3>
                    <hr className='lg:w-[750px] text-gray-300 mt-4' />
                    <div className='flex flex-wrap gap-5'>
                        {child.products?.map((product, i) => (
                            <div key={product.productNumber || i} className='mt-10'>
                                <div className='w-29 h-29 overflow-hidden rounded-full'>
                                    <img
                                        src={product.imageURL}
                                        alt={product.name}
                                        className='w-full h-full object-cover scale-220'
                                    />
                                </div>
                                <p className='mt-2 text-center font-medium w-[150px] mx-auto text-[20px]'>
                                    {product.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CategoryContent;
