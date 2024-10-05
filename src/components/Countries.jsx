import { useState, useEffect } from "react";
import Country from "./Country";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Countries = () => {
  const [countries, setCountries] = useState([]); // For storing list of countries
  const [country, setCountry] = useState({}); // Changed to useState
  const [isModalOpen, setIsModalOpen] = useState(false); // For Popup Modal
  const [sortBy, setSortBy] = useState(0); // 0-Country-ASC, 1-Country-DESC, 2-Population-ASC, 3-Population-DESC
  const [searchVal, setSearchVal] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]); // Filtered countries
  const storageKey = 'LocalCountries';

  useEffect(() => {
    const storedCountries = JSON.parse(localStorage.getItem(storageKey));
    if (storedCountries) {
      setCountries(storedCountries);
      setFilteredCountries(storedCountries);
      console.log("At stored condition");
      // While the condition was not worked for some reason then I/we used async await instead of directly setting the condition
    } else {
      const fetchFunc = async function () {
        const fetchCountries = await fetch(
          "https://restcountries.com/v3.1/all"
        );
        const rawCountries = await fetchCountries.json();
        const countriesJson = await rawCountries.map((country) => {
          return {
            ...country,
            visited: false, // pushing initial visited state false
          };
        });
        setCountries(countriesJson);
        setFilteredCountries(countriesJson);
        localStorage.setItem(storageKey, JSON.stringify(countriesJson));
        console.log("At fetch condition");
      };
      fetchFunc();
    }
  }, []);

  const countryDetails = (country) => {
    // const countryNativeNames = Object.entries(country?.nativeName || {}).map(
    //   ([code, { official, common }]) => {
    //     return { code, official, common };
    //   }
    // );

    const countryCurrencies = Object.entries(country?.currencies || {}).map(
      (currency) => {
        const [code, { name, symbol }] = currency;
        return { code, name, symbol };
      }
    );

    // My Operation
    const nativeName = country?.name?.nativeName;
    const nativeKeys = nativeName ? Object.keys(nativeName) : [];
    const nativeValues = nativeKeys.length > 0 ? nativeName[nativeKeys[0]] : {};

    const languagesSpoken = Object.values(country?.languages || {}).join(", ");

    setCountry({
      ...country,
      // flag: country?.flags?.svg,
      name: {
        ...country.name,
        nativeName: nativeValues,
      },
      population: country?.population?.toLocaleString(),
      currencies: countryCurrencies,
      languages: languagesSpoken,
    });

    setIsModalOpen(true); // Open the modal
  };

  const filteredData = ({ region, name: { common } }) => {
    if (
      region === "Europe" ||
      region === "Americas" ||
      common === "Israel" ||
      common === "India"
    ) {
      return false;
    }
    return true;
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchVal(value);

    const filtered = countries.filter((country) => {
      return country?.name?.common.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredCountries(filtered);
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
  };

  return (
    <div>
      <Navbar
        searchVal={searchVal}
        handleSearchChange={handleSearchChange}
        handleSortChange={handleSortChange} // Passing the sort change handler
      />

      <hr />
      {/* Modal Popup */}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-base-200 p-5 rounded-2xl w-3/5 shadow-lg flex justify-around items-center relative "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Exit Button */}
            <button
              className="absolute top-2 text-2xl font-bold right-2  text-red-600 hover:bg-red-500 hover:text-white w-10 h-10 rounded-full"
              onClick={closeModal}
            >
              X
            </button>

            {/* Dettails Div */}
            <div className="flex flex-col gap-1 text-l justify-center items-center w-full h-full pl-16 overflow-scroll">
              <div>
                <p className="font-bold">
                  Official:{" "}
                  <span className="font-normal">
                    {" "}
                    {country?.name?.official || ""}{" "}
                  </span>
                </p>
                <p className="font-bold">
                  Native official:{" "}
                  <span className="font-normal">
                    {" "}
                    {country?.name?.nativeName?.official || ""}{" "}
                  </span>
                </p>
                <p className="font-bold">
                  UN member:{" "}
                  <span className="font-normal">
                    {" "}
                    {country?.unMember ? "✔" : "❌"}{" "}
                  </span>
                </p>
                <p className="font-bold">
                  Currency:{" "}
                  {country?.currencies?.length > 0 ? (
                    country?.currencies?.map(({ code, name, symbol }) => (
                      <span className="font-normal" key={code}>
                        {" "}
                        {name} ({symbol}) - {code}{" "}
                      </span>
                    ))
                  ) : (
                    <p>Currencies not available</p>
                  )}
                </p>
                <p className="font-bold">
                  Sub-region:{" "}
                  <span className="font-normal">
                    {" "}
                    {country?.subregion || "Undefined"}{" "}
                  </span>
                </p>
                <p className="font-bold">
                  Languages:{" "}
                  <span className="font-normal">
                    {" "}
                    {country?.languages || "Undefined"}{" "}
                  </span>
                </p>
                <p className="font-bold">
                  Land locked:{" "}
                  <span className="font-normal">
                    {" "}
                    {country?.landlocked ? "✔" : "❌"}{" "}
                  </span>
                </p>
                <p className="font-bold">
                  Boarders:{" "}
                  <span className="font-normal">
                    {" "}
                    {country.borders?.length > 0
                      ? `${country.borders.join(", ")}`
                      : "No borders"}{" "}
                  </span>
                </p>
                <p className="font-bold">
                  Area:{" "}
                  <span className="font-normal">
                    {" "}
                    {country?.area || "Not Found"}{" "}
                  </span>
                </p>
                <p className="font-bold">
                  Population:{" "}
                  <span className="font-normal">
                    {" "}
                    {country?.population || "Not Found"}{" "}
                  </span>
                </p>
                <p className="font-bold">
                  Continent:{" "}
                  <span className="font-normal">
                    {country.continents?.length > 0
                      ? `${country.continents.join(", ")}`
                      : "No continents"}{" "}
                  </span>
                </p>
                <p className="font-bold">
                  Time zone:{" "}
                  <span className="font-normal">
                    {" "}
                    {country.timezones[0] || "Undefined"}{" "}
                  </span>
                </p>
                <p className="font-bold">
                  FIFA:{" "}
                  <span className="font-normal">
                    {" "}
                    {country?.fifa || "Undefined"}{" "}
                  </span>
                </p>
                <p className="font-bold">
                  Start of week:{" "}
                  <span className="font-normal">
                    {" "}
                    {country?.startOfWeek || "Undefined"}{" "}
                  </span>
                </p>
              </div>
            </div>

            {/* Basic Info DIV */}
            <div className="flex flex-col gap-4  justify-center items-center  w-full h-full ">
              <h1 className="text-2xl font-bold  uppercase">
                <span>{country?.name?.common || "Country Name"}</span> /{" "}
                <span>{country?.name?.nativeName?.common}</span>
              </h1>

              <img
                src={country?.flags?.png || "https://flagcdn.com/bd.svg"}
                alt={country?.flags?.alt}
                className="w-3/4 shadow-2xl"
              />
              <div>
                <h2 className="text-xl font-normal">
                  {country?.capital ? (
                    <>
                      Capital:{" "}
                      <span className="font-bold">{country?.capital[0]}</span>
                    </>
                  ) : (
                    ""
                  )}
                </h2>

                <h2 className="text-xl font-normal">
                  Independent:{" "}
                  <span className="font-bold">
                    {country?.independent ? "✔" : "❌"}
                  </span>
                </h2>
                <h2 className="text-xl font-normal">
                  Region:{" "}
                  <span className="font-bold">{country?.region || ""}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Country */}
      <div className="flex flex-wrap justify-center gap-8 p-5 mt-20">
        {filteredCountries.length > 0 ? (
          filteredCountries
            .filter(filteredData)
            .sort((a, b) => {
              return sortBy === 0
                ? a.name.common.localeCompare(b.name.common)
                : sortBy === 1
                ? b.name.common.localeCompare(a.name.common)
                : sortBy === 2
                ? a.population - b.population
                : sortBy === 3
                ? b.population - a.population
                : a.name.common.localeCompare(b.name.common);
            })
            .map((country) => (
              <Country
                key={country.name.common}
                country={country}
                handleClick={countryDetails}
              />
            ))
        ) : (
          <p className="text-3xl">No countries found matching your input</p>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Countries;
