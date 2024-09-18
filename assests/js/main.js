document.querySelector('#search').addEventListener('submit', async (event)=>{
  event.preventDefault();
  
  const cityName = document.querySelector('#city_name').value.trim();
  if(!cityName){
    document.querySelector('#weather').classList.remove('show');
    showAlert(`
    Você precisa digitar uma cidade...
    <img src="./assests/imgs/city.svg"/>
    `);
    return;
  }
  const apiKey ='39d38dca5bc6a98271119854391653cf';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;
  
  const results= await fetch(apiUrl);
  const json = await results.json();
  
  if(json.cod===200){
    showInfo({
      city: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      tempMax: json.main.temp_max,
      tempMin: json.main.temp_min,
      humidity: json.main.humidity,
      description: json.weather[0].description,
      tempIcon: json.weather[0].icon,
      windSpeed: json.wind.speed,
    });
  } else {
    document.querySelector('#weather').classList.remove('show');
    showAlert(`
    Não foi possível localizar.
    
    <img src="./assests/imgs/404.svg"/>
    `)
  }
  
});

function showInfo(json){
  showAlert('');
  
  document.querySelector('#weather').classList.add('show');
  document.querySelector('#title').textContent = `${json.city}, ${json.country}`
  document.querySelector('#temp_value').innerHTML= `${json.temp.toFixed(1).toString().replace('.', ',')}<sup>°C</sup>`;
  document.querySelector('#temp_description').textContent=`${json.description}`;
  document.querySelector('#temp_img').setAttribute('src',`https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
  document.querySelector('#temp_max').innerHTML=`${json.tempMax.toFixed(1).toString().replace('.',',')}<sup>°C</sup>`;
  document.querySelector('#temp_min').innerHTML=`${json.tempMin.toFixed(1).toString().replace('.',',')}<sup>°C</sup>`;
  document.querySelector('#humidity').textContent = `${json.humidity}%`;
  document.querySelector('#wind').textContent = `${json.windSpeed.toFixed(1).toString().replace('.',',')} km/h`;
  
  
}

function showAlert(msg){
  document.querySelector('#alert').innerHTML = msg;
}
