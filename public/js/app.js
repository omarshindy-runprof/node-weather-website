

const weatherForm   = document.querySelector('form')
const search        = document.querySelector('input')
const msg1          = document.querySelector('#msg1')
const msg2          = document.querySelector('#msg2')
const msg3          = document.querySelector('#msg3')
const msg4          = document.querySelector('#msg4')

msg1.textContent= "Loading ..."

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    fetch('/weather?address='+location).then((response) =>{
        response.json().then((data) =>{
            msg1.textContent = data.location
            msg2.textContent = data.forecastData.temperature
            msg3.textContent = 'The Highest Temp is '+ data.forecastData.tempHigh
            msg4.textContent = 'The Lowest Temp is '+ data.forecastData.tempLow
        })
    })
})