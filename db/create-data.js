const mongoose = require('mongoose');
const environment = require('../config/environment');
mongoose.connect(environment.dbUri);


const Photo = require('../models/photo');
const User = require('../models/user');

User.collection.drop();
Photo.collection.drop();

const userData = [
  {
    name: 'Freddie Bell',
    username: 'freddie_.bell',
    email: 'fred@fred',
    password: 'pass',
    profilePicture: 'https://i.imgur.com/aIPiztH.jpg',
    bio: 'I like to party'
  },
  {
    name: 'George Green',
    username: 'boy_GeorgeXoXo',
    email: 'g@g',
    password: 'pass',
    profilePicture: 'https://amp.businessinsider.com/images/5899ffcf6e09a897008b5c04-750-750.jpg',
    bio: 'Business up front, party in the back'
  },
  {
    name: 'Alex Francis',
    username: 'Big_FRANCIS',
    email: 'alex@email',
    password: 'pass',
    profilePicture: 'https://media.licdn.com/dms/image/C4D03AQFEtVumC_yOng/profile-displayphoto-shrink_800_800/0?e=1546473600&v=beta&t=9kHlw44B4UBj9Nbw9vQROO12bd-menUbA-C631CJ49I',
    bio: 'Student at GA'
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
        },
        {
          description: 'hahahaha so true! 😂',
          image: 'https://www.probytes.net/wp-content/uploads/2018/01/20.png',
          addedBy: users[1]
        },
        {
          description: 'I wish I was Drake 😭',
          image: 'http://www.smallplanet.com/soapbox/wp-content/uploads/2018/06/QgnFwC-kleJXQYWj578vkH6RAPtl-OWH7U09kKKxxpM.png',
          addedBy: users[1]
        },
        {
          description: 'Best day of my life #veryproudboy #allgrowedup',
          image: 'https://media.licdn.com/dms/image/C4D03AQFEtVumC_yOng/profile-displayphoto-shrink_800_800/0?e=1546473600&v=beta&t=9kHlw44B4UBj9Nbw9vQROO12bd-menUbA-C631CJ49I',
          addedBy: users[2]
        }
      ])
      .then(result => console.log(`Created ${result.length} photos`))
      .then(() => mongoose.connection.close());
  });
