const getForm = document.querySelector('.change-location');
const getCard = document.querySelector('.card');
const getDetails = document.querySelector('.details');
const getImage = document.querySelector('.time');
const getIcon = document.querySelector('.icon img');
const foreCast = new ForeCast();


const updateUI = async (data)  => {
// taking placeDetails and weather details update data function which return a promice then we making dom request with innerHTML method  a placing all the object information property inside of that

   const placeDetails = data.placeDetails
   const weatherDetails = data.weatherDetails

   getDetails.innerHTML = `
   <div class="text-muted text-uppercase text-center details">
   <h5 class="my-3">${placeDetails.EnglishName}</h5>
   <div class="my-3">${weatherDetails.WeatherText}</div>
   <div class="display-4 my-4">
     <span>${weatherDetails.Temperature.Metric.Value}</span>
     <span>&deg;C</span>
   </div>
 </div>
   `
   // removing display none (bootstrap css) from card element

   if(getCard.classList.contains('d-none')){
     getCard.classList.remove('d-none');
   }
   //implementing ui images

   const iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`
    getIcon.setAttribute('src',iconSrc);
    // let imgSrc = null;

    // if(weatherDetails.IsDayTime){
    //   imgSrc = 'img/day.svg';
    // }else{
    //   imgSrc = 'img/night.svg';
    // }

    let imgSrc = weatherDetails.IsDayTime ?  'img/day.svg' : 'img/night.svg';

  getImage.setAttribute('src',imgSrc);
}


/*
const updateData = async (id) => {
  const placeDetails = await getCity(id);
  const weatherDetails = await getWeather(placeDetails.Key)
  return {placeDetails,weatherDetails};

return 
  {placeDetails:placeDetails
  placeKey:placeKey },
 
}
*/

getForm.addEventListener('submit', (e) => {
  //preventing default function
  e.preventDefault();

  //getting data from from

  const placeName = getForm.city.value.trim();
  getForm.reset();
  
  //calling async function which return promises
  foreCast.updateData(placeName).then(data => {
     updateUI(data);
   }).catch(err => {
     console.log(err);
   })

   //save data in localStorage
   localStorage.setItem('city',placeName)

});


if(localStorage.getItem('city')){
  foreCast.updateData(localStorage.getItem('city'))
  .then(data => updateUI(data))
  .catch(err => err.message);
}