const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const nimi = process.argv[3]
const numero = process.argv[4]

const url =
  `mongodb+srv://jerehietikko:${password}@cluster0.p9wjtxy.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length<4) {
    Person
    .find({})
    .then(persons => {
        console.log(persons)

        mongoose.connection.close()
    })
    
  }

if (process.argv.length === 5) {
    const person = new Person({
    name: `${nimi}`,
    number: `${numero}`,
    })

    person.save().then(result => {
    console.log(`added ${nimi} number ${numero} to phonebook `)
    mongoose.connection.close()
    })
  }