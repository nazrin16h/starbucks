import { useContext, useEffect, useState } from "react";
import { DATA } from "../../../context/DataContext";
import { useLocation, useParams } from "react-router-dom";
import { SELECTCONTEXT } from "../../../context/SelectContext";
import ScrollToTop from "../../../utils/ScrollToTop";

function Customize({ handleCustomize, count, setCount, size }) {
  const { details } = useContext(DATA);
  const {id} = useParams()
  const [renderedFields, setRenderedFields] = useState([]);
  
  const {
    fields,
    setFields,
    selectedOption,
    setSelectedOption,
    sizeOptions,
    setSizeOptions,
    isCustomized,
    setIsCustomized,
    countChai,
    setCountChai,
    countSweet,
    setCountSweet,
    countInp,
    setCountInp,
    checked,
    setChecked,
    allEvents,
    setAllEvents,
    idState,
    setIdState
  } = useContext(SELECTCONTEXT);


  //bidene checkbox input var onun ucundur
  function showCheck(e) {
    setChecked(e.target.checked);
  }

  // bu ve bundan sonraki funksiya count + - ucundur, buttonlari ferglendirmek ucun
  const handleIncrement = (index) => {
    setCountInp((prev) => {
      const newCounts = [...prev];
      newCounts[index] = Math.min((newCounts[index] || 1) + 1, 12); 
      return newCounts;
    });
  };

  const handleDecrement = (index) => {
    setCountInp((prev) => {
      const newCounts = [...prev];
      newCounts[index] = Math.max((newCounts[index] || 1) - 1, 1);
      return newCounts;
    });
  };
  useEffect(() => {
    if (id) {
      setIdState(id); 
    }
  }, [id, setIdState]);
  

  // input yarananda avtomatik sizelara gore input deyerini gostersin
  useEffect(() => {
    const sizeMapping = {
      Short: { count: 1, countInp: 2 },
      Tall: { count: 2, countInp: 3 },
      Grande: { count: 3, countInp: 4 },
      Venti: { count: 4, countInp: 5 },
      Trenta: { count: 4, countInp: 5 },
    };

    const newSize = sizeMapping[size];
    if (newSize) {
      // setCount(newSize.count);

      setCountInp((prev) => {
        const newCounts = Array(5).fill(newSize.countInp); 
        return newCounts;
      });
    }
  }, [size]);

  // selectlere click edende yeni select ve ya sadece div(ve ya input da olar) yaranmasi ucun olan funksiya
  const handleOptionClick = (index, selectedProduct) => {
    const selectedName = selectedProduct.form?.name;

    setFields((prevFields) => {
      const updatedFields = { ...prevFields };

      updatedFields[index] = [
        ...(updatedFields[index]?.filter(
          (field) => field.label !== selectedName
        ) || []),
        {
          type: "select",
          label: selectedName,
          options: selectedProduct.form?.sizes || [],
          selectedOption: "",
        },
      ];

      return updatedFields;
    });

    setRenderedFields((prev) =>
      prev.filter(
        (field) => !(field.index === index && field.option === selectedName)
      )
    );
  };

  //yeni select ve div yarananda onun icine optionlarin maplenmesi
  const chooseOption = (index, fieldIndex, e) => {
    const selectedValue = e.target.value.trim(); // Dəyəri boşluqlardan təmizləyirik

    setFields((prevFields) => {
      const updatedFields = { ...prevFields };

      if (updatedFields[index]) {
        updatedFields[index] = updatedFields[index].map((field, idx) => {
          if (idx === fieldIndex) {
            // İlk sözün "No" olub-olmadığını yoxlayırıq
            const firstWord = selectedValue.split(" ")[0]; 
            return {
              ...field,
              selectedOption:
                firstWord === "No"
                  ? "" 
                  : selectedValue,
            };
          }
          return field;
        });
      }

      return updatedFields;
    });
  };

  const handleCombinedChange = (e, index, child, hasSingleOption) => {
    const { name, value } = e.target;

    // Yeni dəyəri allEvents obyektinə əlavə et
    if (hasSingleOption) {
      const singleProduct = child.products[0];
      const selectedSize =
        singleProduct.form?.sizes[e.target.selectedIndex]?.name || "";

      setSizeOptions((prev) => {
        const newSizeOptions = [...prev];
        newSizeOptions[index] = selectedSize;
        return newSizeOptions;
      });
      // console.log("Selected Size:", selectedSize);
    } else {
      const selectedProduct = child.products[e.target.selectedIndex];
      const selectedName = selectedProduct?.form?.name || "";
      handleOptionClick(index, selectedProduct);
      setSelectedOption(selectedName);
      
      setAllEvents((prev) => ({ 
        ...prev,
        [idState]: {
          ...(prev[idState] || {}), // Preserves existing data for the current idState
          [`${name}_${Date.now()}`]: {
            value, 
            options: selectedProduct.form?.sizes || [], // Available options
            number: countInp[index] || 0, // Default count
          },
        },
      }));
      
      
    }
  };

  useEffect(() => {
    // console.log("Selected Option Updated:", selectedOption);
  }, [selectedOption]);

  const handleSelectChange = (e, childName) => {
    const { name, value, options } = e.target;
    const selectedValue = e.target.value;
    const allOptions = Array.from(options)
      .map((option) => option.value)
      .filter((value) => value.trim() !== ""); // Boş opsiyonları xaric edin

    if (selectedValue.includes("No")) {
      e.target.value = "";
      setIsCustomized((prev) => ({
        ...prev,
        [childName]: false, // Customized etiketini gizlət
      }));
    } else {
      // Seçim "No" ilə bitmirsə, Customized etiketini göstər
      setIsCustomized((prev) => ({
        ...prev,
        [childName]: true,
      }));
    }
    setAllEvents((prev) => ({
      ...prev,
      [idState]: {
        ...(prev[idState] || {}), // Əvvəlki məlumatları saxla (əgər varsa)
        [name]: {
          value, // Yeni seçilmiş dəyər
          options: allOptions, // Bütün mövcud seçimlər
        },
      },
    }));
  };

  return (
    <div className="flex flex-col  ">
      <ScrollToTop/>
      <button
        onClick={() => handleCustomize(true)}
        className="flex items-center text-[20px] hover:bg-[#f0f0f0] px-4 py-2 rounded-full font-semibold my-8 lg:ml-16"
      >
        <svg
          aria-hidden="true"
          className="W-[24px] h-[24px] "
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 24 24"
          loading="lazy"
        >
          <path d="M15.098 5.78c.292-.293.292-.767 0-1.06-.293-.293-.768-.293-1.06 0L7.62 11.137c-.293.293-.293.768 0 1.06l6.52 6.52c.292.293.767.293 1.06 0 .293-.293.293-.768 0-1.06l-5.99-5.99L15.1 5.78z"></path>
        </svg>
        Done Customizing
      </button>
      <div className="Customizee flex justify-center px-3 lg:max-w-[1250px] mx-auto">
        {details?.productOptions && (
          <>
            <div className="left-sided flex flex-wrap justify-center w-full lg:mr-[40px] gap-20">
              {details.productOptions.map((item, index) => {
                return (
                  <div className="max-w-[440px] w-full" key={index}>
                    <h2 className="font-semibold text-[1.2rem] pb-[1rem] px-2 md:text-[1.7rem] border-b-[4px] border-[#d4e9e2]">
                      {item.name}
                    </h2>
                    <div className="products">
                      {item.children.map((child, idx) => {
                        const isSpecialField = [
                          "Espresso & Shot Options",
                          "Sweeteners",
                          "Cup Options",
                        ].includes(item.name);

                        const hasSingleOption =
                          child.products.length === 1 || isSpecialField;
                        const specialChildNames = [
                          "Chai Teas",
                          "Espresso Shots",
                          "Other",
                          "Liquid Sweeteners",
                        ].includes(child.name);
                        const isEmpty = child.products.length === 0;

                        if (isEmpty) return null;

                        return (
                          <div className="" key={idx}>
                            {specialChildNames ? (
                              <div className="flex w-full mt-8 shadow-[0_0_0_1px_#00000094] focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%_87%_/33%)]  px-[16px] py-[12px]  rounded-lg overflow-hidden justify-between">
                                <div>
                                  <p className="w-full md:text-[1.2rem] focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%_87%_/33%)]  outline-none">
                                    {`Add ${child.products[0].form.name}`}
                                  </p>
                                </div>
                                {child.name === "Other" ? (
                                  <div className="relative flex items-center">
                                    <label htmlFor="remember"></label>
                                    <input
                                      onChange={showCheck}
                                      className="border-0 opacity-0 overflow-hidden absolute w-[22px] h-[22px] right-0 top-0 cursor-pointer"
                                      type="checkbox"
                                      name=""
                                      id="checkbox"
                                    />
                                    <span>
                                      <svg
                                        aria-hidden="true"
                                        className={`w-[24px] h-[24px] border rounded-lg border-[#00754a] ${
                                          checked
                                            ? "bg-[#00754a] fill-white"
                                            : "fill-none"
                                        }`}
                                        focusable="false"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24"
                                        loading="lazy"
                                      >
                                        <path d="M4.29 12.104c-.277-.308-.75-.332-1.06-.054-.306.278-.33.752-.053 1.06l4.485 4.963c.29.322.795.33 1.096.017L20.414 6.003c.288-.298.28-.773-.02-1.06-.297-.288-.772-.28-1.06.02L8.237 16.47 4.29 12.105z"></path>
                                      </svg>
                                    </span>
                                  </div>
                                ) : child.name === "Espresso Shots" ? (
                                  <div className="flex items-center">
                                    <button
                                      onClick={() =>
                                        setCount(Math.max(count - 1, 1))
                                      }
                                    >
                                      {
                                        <svg
                                          aria-hidden="true"
                                          className={`${
                                            count === 1 ? "hidden" : "block"
                                          } w-[24px] h-[24px] fill-[#00754a]`}
                                          focusable="false"
                                          preserveAspectRatio="xMidYMid meet"
                                          viewBox="0 0 24 24"
                                          loading="lazy"
                                        >
                                          <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                          <path d="M7.58 12.75h9.266c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H7.58c-.414 0-.75.336-.75.75s.336.75.75.75z"></path>
                                        </svg>
                                      }
                                    </button>
                                    <span className="px-2">{count}</span>
                                    <button
                                      onClick={() =>
                                        setCount((prev) =>
                                          Math.min(prev + 1, 12)
                                        )
                                      }
                                    >
                                      <svg
                                        aria-hidden="true"
                                        className={`${
                                          count === 12 ? "hidden" : "block"
                                        } w-[24px] h-[24px] fill-[#00754a]`}
                                        focusable="false"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24"
                                        loading="lazy"
                                      >
                                        <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                        <path d="M11.214 11.25V7.366c0-.434.352-.786.786-.786.434 0 .786.352.786.786v3.884h3.86c.414 0 .75.336.75.75s-.336.75-.75.75h-3.86v3.882c0 .434-.352.786-.786.786-.434 0-.786-.352-.786-.786V12.75H7.38c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.834z"></path>
                                      </svg>
                                    </button>
                                  </div>
                                ) : child.name === "Chai Teas" ? (
                                  <div className="flex items-center">
                                    <button
                                      onClick={() =>
                                        setCountChai((prev) =>
                                          prev === 1
                                            ? null
                                            : Math.max(prev - 1, 1)
                                        )
                                      }
                                    >
                                      {
                                        <svg
                                          aria-hidden="true"
                                          className={`${
                                            countChai === null
                                              ? "hidden"
                                              : "block"
                                          } w-[24px] h-[24px] fill-[#00754a]`}
                                          focusable="false"
                                          preserveAspectRatio="xMidYMid meet"
                                          viewBox="0 0 24 24"
                                          loading="lazy"
                                        >
                                          <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                          <path d="M7.58 12.75h9.266c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H7.58c-.414 0-.75.336-.75.75s.336.75.75.75z"></path>
                                        </svg>
                                      }
                                    </button>
                                    <span
                                      className={`${
                                        countChai === null ? "hidden" : "block"
                                      } px-2`}
                                    >
                                      {countChai}
                                    </span>
                                    <button
                                      onClick={() =>
                                        setCountChai((prev) =>
                                          prev === null
                                            ? 1
                                            : Math.min(prev + 1, 12)
                                        )
                                      }
                                    >
                                      <svg
                                        aria-hidden="true"
                                        className={`${
                                          countChai === 12 ? "hidden" : "block"
                                        } w-[24px] h-[24px] fill-[#00754a]`}
                                        focusable="false"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24"
                                        loading="lazy"
                                      >
                                        <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                        <path d="M11.214 11.25V7.366c0-.434.352-.786.786-.786.434 0 .786.352.786.786v3.884h3.86c.414 0 .75.336.75.75s-.336.75-.75.75h-3.86v3.882c0 .434-.352.786-.786.786-.434 0-.786-.352-.786-.786V12.75H7.38c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.834z"></path>
                                      </svg>
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center">
                                    <button
                                      onClick={() =>
                                        setCountSweet((prev) =>
                                          prev === 1
                                            ? null
                                            : Math.max(prev - 1, 1)
                                        )
                                      }
                                    >
                                      {
                                        <svg
                                          aria-hidden="true"
                                          className={`${
                                            countSweet === null
                                              ? "hidden"
                                              : "block"
                                          } w-[24px] h-[24px] fill-[#00754a]`}
                                          focusable="false"
                                          preserveAspectRatio="xMidYMid meet"
                                          viewBox="0 0 24 24"
                                          loading="lazy"
                                        >
                                          <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                          <path d="M7.58 12.75h9.266c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H7.58c-.414 0-.75.336-.75.75s.336.75.75.75z"></path>
                                        </svg>
                                      }
                                    </button>
                                    <span
                                      className={`${
                                        countSweet === null ? "hidden" : "block"
                                      } px-2`}
                                    >
                                      {countSweet}
                                    </span>
                                    <button
                                      onClick={() =>
                                        setCountSweet((prev) =>
                                          prev === null
                                            ? 1
                                            : Math.min(prev + 1, 12)
                                        )
                                      }
                                    >
                                      <svg
                                        aria-hidden="true"
                                        className={`${
                                          countSweet === 12 ? "hidden" : "block"
                                        } w-[24px] h-[24px] fill-[#00754a]`}
                                        focusable="false"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24"
                                        loading="lazy"
                                      >
                                        <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                        <path d="M11.214 11.25V7.366c0-.434.352-.786.786-.786.434 0 .786.352.786.786v3.884h3.86c.414 0 .75.336.75.75s-.336.75-.75.75h-3.86v3.882c0 .434-.352.786-.786.786-.434 0-.786-.352-.786-.786V12.75H7.38c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.834z"></path>
                                      </svg>
                                    </button>
                                  </div>
                                )}
                              </div>
                            ) : !hasSingleOption ? (
                              // Default select dropdown
                              <div className="bg-[#f9f9f9] shadow-[inset_0_1px_4px_#0000001a] focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%_87%_/33%)] rounded-lg px-[16px] py-[12px] md:py-[8px] relative mt-8">
                                <select
                                  onChange={(e) => {
                                    handleCombinedChange(
                                      e,
                                      index,
                                      child,
                                      hasSingleOption
                                    );
                                  }}
                                  value={
                                    hasSingleOption
                                      ? sizeOptions[index] || ""
                                      : selectedOption || ""
                                  }
                                  className={`w-full appearance-none absolute inset-0 h-full outline-none opacity-0 `}
                                  name={`select-${index}`}
                                  id={`select-${index}`}
                                >
                                  {!hasSingleOption &&
                                    child.products.map((p, id) => {
                                      return p.form ? (
                                        <option value={p.form.name} key={id}>
                                          {p.form.name}
                                        </option>
                                      ) : null;
                                    })}
                                </select>
                                <span className="flex justify-between">
                                  <span className="md:text-[1.3rem] opacity-100">
                                    {hasSingleOption
                                      ? sizeOptions[index] ||
                                        child.products[0].form.name
                                      : `Add ${child.name}`}
                                  </span>
                                  <svg
                                    aria-hidden="true"
                                    className="w-[24px] h-[24px] fill-[#00754a]"
                                    focusable="false"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 24 24"
                                    loading="lazy"
                                  >
                                    <path d="M11.4135 16.2678C11.5585 16.4158 11.7545 16.4998 11.9595 16.4998C12.1645 16.4998 12.3605 16.4158 12.5055 16.2678L17.7745 10.8538C18.0756 10.5438 18.0756 10.0418 17.7745 9.73175C17.4725 9.42275 16.9835 9.42275 16.6825 9.73175L11.9595 14.5848L7.31851 9.81675C7.0165 9.50675 6.5275 9.50675 6.2265 9.81675C5.9245 10.1268 5.9245 10.6288 6.2265 10.9388L11.4135 16.2678Z"></path>
                                    <path d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12Z"></path>
                                  </svg>
                                </span>
                              </div>
                            ) : (
                              <div className="relative">
                                <div className="flex overflow-hidden justify-end min-h-[47px] border shadow-[inset_0_1px_4px_#0000001a] focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%_87%_/33%)] rounded-lg px-[16px] py-[12px] md:py-[8px] relative mt-8">
                                  
                                  <select defaultValue="Tall"
                                    onChange={(e) =>
                                      handleSelectChange(e, child.name)
                                    }
                                    className={`w-full bg-[#f9f9f9] px-4 md:text-[20px] appearance-none shadow-[inset_0_1px_4px_#0000001a] absolute inset-0 h-full outline-none min-h-[40px]`}
                                    name={`select-${child.name}`}
                                    id={`select-${child.name}`}
                                  >
                                    <option disabled  hidden value="">
                                      Add {child.name}
                                    </option>
                                    {isSpecialField
                                      ? child.products.map((p, id) => {
                                          return p.form ? (
                                            <option
                                              className="text-[16px]"
                                              value={p.form?.name}
                                              key={id}
                                            >
                                              {` ${p.form.name}`}
                                            </option>
                                          ) : null;
                                        })
                                      : child.products.map((p, id) => {
                                          const yeniArr = [
                                            {
                                              sizeCode: "light",
                                              name: p.form.name,
                                              sku: "183459",
                                            },
                                            ...p.form.sizes,
                                          ];
                                          return yeniArr.map((size, i) => {
                                            // console.log(child.id);
                                            return (
                                              <option
                                                selected={i == 0}
                                                hidden={i == 0}
                                                disabled={i == 0}
                                                className="text-[16px]"
                                                value={size.name}
                                                key={i}
                                              >
                                                {i == 0
                                                  ? `Add ${size.name}`
                                                  : ` ${size.name}`}
                                              </option>
                                            );
                                          });
                                        })}
                                  </select>
                                  <div className="flex pr-6 z-10">
                                    <svg
                                      aria-hidden="true"
                                      className="w-[24px] z-[-1] h-[24px] fill-[#00754a] overflow-hidden flex justify-end absolute "
                                      focusable="false"
                                      preserveAspectRatio="xMidYMid meet"
                                      viewBox="0 0 24 24"
                                      loading="lazy"
                                    >
                                      <path d="M11.4135 16.2678C11.5585 16.4158 11.7545 16.4998 11.9595 16.4998C12.1645 16.4998 12.3605 16.4158 12.5055 16.2678L17.7745 10.8538C18.0756 10.5438 18.0756 10.0418 17.7745 9.73175C17.4725 9.42275 16.9835 9.42275 16.6825 9.73175L11.9595 14.5848L7.31851 9.81675C7.0165 9.50675 6.5275 9.50675 6.2265 9.81675C5.9245 10.1268 5.9245 10.6288 6.2265 10.9388L11.4135 16.2678Z"></path>
                                      <path d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21.5 12C21.5 6.75329 17.2467 2.5 12 2.5C6.75329 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75329 21.5 12 21.5C17.2467 21.5 21.5 17.2467 21.5 12Z"></path>
                                    </svg>
                                  </div>
                                </div>
                                {isCustomized[child.name] && (
                                  <span className="absolute top-[-50%] transform translate-y-[50%] right-[12px] bg-white text-[14px] text-[#00754a] font-semibold px-[.4rem]">
                                    Customized
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {/* bu hisse yeni select ve div yaranmasi hissesidi */}
                      {fields[index] &&
                        fields[index].map((field, fieldIndex) => {
                          const { options = [] } = field;
                          // console.log(item.name );

                          const isSpecialField = [
                            "Espresso & Shot Options",
                            "Sweeteners",
                            "Cup Options",
                          ].includes(item.name);
                          console.log(item.name);
                          console.log(countInp);

                          if (isSpecialField) {
                            return null;
                          }

                          return (
                            <div key={fieldIndex} className="my-4">
                              {options.length > 2 && !isSpecialField ? (
                                <div className="shadow-[0_0_0_1px_#00000094]  focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%_87%_/33%)] rounded-lg px-[16px] py-[12px] md:py-[8px] relative mt-8">
                                  <select
                                    onChange={(e) =>
                                      chooseOption(index, fieldIndex, e)
                                    }
                                    className="w-full opacity-0 appearance-none absolute inset-0 h-full outline-none"
                                    name="name"
                                    id="name"
                                    value={field.selectedOption || ""}
                                  >
                                    {options.map((opt, optIdx) => (
                                      <option key={optIdx} value={opt.name}>
                                        {opt.name}
                                      </option>
                                    ))}
                                  </select>
                                  <span className="absolute top-[-50%] right-[12px] bg-white text-[14px] text-[#00754a] font-semibold  px-[.4rem] transform translate-y-[50%]">
                                    Customized
                                  </span>
                                  <span className="flex justify-between">
                                    <span className="md:text-[1.2rem]">
                                      {field.selectedOption || field.label}
                                    </span>
                                    <svg
                                      aria-hidden="true"
                                      className="w-[24px] h-[24px] fill-[#00754a]"
                                      focusable="false"
                                      preserveAspectRatio="xMidYMid meet"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23ZM11.4135 16.2678L6.2265 10.9388C5.9245 10.6288 5.9245 10.1268 6.2265 9.81675C6.5275 9.50675 7.0165 9.50675 7.31851 9.81675L11.9595 14.5848L16.6825 9.73175C16.9835 9.42275 17.4725 9.42275 17.7745 9.73175C18.0756 10.0418 18.0756 10.5438 17.7745 10.8538L12.5055 16.2678C12.3605 16.4158 12.1645 16.4998 11.9595 16.4998C11.7545 16.4998 11.5585 16.4158 11.4135 16.2678Z"></path>
                                    </svg>
                                  </span>
                                </div>
                              ) : (
                                <div className="flex relative shadow-[0_0_0_1px_#00000094] focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%_87%_/33%)]  rounded-lg justify-between">
                                  <div>
                                    <span className="absolute top-[-50%] right-[12px] bg-white text-[14px] text-[#00754a] font-semibold focus-within:bg-[hsl(160_32%_87%_/33%)]  px-[.4rem] transform translate-y-[50%]">
                                      Customized
                                    </span>
                                    <p className="w-full md:text-[1.2rem] focus-within:shadow-[0_0_0_2px_#00754a] focus-within:bg-[hsl(160_32%_87%_/33%)] outline-none px-[16px] py-[12px] md:py-[9px]">
                                      {options[0]?.name || ""}
                                    </p>
                                  </div>
                                  <div className="flex items-center px-4">
                                    <button
                                      onClick={() =>
                                        handleDecrement(fieldIndex)
                                      }
                                    >
                                      {
                                        <svg
                                          aria-hidden="true"
                                          className={`${
                                            countInp[fieldIndex] === 1
                                              ? "hidden"
                                              : "block"
                                          } w-[24px] h-[24px] fill-[#00754a] `}
                                          focusable="false"
                                          preserveAspectRatio="xMidYMid meet"
                                          viewBox="0 0 24 24"
                                          loading="lazy"
                                        >
                                          <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                          <path d="M7.58 12.75h9.266c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H7.58c-.414 0-.75.336-.75.75s.336.75.75.75z"></path>
                                        </svg>
                                      }
                                    </button>
                                    <span className="px-2">
                                      {countInp[fieldIndex]}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleIncrement(fieldIndex)
                                      }
                                    >
                                      <svg
                                        aria-hidden="true"
                                        className={`${
                                          countInp[fieldIndex] === 12
                                            ? "hidden"
                                            : "block"
                                        } w-[24px] h-[24px] fill-[#00754a] `}
                                        focusable="false"
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="0 0 24 24"
                                        loading="lazy"
                                      >
                                        <path d="M12 22.75c5.937 0 10.75-4.813 10.75-10.75S17.937 1.25 12 1.25 1.25 6.063 1.25 12 6.063 22.75 12 22.75zm0-1.5c-5.11 0-9.25-4.14-9.25-9.25S6.89 2.75 12 2.75s9.25 4.14 9.25 9.25-4.14 9.25-9.25 9.25z"></path>
                                        <path d="M11.214 11.25V7.366c0-.434.352-.786.786-.786.434 0 .786.352.786.786v3.884h3.86c.414 0 .75.336.75.75s-.336.75-.75.75h-3.86v3.882c0 .434-.352.786-.786.786-.434 0-.786-.352-.786-.786V12.75H7.38c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.834z"></path>
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="customize-button">
        <button
          onClick={() => handleCustomize(true)}
          className="bg-[#1e3932] py-[16px] px-[32px] rounded-[500px] text-center justify-center items-center text-white mt-[2rem]"
        >
          <span className="flex items-center font-bold text-[20px]">
            <svg
              aria-hidden="true"
              className="w-[24px] h-[24px] fill-[#cba258] mr-2"
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 24 24"
              loading="lazy"
            >
              <path d="M9.818 3.166a.55.55 0 0 0-.271.572l.914 5.377-4.908 2.895a.55.55 0 0 0 .174 1.013l5.587 1.112.913 5.377a.55.55 0 0 0 1.02.183l2.806-4.867 5.59.524a.55.55 0 0 0 .449-.928l-3.856-4.049 2.301-5.094a.55.55 0 0 0-.73-.726l-5.102 2.34-4.258-3.666a.55.55 0 0 0-.629-.063zm1.069 1.893 3.367 2.9a.55.55 0 0 0 .588.082l4.088-1.875-1.848 4.094a.55.55 0 0 0 .102.607l3.097 3.252-4.476-.42a.55.55 0 0 0-.53.274l-2.218 3.847-.723-4.244a.55.55 0 0 0-.434-.447l-4.545-.904 3.99-2.354a.55.55 0 0 0 .264-.566ZM17.375.848a.25.25 0 0 0-.25.148c-.247.566-.334.828-.395.893a.25.25 0 0 0-.005.006c-.03.034-.072.062-.186.113-.114.05-.288.117-.521.23a.25.25 0 0 0-.036.428c.21.151.368.247.471.316.103.07.139.102.162.141a.25.25 0 0 0 .004.008c.047.073.087.345.23.943a.25.25 0 0 0 .473.043c.248-.565.335-.827.395-.892a.25.25 0 0 0 .004-.006c.03-.035.073-.063.187-.114.114-.05.286-.118.52-.232a.25.25 0 0 0 .037-.428c-.21-.15-.368-.245-.47-.314-.104-.07-.142-.104-.165-.143a.25.25 0 0 0-.004-.006c-.047-.073-.087-.346-.23-.945a.25.25 0 0 0-.221-.19Zm-.086.972c.03.122.052.328.117.43.08.13.19.215.309.295.023.016.062.044.088.06a8.775 8.775 0 0 0-.098.043.988.988 0 0 0-.357.239c-.082.09-.138.29-.19.406-.03-.123-.051-.33-.117-.432a.974.974 0 0 0-.31-.295l-.088-.058.1-.045a.971.971 0 0 0 .357-.238c.081-.09.137-.29.19-.405zm.805 16.998a.25.25 0 0 0-.235.143c-.373.782-.477 1.131-.615 1.26a.25.25 0 0 0-.006.004c-.134.132-.479.212-1.265.54a.25.25 0 0 0-.016.456c.763.384 1.099.488 1.225.63a.25.25 0 0 0 .005.006c.13.139.21.494.53 1.301a.25.25 0 0 0 .457.016c.373-.782.477-1.132.615-1.26a.25.25 0 0 0 .006-.006c.134-.133.477-.213 1.264-.54a.25.25 0 0 0 .017-.454c-.762-.384-1.099-.488-1.224-.63a.25.25 0 0 0-.006-.007c-.13-.138-.21-.493-.53-1.3a.25.25 0 0 0-.222-.159Zm-.03.836c.121.358.227.76.415.961.186.21.573.348.925.502-.361.129-.757.237-.957.434-.2.187-.334.58-.478.928-.121-.36-.227-.762-.416-.963-.186-.209-.572-.345-.922-.498.36-.129.755-.24.955-.436.2-.187.334-.58.478-.928zM22.5 8.75a.754.754 0 0 0-.75.75c0 .411.339.75.75.75s.75-.339.75-.75a.754.754 0 0 0-.75-.75zm0 .5c.141 0 .25.109.25.25 0 .141-.109.25-.25.25a.246.246 0 0 1-.25-.25c0-.141.109-.25.25-.25zm-19 6.5a.75.75 0 0 1-.75.75.75.75 0 0 1-.75-.75.75.75 0 0 1 .75-.75.75.75 0 0 1 .75.75Zm1.5-10c-.687 0-1.25.563-1.25 1.25S4.313 8.25 5 8.25 6.25 7.687 6.25 7 5.687 5.75 5 5.75Zm0 .5c.417 0 .75.333.75.75s-.333.75-.75.75A.746.746 0 0 1 4.25 7c0-.417.333-.75.75-.75Zm5.746 7.771-8.41 8.41a.55.55 0 0 0 .777.78l8.328-8.328-.127-.748z"></path>
            </svg>
            Done Customizing
          </span>
        </button>
      </div>
      
    </div>
  );
}

export default Customize;
