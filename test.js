import axios from 'axios'

// axios.post('http://localhost:5000/sign-up', {    
//     username: 'usernsaame',
//     avatar: 'avatar'
// }).then(res => {
//     console.log(res.data)
// })

axios.post("http://localhost:5000/tweets", {
    tweet: "EIEIEIEIE"
  }, {
    headers: {
      'user': "a"
    }
  }).then(response => {
    console.log(response.data)
})

// axios.get('http://localhost:5000/tweets?page=2').then(response => {
//     console.log(response.data)
// })

// axios.get('http://localhost:5000/tweets/levy').then(response => {
//     console.log(response.data)
// })

// console.log(typeof 1 === 'number')