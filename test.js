import axios from 'axios'



// axios.post('http://localhost:5000/tweets', {tweet: "EIEIEIEIEI"}).then(response => {
//     console.log(response.data)
// })

// axios.get('http://localhost:5000/tweets?page=2').then(response => {
//     console.log(response.data)
// })

axios.get('http://localhost:5000/tweets?user=levy').then(response => {
    console.log(response.data)
})

// console.log(typeof 1 === 'number')