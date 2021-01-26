import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-my-burger-cb14e-default-rtdb.firebaseio.com/'
})

export default instance;