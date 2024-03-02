
const fetchCountries = async (name) => {
    try {
        const response = await fetch(`https://restcountries.com/v2/name/${name}`);
        if (!response.ok) {
            throw new Error('Country not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch countries data');
    }
};

export default fetchCountries;