function fetchCountries(countryName) { 
    const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,capital,population,languages`;
    return fetch(url).then(res => {
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        return res.json()
    } 
)
};

export default {fetchCountries} 