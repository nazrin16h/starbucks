import { createContext, useEffect, useState } from "react";

export const SELECTCONTEXT = createContext(null);

function SelectContext({ children }) {
    const [idState, setIdState] = useState(0);
    const [fields, setFields] = useState({});
    const [selectedOption, setSelectedOption] = useState("");
    const [sizeOptions, setSizeOptions] = useState([]);
    const [isCustomized, setIsCustomized] = useState({});
    const [countChai, setCountChai] = useState(null);
    const [countSweet, setCountSweet] = useState(null);
    const [countInp, setCountInp] = useState([]);
    const [checked, setChecked] = useState(false);
    const [allEvents, setAllEvents] = useState({});

    const initialState = {
        allEvents: {},
        fields: {},
        selectedOption: "",
        sizeOptions: [],
        isCustomized: {},
        countChai: null,
        countSweet: null,
        countInp: [],
        checked: false,
    };

    useEffect(() => {
        const allData = JSON.parse(localStorage.getItem("allEvents")) || {};
        if (allData[idState]) {
            const currentData = allData[idState];
            setFields(currentData.fields || {});
            setSelectedOption(currentData.selectedOption || "");
            setSizeOptions(currentData.sizeOptions || []);
            setIsCustomized(currentData.isCustomized || {});
            setCountChai(currentData.countChai || null);
            setCountSweet(currentData.countSweet || null);
            setCountInp(currentData.countInp || []);
            setChecked(currentData.checked || false);
        } else {
            reset();
        }
    }, [idState]);

    useEffect(() => {
        const allData = JSON.parse(localStorage.getItem("allEvents")) || {};
        allData[idState] = {
            fields,
            selectedOption,
            sizeOptions,
            isCustomized,
            countChai,
            countSweet,
            countInp,
            checked,
        };
        localStorage.setItem("allEvents", JSON.stringify(allData));
    }, [
        idState,
        fields,
        selectedOption,
        sizeOptions,
        isCustomized,
        countChai,
        countSweet,
        countInp,
        checked,
    ]);

    const reset = () => {
        setFields(initialState.fields);
        setSelectedOption(initialState.selectedOption);
        setSizeOptions(initialState.sizeOptions);
        setIsCustomized(initialState.isCustomized);
        setCountChai(initialState.countChai);
        setCountSweet(initialState.countSweet);
        setCountInp(initialState.countInp);
        setChecked(initialState.checked);
        setAllEvents(initialState.allEvents);
    };

    const loadProductOptions = (id) => {
        console.log("Loading product options for id:", id);
        setFields({
            "Milk": ["Skim", "Soy", "Almond"],
            "Syrup": ["Vanilla", "Caramel", "Hazelnut"]
        });
        setSizeOptions(["Small", "Medium", "Large"]);
        setIsCustomized({});
        setCountChai(null);
        setCountSweet(null);
        setCountInp([]);
        setChecked(false);
    };

    return (
        <SELECTCONTEXT.Provider
            value={{
                allEvents,
                setAllEvents,
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
                idState,
                setIdState,
                reset,
                loadProductOptions
            }}
        >
            {children}
        </SELECTCONTEXT.Provider>
    );
}

export default SelectContext;
