
//Asynchroniczna funkcja do pobierania danych o krajach
async function fetchCountries() {
   try {
        //Wykonuje żądanie HTTP do API Rest Countries za pomocą Fetch API
       const response = await fetch('https://restcountries.eu/rest/v2/name/{name}');

       //Sprawdza, czy żądanie zakończyło się sukcesem
       if (!response.ok) {
           throw new Error('Failed to fetch countries data');
       }

       // Parsuje odpowiedź jako JSON i zwracamy tablicę krajów
       return await response.json();
   } catch (error) {
       // Obsługa błędów, jeśli żądanie się nie powiedzie
       console.error('Error fetching countries data:', error.message);
       throw error;
   }
}
