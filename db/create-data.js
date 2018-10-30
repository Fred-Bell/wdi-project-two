const mongoose = require('mongoose');
const environment = require('../config/environment');
mongoose.connect(environment.dbUri);


const Photo = require('../models/photo');
const User = require('../models/user');

User.collection.drop();
Photo.collection.drop();

const userData = [
  {
    username: 'freddie_.bell',
    email: 'fred@fred',
    password: 'pass',
    profilePicture: 'https://i.imgur.com/aIPiztH.jpg'
  },
  {
    username: 'boy_Georgexx420xx',
    email: 'g@g',
    password: 'pass',
    profilePicture: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg'
  }
];

User
  .create(userData)
  .then(users => {
    console.log(`${users.length} users created`);
    return Photo
      .create([
        {
          description: 'blablabla',
          image: 'https://pbs.twimg.com/media/DqnKWFxWkAAuHiV.jpg',
          addedBy: users[0]
        },
        {
          description: 'jajajaja',
          image: 'https://i.redd.it/ytitd72wz2b11.jpg',
          addedBy: users[1]
        },
        {
          description: 'xoxo',
          image: 'https://cdn.images.dailystar.co.uk/dynamic/58/photos/631000/620x/572e3ac6a4251_GettyImages528942082.jpg',
          addedBy: users[0]
        }
      ])
      .then(result => console.log(`Created ${result.length} photos`))
      .then(() => mongoose.connection.close());
  });
