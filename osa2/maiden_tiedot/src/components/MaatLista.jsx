import axios from "axios";
import React from "react";

const MaatLista = (maat) => {

    console.log(maat)

    if (maat.maat.length > 10 || maat === undefined){
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    if (1< maat.maat.length && maat.maat.length < 10){
        return (
        <ul>
            {maat.maat.map((maa, i) =>
            <li key={i}>{maa.name.common}</li>)}
        </ul>
    )}
    if (maat.maat.length <= 1){
        return (
            <div>
                {maat.maat.map((maa) =>
                <div>
                    <h1>{maa.name.common}</h1>
                    <p>{maa.capital}</p>
                    <p>area {maa.area}</p>
                    <p>Languages:</p>
                    <ul>
                        {Object.keys(maa.languages).map((kieli) => 
                        <li key={kieli}> {maa.languages[kieli]} </li>)}
                    </ul>
                    <img src="maa.flag" alt={maa.flags.alt} height={200} width={200}></img>
                </div>
                )}
            </div>
        )
    }
}

export default MaatLista