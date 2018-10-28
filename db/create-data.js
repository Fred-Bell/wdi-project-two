const mongoose = require('mongoose');
const environment = require('../config/environment');
mongoose.connect(environment.dbUri);


const Photo = require('../models/photo');

Photo.collection.drop();

const photoData = [
  {
    description: 'blablabla',
    image: 'https://imgur.com/4amjqbk.jpg'
  },
  {
    description: 'jajajaja',
    image: 'https://i.redd.it/ytitd72wz2b11.jpg'
  },
  {
    description: 'xoxo',
    image: 'https://cdn.images.dailystar.co.uk/dynamic/58/photos/631000/620x/572e3ac6a4251_GettyImages528942082.jpg'
  }
];


Photo
  .create(photoData)
  .then(result => console.log(`Created ${result.length} photos`))
  .then(() => mongoose.connection.close());
