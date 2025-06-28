import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDetails } from "../../../services/api";
import OptionSection from "./OptionSection";

export default function Customize({ onDone }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCounts, setSelectedCounts] = useState(() => {
    const saved = localStorage.getItem("customDrink");
    return saved ? JSON.parse(saved) : {};
  });
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAllDetails()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xəta:", err);
        setError("Məlumat alınarkən xəta baş verdi.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("customDrink", JSON.stringify(selectedCounts));
  }, [selectedCounts]);

  const handleSelect = (name, action) => {
    setSelectedCounts((prev) => {
      const count = prev[name] || 0;
      const newCounts = { ...prev };
      if (action === "increase") {
        newCounts[name] = count + 1;
      } else if (action === "decrease") {
        if (count <= 1) {
          delete newCounts[name];
        } else {
          newCounts[name] = count - 1;
        }
      }
      return newCounts;
    });
  };

  const handleDone = () => {
    if (onDone) {
      onDone();
    } else {
      navigate(-1);
    }
  };

  if (loading) return <p className="p-6">Yüklənir...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  const productOptions = data?.productOptions || [];
  const leftSections = productOptions.slice(0, Math.ceil(productOptions.length / 2));
  const rightSections = productOptions.slice(Math.ceil(productOptions.length / 2));

  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-20 py-10">
      <div className="flex flex-wrap flex-row gap-2 justify-around">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[80%]">
          {leftSections.map((section, idx) => (
            <OptionSection
              key={idx}
              section={section}
              selectedCounts={selectedCounts}
              onSelect={handleSelect}
              open={open}
              setOpen={setOpen}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[80%]">
          {rightSections.map((section, idx) => (
            <OptionSection
              key={idx}
              section={section}
              selectedCounts={selectedCounts}
              onSelect={handleSelect}
              open={open}
              setOpen={setOpen}
            />
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={handleDone}
          className="bg-[#00754A] hover:bg-[#00563B] text-white px-6 py-3 rounded-full font-semibold text-lg"
        >
          🌟 Done Customizing
        </button>
      </div>
    </div>
  );
}
