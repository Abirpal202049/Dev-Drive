const app = require('./index')

PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`);
})