export default function OptionSection({
    section,
    options,
    count,
    onIncrement,
    onDecrement,
    checked,
    onToggle,
    onSelect
}) {
    return (
        <div className="mb-6 p-4 border rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-3">{section}</h2>
            <div className="flex items-center gap-3 mb-3">
                <button onClick={onDecrement} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                <span>{count}</span>
                <button onClick={onIncrement} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
            </div>
            <label className="flex items-center gap-2">
                <input type="checkbox" checked={checked} onChange={onToggle} />
                <span>Enable option</span>
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
                {options.map((opt, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect(opt)}
                        className="px-3 py-1 border rounded hover:bg-green-100"
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
