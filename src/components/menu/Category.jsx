import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMenu } from "../../services/api";

function Category() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getMenu().then(res => {
            setData(res);
        });
    }, []);

    return (
        <div className='hidden lg:block'>
            {data.map((item, i) => (
                <div key={i}>
                    <h2 className='font-medium mt-8 my-3 text-[20px]'>{item.name}</h2>
                    {item.children.map((sub) => (
                        <div
                            key={sub.name}
                            className='cursor-pointer text-gray-500 py-2 font-medium lg:w-[150px] hover:text-green-600'
                        >
                            {sub.name}
                        </div>
                    ))}
                </div>
            ))}
        </div>)
}

export default Category