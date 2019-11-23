const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:dbadmin1234@cluster0-hgsol.mongodb.net/vasodb?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => console.log('Conexión establecida'))
.catch(err => console.error(err));