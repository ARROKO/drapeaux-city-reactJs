import React, {useEffect, useState} from 'react';
import axios from "axios";
import Card from "./Card";

const Countries = () => {
    const [data, setData] = useState([])
    const [rangevalue, setRangeValue] = useState(0)
    const [selectedRadio, setSelectedRadio] = useState( "")
    const radios =['Africa', "America", "Asia", "Europe", "Oceania"]

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => setData(res .data))
    }, []);

    return (
        <div className="countries">
            <ul className="radio-container">
                <input type="range" min="0" max="250" onChange={(e) => setRangeValue(e.target.value)} defaultValue={rangevalue}/>
                <span>{rangevalue}</span>
                {
                    radios.map((continent) => <li>
                        <input type="radio" checked={continent === selectedRadio} id={continent} name="continentRadio" onChange={(e) => setSelectedRadio(e.target.id)}/>
                        <label htmlFor={continent}>{continent}</label>
                    </li>)
                }
            </ul>
            {selectedRadio && <button onClick={() => setSelectedRadio("")}>Annuler la selection</button>}
            <ul>
                {
                    data
                        .filter((country) => country.continents[0].includes(selectedRadio))
                        .slice(0, rangevalue)
                        .map((country,index) => <Card key={index} country = {country}/>)
                }
            </ul>
        </div>
    );
};

export default Countries;