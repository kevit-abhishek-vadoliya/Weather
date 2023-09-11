const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const loc = search.value
    message1.textContent = "Loading"
    message2.textContent = ""

    fetch(`/weather?address=${loc}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
                message2.textContent = ""
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }

        })
    })
        .catch(() => {
            message1.textContent = ("Please check your internet Connection")
            message2.textContent = ""
        })
})