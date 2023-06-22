import axios from 'axios'



axios.post('http://localhost:5000/tweets', {tweet: "EIEIEIEIEI"}).then(response => {
    console.log(response.data)
})

axios.get('http://localhost:5000/tweets').then(response => {
    console.log(response.data)
})