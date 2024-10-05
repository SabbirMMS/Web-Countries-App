import PropTypes from "prop-types";
import { useState } from "react";

// eslint-disable-next-line no-unused-vars, react/prop-types
const Country = ({ country, handleClick }) => {
  
  const [isToggle, setIsToggle] = useState(country.visited); // visited true or false toggle
  const storageKey = 'LocalCountries';

  // const nativeName = country?.name?.nativeName;
  // const nativeKeys = nativeName ? Object.keys(nativeName) : [];
  // const nativeValues = nativeKeys.length > 0 ? nativeName[nativeKeys[0]] : {};

  // Getting currency name dynamically
  // const currency = country?.currencies
  //   ? Object.values(country.currencies)[0]?.name
  //   : "Unknown Currency";

  return (
    <>
      <div className="card bg-base-300 max-w-72 flex-grow flex-shrink-0 flex-initial shadow-xl border-white border">
        <figure>
          <img
            className="w-full h-40 object-cover"
            src={country?.flags?.png}
            alt={country?.flags?.alt}
          />
        </figure>
        <div className="card-body flex justify-between items-center">
          <h2 className="card-title">
            {country?.name?.common}
            {/* {" || " + nativeValues.common} */}
          </h2>

          {country.capital && (
            <p className="font-bold">
              {/* {`Capital:  ${country.capital[0]}`} */}
              Capital: <span className="font-normal">{country.capital[0]}</span>
            </p>
          )}

          {/* 
          <p className='text-sm font-bold'>
            Officially: <span className='font-thin'>{country?.name?.official}{' || ' + nativeValues.official}</span>
          </p>
          
          {country.timezones && (
            <p>{`Time Zone: ${country.timezones[0]}`}</p>
          )}
          {country.capital && (
            <p>{`Capital: ${country.capital[0]}`}</p>
          )}
          <p>{country.region && `Region: ${country.region}`}</p>
          <p>{country.subregion && `Subregion: ${country.subregion}`}</p>
          <p>{country.borders?.length > 0 ? `Borders: ${country.borders.join(', ')}` : 'No borders'}</p>
          <p>{country.independent ? 'Independent: Yes' : 'Independent: No'}</p>
          <p>{`Currency: ${currency}`}</p> */}

          <div className="card-actions justify-center w-full">
            <button
              className={`${
                isToggle
                  ? "bg-red-500 text-white cursor-not-allowed hover:bg-gray-900"
                  : "btn-primary"
              } btn  w-3/4 `}
              //disabled={isToggle} // Commented to avoid daisy ui's default behavior
              onClick={() => {
                if (isToggle) {
                  // Already visites
                  return;
                }

                const localContries = JSON.parse(localStorage.getItem(storageKey));
                const findIndex = localContries.findIndex(countryData =>{
                  return countryData.cca2 === country.cca2;
                });
                console.log(findIndex);
                if(findIndex !== undefined || findIndex !== -1){
                  const updateCountry = [...localContries];
                  updateCountry[findIndex].visited =!updateCountry[findIndex].visited;
                  localStorage.setItem(storageKey, JSON.stringify(updateCountry));
                }
                handleClick(country);
                setIsToggle(!isToggle);

              }}
            >
              {isToggle ? "Viewed" : "Detail"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Define propTypes for type checking
Country.propTypes = {
  country: PropTypes.shape({
    visited: PropTypes.bool,
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
      official: PropTypes.string.isRequired,
      nativeName: PropTypes.object, // Nested object for native names
    }).isRequired,
    tld: PropTypes.arrayOf(PropTypes.string),
    cca2: PropTypes.string,
    ccn3: PropTypes.string,
    cca3: PropTypes.string,
    cioc: PropTypes.string,
    independent: PropTypes.bool,
    currencies: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string,
        symbol: PropTypes.string,
      })
    ),
    capital: PropTypes.arrayOf(PropTypes.string),
    region: PropTypes.string,
    subregion: PropTypes.string,
    languages: PropTypes.objectOf(PropTypes.string),
    translations: PropTypes.objectOf(
      PropTypes.shape({
        official: PropTypes.string,
        common: PropTypes.string,
      })
    ),
    latlng: PropTypes.arrayOf(PropTypes.number),
    landlocked: PropTypes.bool,
    borders: PropTypes.arrayOf(PropTypes.string),
    area: PropTypes.number,
    population: PropTypes.number,
    flag: PropTypes.string,
    maps: PropTypes.shape({
      googleMaps: PropTypes.string,
      openStreetMaps: PropTypes.string,
    }),
    gini: PropTypes.objectOf(PropTypes.number),
    timezones: PropTypes.arrayOf(PropTypes.string),
    continents: PropTypes.arrayOf(PropTypes.string),
    flags: PropTypes.shape({
      png: PropTypes.string,
      svg: PropTypes.string,
      alt: PropTypes.string,
    }),
    coatOfArms: PropTypes.shape({
      png: PropTypes.string,
      svg: PropTypes.string,
    }),
    startOfWeek: PropTypes.string,
    capitalInfo: PropTypes.shape({
      latlng: PropTypes.arrayOf(PropTypes.number),
    }),
    postalCode: PropTypes.shape({
      format: PropTypes.string,
      regex: PropTypes.string,
    }),
  }).isRequired,
};

export default Country;
