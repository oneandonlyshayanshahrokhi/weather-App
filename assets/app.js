let selected =[];

       let weekButton = document.getElementsByClassName("weeks")[0]
       
        let days = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
        let week = document.getElementsByClassName("day")[0]
        
      let day = document.getElementsByClassName("dayCount")[0]; 
      
      function selection(element){
         selected=[element.innerHTML];
         
          
          const selectedDayIndexes = selected.map(day => days.indexOf(day));
      
         
          let show = selected.every(item => days.includes(item))
            if(show){
             weekButton.innerHTML=element.innerHTML + `<img src="./assets/images/icon-dropdown.svg" alt="">`

            }   
            console.log(selected);
             day.style.display="none" 
                   
                     updateHourly(selectedDayIndexes) 
                  
      }

        
          
     let drop = document.getElementsByClassName("dropdown")[0];
        function dropDown(){
            if(drop.style.right ==="-20%" || drop.style.right === ""){
                drop.style.right = "2%"
            }else{
                drop.style.right ="-20%"
            }
        } 

        function dayDrop(){
            if(day.style.display==="none" || day.style.display===""){
               day.style.display="block"
            }else{
                day.style.display="none"
            }
        }
      
      async function updateHourly(selectedDayIndexes){
        const apiKey = '2bf5ac5cbfc94ee7ab8142447251810'
         const city ='damavand'
          const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`);
            if (response.ok) {
          const data = await response.json(); 
          
            let localTime = new Date(); 
       let localHour = localTime.getHours();
        
         
             let hourlyDiv =document.getElementsByClassName("hourly");
             const selectedDayIndex = selectedDayIndexes[0]; 

                    let findTime =[]
               

           for (let i = 0 ; i<24 ; i++){
            
            let daycounter = selectedDayIndex
            let hourCounter = i
            let conditionText = data.forecast.forecastday[daycounter].hour[hourCounter].condition.text.trim();
            let conditionDay = data.forecast.forecastday[daycounter].hour[hourCounter].is_day
            let conditionTime =data.forecast.forecastday[daycounter].hour[hourCounter].time
            let conditionhighTemp = data.forecast.forecastday[daycounter].hour[hourCounter].temp_c
              ;

               
                 
                
               
                 findTime.push({
                    conditionDay,
                    conditionText,
                    conditionTime,
                    conditionhighTemp
                 })
                  
           }
           let rotatedForecasts = [...findTime.slice(localHour),
                      ...findTime.slice(0, localHour)];
                  
           
               for (let i = 0; i < rotatedForecasts.length; i++){
                    
                 
                      let conditionText = rotatedForecasts[i].conditionText.trim();
                   let conditionDay = rotatedForecasts[i].conditionDay;
                   let conditionTime = rotatedForecasts[i].conditionTime;
                   let conditionhighTemp=rotatedForecasts[i].conditionhighTemp
                  
                   
                 if(i<hourlyDiv.length){
                    hourlyDiv[i].innerHTML = '';
                    let hourlyIcon =document.createElement("img")
                    hourlyIcon.classList.add("hourly-icon")                
                    hourlyDiv[i].appendChild(hourlyIcon) 
                      if((conditionText.toLowerCase() === "sunny")){
              hourlyIcon.src="./assets/images/icon-sunny.webp"
             }else if(conditionText.toLowerCase() === "clear")  {
                hourlyIcon.src="./assets/images/icon-overcast.webp"
             }else if(conditionText.toLowerCase() === "partly cloudy"){
                hourlyIcon.src="./assets/images/icon-partly-cloudy.webp"
             }else if(conditionText.toLowerCase() === "overcast"){
                hourlyIcon.src="./assets/images/icon-overcast.webp"
             }else if (conditionText.toLowerCase() === "cloudy"){
                  hourlyIcon.src="./assets/images/icon-partly-cloudy.webp"
             }
             let forecastHour = new Date(conditionTime).getHours();
             
             let period=""
              if(forecastHour>=12){
                 period = "PM"
                 forecastHour-=12

             }else if(forecastHour=== 0){
                 period = "AM"
                forecastHour=12
             }
                
              

             

              
            
            
                let hourP = document.createElement("p")
                hourP.classList.add("hourlyp")
                hourlyDiv[i].appendChild(hourP)
                     hourP.innerHTML=`${forecastHour}${period}`
            

              
              let hightTemp = document.createElement("p")
                hightTemp.classList.add("highThourly")
                 hourlyDiv[i].appendChild(hightTemp)
                 hightTemp.innerHTML=`${conditionhighTemp}&#xb0`
                 } 
               }
            }    
      }
     
 // reading API 
        async function getweather() {
            const apiKey = '2bf5ac5cbfc94ee7ab8142447251810'
            const city ='damavand'
                const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`);
            if (response.ok) {
        const data = await response.json(); 
        const Temperature = data.current.temp_c
        const national = data.location.country
        const cityName =data.location.name
        let isDay=data.current.is_day
        let date = data.location.localtime
        let feels = data.current.feelslike_c
        let humidity = data.current.humidity
        let wind = data.current.vis_km
        let precipitaion = data.current.precip_mm
        let weatherSituation = data.current.condition
         
      
         
        

        let dayIndex = new Date(date).getDay()
        let dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex]
         
           
          console.log(data);
        
         //forecast
         let dailyInfo = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
          let newClass = ["first","second","third","fourth","fifth","sixth","seventh"]
           let dailyDfirst =  document.getElementsByClassName("daily-details")

            

         for (let i = 0 ; i<dailyDfirst.length ; i++){
               //name of days
                      let allP =document.createElement("p")
                       allP.classList.add("dayName")
                        dailyDfirst[i].appendChild(allP)
                        allP.innerHTML=`${dailyInfo[i]}`

                        // maxTemp
                       let maxTemp = document.createElement("p")
                       maxTemp.classList.add("maxTemp")
                       
                       dailyDfirst[i].appendChild(maxTemp)
                       maxTemp.innerHTML=`${data.forecast.forecastday[i].day.maxtemp_c} &#xb0;`

                       //minTemp
                       let minTemp =document.createElement("p")
                       minTemp.classList.add("minTemp")
                       dailyDfirst[i].appendChild(minTemp)
                       minTemp.innerHTML = `${data.forecast.forecastday[i].day.mintemp_c} &#xb0;
                       `
                     //condition
                    let conditionWeather = data.forecast.forecastday[i].day.condition.text.trim()
                    let conditionIcon =document.createElement("img")
                    conditionIcon.classList.add(`weekly${newClass[i]}`)
                    dailyDfirst[i].appendChild(conditionIcon)
                    
                           if(conditionWeather.toLowerCase() === "sunny"){
                            conditionIcon.src="./assets/images/icon-sunny.webp"
                           }else if (conditionWeather.toLowerCase()==="clear"){
                            conditionIcon.src="./assets/images/icon-overcast.webp"
                           }else if(conditionWeather.toLowerCase()==="partly cloudy"){  
                            conditionIcon.src="./assets/images/icon-partly-cloudy.webp"
                           }else if(conditionWeather.toLowerCase()==="overcast"){
                             conditionIcon.src="./assets/images/icon-overcast.webp"
                           }

                    
                           
                           
         }
        ;
              
                
                let today = new Date() 
                console.log(today);             
                let todayIndex = today.getDay()
                  console.log(todayIndex);
                  
            selected = [days[todayIndex]]; 
            weekButton.innerHTML = days[todayIndex] + `<img src="./assets/images/icon-dropdown.svg" alt="">`;
            day.style.display = "none";
            updateHourly([todayIndex]); 

             let bigPic = document.getElementsByClassName("bigPic")[0]
          let details =document.getElementsByClassName("details")[0]
          let secDetails = document.getElementsByClassName("details")[1]
          let otherDetails =document.getElementsByClassName("details-second")[0]
          let otherDetailssecond = document.getElementsByClassName("details-second")[1]
         
        

          //create elements
          let otherDetailsSecondH = document.createElement("h4")
          let otherDetailsH = document.createElement("h4")
          let detailsSecondH = document.createElement("h4")
          let detailsH = document.createElement("h4")
          let hElement = document.createElement("h1")
          let secondElement = document.createElement("h3")
          let thirdElement =document.createElement("p")
          let weatherIcon = document.createElement("img")
          let dayInfo = document.createElement("p")
          bigPic.appendChild(weatherIcon)
          weatherIcon.classList.add("overcast")
          //weather icons
          if(weatherSituation.text.toLowerCase() === "clear"){
           weatherIcon.src="./assets/images/icon-overcast.webp"
           }else if(weatherSituation.text.toLowerCase() === "sunny"){
           weatherIcon.src="./assets/images/icon-sunny.webp"
           }else if(weatherSituation.text.toLowerCase()==="partly cloudy"){
          weatherIcon.src="./assets/images/icon-partly-cloudy.webp"
           }else if(weatherSituation.text.toLowerCase() === "cloudy"){
            weatherIcon.src="./assets/images/icon-partly-cloudy.webp"
           }
           
           //add information to app
          bigPic.appendChild(hElement)
          bigPic.appendChild(secondElement)
          bigPic.appendChild(thirdElement)        
          hElement.classList.add("firstH")
          secondElement.classList.add("secondH")
          thirdElement.classList.add("thirdP")
          hElement.innerHTML=`${Temperature} &#xb0;`
          secondElement.innerHTML =`${cityName}, ${national}`
          thirdElement.innerHTML=`${dayName} ${date}`
          otherDetailssecond.appendChild(otherDetailsSecondH)
          otherDetailsSecondH.innerText=`${precipitaion}`
          otherDetails.appendChild(otherDetailsH)
          otherDetailsH.innerText = `${wind}KM/h`
           secDetails.appendChild(detailsSecondH)
          detailsSecondH.innerText=`${humidity}%`  
           details.appendChild(detailsH)
          detailsH.innerHTML=`${feels}&#xb0;`
         
         
          
         }
        }
        
        getweather();