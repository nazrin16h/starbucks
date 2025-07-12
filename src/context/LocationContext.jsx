import { createContext, useState } from "react";

export const LOCATION = createContext();

const locations = [
    {
        id: 1,
        name: "Globus Center",
        address: "609 Jafar Jabbarli Street, Baku",
        distance: "0.7 miles away",
        iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.0645091895726!2d49.825669875481466!3d40.385262857554714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d9beac62069%3A0x1f8d693f61e3667b!2sGlobus%20Center!5e0!3m2!1sen!2saz!4v1733806511378!5m2!1sen!2saz",
    },
    {
        id: 2,
        name: "Mall 28",
        address: "28 May Street, Baku",
        distance: "1.2 miles away",
        iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.3440591001868!2d49.844190475481035!3d40.37906655793157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307da7a06b402f%3A0xd8897cf79ec36111!2zMjggQWzEscWfdmVyacWfIE1lcmtlemk!5e0!3m2!1sen!2saz!4v1733806364925!5m2!1sen!2saz",
    },
    {
        id: 3,
        name: "Crescent Mall",
        address: "9VF6 Q89 Baku, Azerbaijan",
        distance: "0.7 miles away",
        iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.5692098186355!2d49.85778417548082!3d40.374075458235176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dc375775d57%3A0x39d9cc337e72979b!2sCrescent%20Mall!5e0!3m2!1sen!2saz!4v1733812798369!5m2!1sen!2saz",
    },
    {
        id: 4,
        name: "Targovy Street",
        address: "8 Mammad Amin Rasulzade, Baku",
        distance: "1.3 miles away",
        iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.7340467850872!2d49.83602187548056!3d40.37042105845738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d98eeedb429%3A0x5b224cba934ed726!2sTarqovu!5e0!3m2!1sen!2saz!4v1733812993187!5m2!1sen!2saz",
    },
    {
        id: 5,
        name: "Daniz Mall",
        address: "28 May Street, Baku",
        distance: "1.2 miles away",
        iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.2797362135193!2d49.832054083022655!3d40.35832128559161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dffd00e6133%3A0x137483827cf83c8c!2sD%C9%99niz%20Mall!5e0!3m2!1sen!2saz!4v1733813045668!5m2!1sen!2saz",
    },
    {
        id: 6,
        name: "Ganjlik Mall",
        address: "Fatali Khoyski Avenue, Narimanov",
        distance: "1.2 miles away",
        iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.393400163482!2d49.85036967548213!3d40.40013495665007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d5d5a2c1005%3A0x5ede1cc1418ccc54!2sGenclik%20Mall!5e0!3m2!1sen!2saz!4v1733812888716!5m2!1sen!2saz",
    },
    {
        id: 7,
        name: "Port Baku",
        address: "153 Neftciler Avenue, Baku",
        distance: "0.5 miles away",
        iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.5206188041434!2d49.85772357548085!3d40.37515265816975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d71b8e4c5b9%3A0xfe50781c5645b252!2sPort%20Baku%20Mall!5e0!3m2!1sen!2saz!4v1733813083024!5m2!1sen!2saz",
    },
    {
        id: 8,
        name: "Nizami Street",
        address: "Nizami St, Baku",
        distance: "1.1 miles away",
        iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.5937260224036!2d49.8442112!3d40.3734209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307db3097cb2d9%3A0x57a6cb676f62285!2sNizami%20Street!5e0!3m2!1sen!2saz!4v1733890000000!5m2!1sen!2saz",
    },
    {
        id: 9,
        name: "AF Mall",
        address: "28 May Street, Baku",
        distance: "1.3 miles away",
        iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.3058335599833!2d49.8440052!3d40.379885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307db1502170cf%3A0x6b13dbeb831d5b70!2sAF%20Mall!5e0!3m2!1sen!2saz!4v1733890001000!5m2!1sen!2saz",
    },
    {
        id: 10,
        name: "Metro Park",
        address: "Tbilisi Avenue, Baku",
        distance: "2.0 miles away",
        iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.2004063794984!2d49.823095!3d40.404351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307de96d0f6b4f%3A0x85e508097ddee4f4!2sMetro%20Park!5e0!3m2!1sen!2saz!4v1733890002000!5m2!1sen!2saz",
    }
];

function LocationContext({ children }) {
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);

    return (
        <LOCATION.Provider value={{ selectedLocation, setSelectedLocation, locations }}>
            {children}
        </LOCATION.Provider>
    );
}

export default LocationContext;
