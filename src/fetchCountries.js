function fetchCountries(countryName) { 
    const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,capital,population,languages`;
    return fetch(url).then(res => {
        if (!res.ok) {
            throw new Error(res.status);
        }
        return res.json()
    }).catch(err => {
      console.log(err);
    });
};

export default {fetchCountries} 