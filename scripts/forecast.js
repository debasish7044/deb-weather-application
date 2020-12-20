
class ForeCast {
   constructor(){
      this.key = 'igAJectZV38oCWzXNjS2zVElblFAIVpN',
      this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/',
      this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search' 
   }

  async updateData(city){
      const placeDetails = await this.getCity(city);
      const weatherDetails = await this.getWeather(placeDetails.Key)
      return {placeDetails,weatherDetails};
   }

   async getCity(city){
      const query = `?apikey=${this.key}&q=${city}`;
      const cityRequest = await fetch(`${this.cityURI}${query}`);
      const data = await cityRequest.json();
      return data[0];
   }

   async getWeather(id){
      const query = `${id}?apikey=${this.key}`
      const weatherRequest = await fetch(`${this.weatherURI}${query}`)
      const data = await weatherRequest.json();
      return data[0];
   }
}










/*



const key = 'igAJectZV38oCWzXNjS2zVElblFAIVpN';


const getWeather = async (id) => {
   const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
   const query = `${id}?apikey=${key}`
   const weatherRequest = await fetch(`${base}${query}`)
   const data = await weatherRequest.json();
   return data[0];
}


const getCity = async (city) => {
   const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
   const query = `?apikey=${key}&q=${city}`;
   const cityRequest = await fetch(`${base}${query}`);
   const data = await cityRequest.json();
   return data[0];
}




// getCity('kolkata')
// .then((data) => {
//   console.log(data)
//   return getWeather(data.Key)
// }).then((data) =>{
//   console.log(data);
// }).catch(err => console.log(err))

*/

