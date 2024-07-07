import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [randomCountries, setRandomCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [countryInfo, setCountryInfo] = useState(null);

  useEffect(() => {
    const fetchRandomCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data;
        const randomIndexes = generateRandomIndexes(countries.length, 6);
        const randomCountriesData = randomIndexes.map(
          (index) => countries[index]
        );
        setRandomCountries(randomCountriesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRandomCountries();
  }, []);

  const generateRandomIndexes = (max, count) => {
    const indexes = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  };

  const getCountryNameInEnglish = (country) => {
    return country.name.common;
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${searchTerm}`
      );
      const country = response.data[0];
      setCountryInfo(country);
    } catch (error) {
      console.error("Country not found:", error);
      setCountryInfo(null);
    }
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div>
      <h1 className="titulo">Buscar por paises</h1>
      <p className="titulo">Consulta Api</p>
      <section className="receberNomePais">
        <button onClick={handleRefresh} className="buttonBuscar">
          Voltar
        </button>
        <input
          type="text"
          placeholder="Insira o nome do país"
          autoComplete="none"
          className="inputBuscarPais"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="buttonBuscar" onClick={handleSearch}>
          Buscar
        </button>
      </section>
      {countryInfo ? (
        <div className="countryData searchResult">
          <img src={countryInfo.flags.png} alt="Flag" />
          <p>Nome: {getCountryNameInEnglish(countryInfo)}</p>
          <p>Capital: {countryInfo.capital ? countryInfo.capital[0] : "N/A"}</p>
          <p>População: {formatNumber(countryInfo.population)}</p>
          <p>Área: {countryInfo.area} km²</p>
          <p>Região: {countryInfo.region}</p>
          <p>Sub-região: {countryInfo.subregion}</p>
          <p>
            Fronteiras:{" "}
            {countryInfo.borders ? countryInfo.borders.join(", ") : "N/A"}
          </p>
          <p>
            Moeda:{" "}
            {Object.values(countryInfo.currencies || {})
              .map((currency) => currency.name)
              .join(", ")}
          </p>
          <p>
            Idiomas: {Object.values(countryInfo.languages || {}).join(", ")}
          </p>
        </div>
      ) : (
        <section className="countryGrid">
          {randomCountries.map((country) => (
            <div key={country.cca2} className="countryData">
              <img src={country.flags.png} alt="Flag" />
              <p>Nome: {getCountryNameInEnglish(country)}</p>
              <p>Capital: {country.capital ? country.capital[0] : "N/A"}</p>
              <p>População: {country.population}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Home;
