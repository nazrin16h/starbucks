import { useEffect, useState } from 'react';
import { GiCoffeeCup } from "react-icons/gi";

export default function Loading({ duration = 1000 }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!show) return null;

    return (
        <div className="my-10 bg-white bg-opacity-90 flex h-full items-center justify-center z-50 pointer-events-none">
            <GiCoffeeCup size={45} />
        </div>
    );
}
