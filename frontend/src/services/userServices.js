import axios from 'axios';
const BASE_URL = 'http://localhost:3003/user'

var gUsers = [
    { id: 1, firstName: "Bob", lastName: "Person", userName: 'Nickname1', followers: [1, 4, 5, 6, 7], followees: [5], profilePic: "https://randomuser.me/api/portraits/women/44.jpg" },
    { id: 2, firstName: "Samantha", lastName: "Person", userName: 'Nickname2', followers: [5], followees: [4, 5], profilePic: "https://randomuser.me/api/portraits/men/39.jpg" },
    { id: 3, firstName: "Greg", lastName: "Person", userName: 'Nickname3', followers: [], followees: [], profilePic: "https://randomuser.me/api/portraits/women/71.jpg" },
    { id: 4, firstName: "Liyla", lastName: "Cat", userName: 'Nickname4', followers: [1, 2, 3, 4, 5, 6, 7, 8], followees: [1, 2, 3, 4, 5, 6, 7], profilePic: "https://randomuser.me/api/portraits/women/22.jpg" },
    { id: 5, firstName: "MyWay", lastName: "Cat", userName: 'Nickname5', followers: [2], followees: [1, 2, 3, 4, 5, 6, 7, 8, 9], profilePic: "https://randomuser.me/api/portraits/women/21.jpg" },
    { id: 6, firstName: "Chavaselelt", lastName: "Cat", userName: 'Nickname6', followers: [1, 4, 5, 6, 7,], followees: [5, 5, 6, 7], profilePic: "https://randomuser.me/api/portraits/women/63.jpg" },
    { id: 7, firstName: "Eyal", lastName: "Pinkas", userName: 'Nickname7', followers: [1, 4, 5, 6, 7, 6, 7, 8], followees: [5, 6, 7, 8], profilePic: "https://randomuser.me/api/portraits/women/31.jpg" },
    { id: 8, firstName: "Yael", lastName: "Regev", userName: 'Nickname8', followers: [1, 4, 5, 6, 7], followees: [5, 4, 4, 4, 4], profilePic: "https://randomuser.me/api/portraits/men/27.jpg" },
    { id: 9, firstName: "Bella", lastName: "Dog", userName: 'Nickname9', followers: [1, 4, 5, 6, 7, 4, 4, 4, 4], followees: [5, 4, 4, 4], profilePic: "https://randomuser.me/api/portraits/women/89.jpg" },
    { id: 10, firstName: "Ariella", lastName: "Wills", userName: 'Nickname10', followers: [1, 4, 5, 6, 7, 4, 4, 4, 4, 4], followees: [5], profilePic: "https://randomuser.me/api/portraits/women/89.jpg" },
]

function getUserById(userId) {
    return axios.get(`${BASE_URL}/${userId}`)
        .then(res =>{
            return res.data
            
        })
}


export default {
    getUserById
}