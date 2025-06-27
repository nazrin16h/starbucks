// pages/CustomizePage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDetails } from "../../../services/api";
import OptionSection from "./OptionSection";

export default function CustomizePage() {
  const [data, setData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleSelect = (name, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDone = () => {
    localStorage.setItem("customDrink", JSON.stringify(selectedOptions));
    navigate(-1);
  };

  if (loading) return <p className="p-6">Yüklənir...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  const productOptions = data?.productOptions || [];
  const leftSections = productOptions.slice(0, Math.ceil(productOptions.length / 2));
  const rightSections = productOptions.slice(Math.ceil(productOptions.length / 2));


  return (
    <div className="min-h-screen bg-white text-black px-6 md:px-20 py-10">
      

      {/* Row görünüş */}
      <div className="flex flex-wrap gap-2 justify-evenly">
        {/* Sol sütun (Flavors və s.) */}
        <div className="w-full md:w-[35%]">
          {leftSections.map((section, idx) => (
            <OptionSection
              key={idx}
              section={section}
              selectedOptions={selectedOptions}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Sağ sütun (Cold Foams və s.) */}
        <div className="w-full md:w-[35%]">
          {rightSections.map((section, idx) => (
            <OptionSection
              key={idx}
              section={section}
              selectedOptions={selectedOptions}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>

      {/* Done düyməsi */}
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
