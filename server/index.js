const express = require('express')
const cors = require('cors')
const {Class, User} = require('./db')

const dummyUsers = [
    { uid: 1, username: 'user1', password: 'password1' },
    { uid: 2, username: 'user2', password: 'password2' },
    { uid: 3, username: 'user3', password: 'password3' },
  ];
const init = async () =>{
    try {
        await User.deleteMany()
        await User.create(dummyUsers)
    } catch (error) {
        console.log(error)
    }
    
}
init()

const app = express()
const PORT = process.env.PORT || 4500

require('dotenv').config //this line just allows us to use the dotenv stuff within our app, in case we have like secret information like API

app.use(cors())
app.use(express.json()) //allows us to pass json payload from the frontend to the backend
app.use(express.urlencoded())



app.get('/', (req,res)=>{
    res.send('Buddy dont go here this is just the back-end')
})


app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });
      if (user) {
        res.status(200).json({ username: user.username, status:true });
      } else {
        res.status(200).json({ username: username, status:false});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  });






app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))


