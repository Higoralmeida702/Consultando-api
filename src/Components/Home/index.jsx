import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [randomCountries, setRandomCountries] = useState([]);

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
  const getCountryNameInPortuguese = (country) => {
    return country.translations?.por?.common || country.name.common;
  };
  return (
    <div>
      <h1>Futuro titulo</h1>
      <section className="countryGrid ">
        {randomCountries.map((country) => (
          <div key={country.cca2} className="countryData">
            <img src={country.flags.png} alt="Flag" />
            <p>Nome: {getCountryNameInPortuguese(country)}</p>
            <p>Capital: {country.capital}</p>
            <p>População: {country.population}</p>
            <button className="moreInfo">Mais Informações</button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
