# Jobster API

#### Starter

The starter is a copy of jobs-api final project, just with additional data.

#### Setup

- navigate to 06.5-jobster-api/starter
- install dependencies

```sh
npm install
```

- create .env and provide correct values
- you can copy from previous project (just change the DB name)

.env

```js
MONGO_URI=
JWT_SECRET=
JWT_LIFETIME=
```

- start the project

```sh
npm start
```

- you should see "Server is listening ...." text

#### Spring Cleaning

##### Remove Swagger

- delete swagger.yaml file
- remove these lines of code
- delete swagger.yaml
  app.js

```js
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
```

#### Remove API Limiter

- remove these lines of code

app.js

```js
const rateLimiter = require('express-rate-limit');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
```

#### Remove CORS

- we don't want external JS apps to access our API (only our front-end)
- remove these lines of code

```js
const cors = require('cors');
app.use(cors());
```

#### Package.json

- add "dev" script with nodemon
- change engines to current version (in my case 16)

package.json

```js

"scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },

"engines": {
    "node": "16.x"
  }
```

- restart server with "npm run dev"

##### Client Folder

- let's explore client folder
- open client folder
- it's a react app built with CRA
- it's the same as in my React Course (JOBSTER APP),
  just base url points to our current server (instead of heroku app)

utils/axios.js

```js
const customFetch = axios.create({
  baseURL: '/api/v1',
});
```

- notice the build folder (production ready application)
- in CRA we can create build folder by running "npm run build"
- that's the one we will use for our front-end

##### Setup Front-End

- require "path" module
- setup express static (as first middleware)
  to serve static assets from client/build
- so now instead of public folder we are using client/build

app.js

```js
const path = require('path');

app.use(express.static(path.resolve(__dirname, './client/build')));

// place as first middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
```

- serve index.html for all routes (apart from API)
- front-end routes pick's it up from there

```js
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

// serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
```

- navigate to localhost:5000
- clear local storage (if necessary)

#### Modify User Model

- add following properties

models/User.js

```js
lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'lastName',
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'my city',
  },

```

#### Modify Response in Register and Login

- change the response structure in
  register and login controllers (just keep old StatusCodes)

controllers/auth.js

```js
res.status(StatusCodes.CREATED).json({
  user: {
    email: user.email,
    lastName: user.lastName,
    location: user.location,
    name: user.name,
    token,
  },
});
```

- Login and Register Works Now :):):)

#### Create Test User

- test front-end request
- in postman or front-end
- make sure email and password are the same (or change the front-end)

```js
{
    "name":"demo user",
    "email":"testUser@test.com",
    "password":"secret"
}
```

- navigate to client/src/pages/Register.js
- make sure email and password match your test user

```js
<button
  type='button'
  className='btn btn-block btn-hipster'
  disabled={isLoading}
  onClick={() =>
  dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' }))}>

```

#### Update User Functionality

- import authenticateUser middleware
- setup updateUser route (protected route)

routes/auth.js

```js
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');
const { register, login, updateUser } = require('../controllers/auth');
router.post('/register', register);
router.post('/login', login);
router.patch('/updateUser', authenticateUser, updateUser);

module.exports = router;
```

- create updateUser controller
- setup export

controllers/auth.js

```js
const updateUser = async (req, res) => {
  console.log(req.user);
  console.log(req.body);
};
```

- complete updateUser

controllers/auth.js

```js
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};
```

- Why New Token?

#### GOTCHA

- this.modifiedPaths();

```js
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
```

#### Modify Job Model

- add following properties

models/Job.js

```js
jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'remote', 'internship'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
      required: true,
    },
```

- default property just for fun, values will be provided by front-end

#### Setup Mock Data

- [Mockaroo](https://www.mockaroo.com/)
- create mock-data.json (root)
- provide test user id

#### Populate DB

- create populate.js

populate.js

```js
require('dotenv').config();

const mockData = require('./mock-data.json');

const Job = require('./models/Job');
const connectDB = require('./db/connect');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await Job.create(mockData);
    console.log('Success!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
```

#### Modify Get All Jobs

- latest mongoose version change

controllers/jobs.js

```js
const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  // protected route
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }
  // add stuff based on condition

  if (status && status !== 'all') {
    queryObject.status = status;
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  // NO AWAIT

  let result = Job.find(queryObject);

  // chain sort conditions

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }
  if (sort === 'a-z') {
    result = result.sort('position');
  }
  if (sort === 'z-a') {
    result = result.sort('-position');
  }

  //

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};
```

#### Make Test User Read-Only

middleware/authentication.js

```js
const payload = jwt.verify(token, process.env.JWT_SECRET);
const testUser = payload.userId === '62eff8bcdb9af70b4155349d';
req.user = { userId: payload.userId, testUser };
```

- create testingUser in middleware

middleware/testUser

```js
const { BadRequestError } = require('../errors');

const testUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError('Test User. Read Only!');
  }
  next();
};

module.exports = testUser;
```

- add to auth routes (updateUser)

```js
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');
const testUser = require('../middleware/testUser');
const { register, login, updateUser } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.patch('/updateUser', authenticateUser, testUser, updateUser);

module.exports = router;
```

- add to job routes (createJob, updateJob, deleteJob)

routes/jobs.js

```js
const express = require('express');

const router = express.Router();
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  showStats,
} = require('../controllers/jobs');
const testUser = require('../middleware/testUser');

router.route('/').post(testUser, createJob).get(getAllJobs);
router.route('/stats').get(showStats);
router
  .route('/:id')
  .get(getJob)
  .delete(testUser, deleteJob)
  .patch(testUser, updateJob);

module.exports = router;
```

#### API Limiter

routes/auth.js

```js
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');
const testUser = require('../middleware/testUser');
const { register, login, updateUser } = require('../controllers/auth');

const rateLimiter = require('express-rate-limit');
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    msg: 'Too many requests from this IP, please try again after 15 minutes',
  },
});

router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);
router.patch('/updateUser', authenticateUser, testUser, updateUser);

module.exports = router;
```

app.js

```js
app.set('trust proxy', 1);

app.use(express.static(path.resolve(__dirname, './client/build')));
```

#### Setup Stats Route

controllers/jobs

```js
const showStats = (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ defaultStats: {}, monthlyApplications: [] });
};

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  showStats,
};
```

routes/jobs.js

```js
const express = require('express');

const router = express.Router();
const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
  showStats,
} = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJobs);
router.route('/stats').get(showStats);
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
```

- npm install moment
- import mongoose and moment

controllers/jobs

```js
const mongoose = require('mongoose');
const moment = require('moment');
```

- [Javascript Nuggets - Reduce Basics](https://youtu.be/3WkW9nrS2mw)
- [Javascript Nuggets - Reduce (object example)](https://youtu.be/5BFkp8JjLEY)

controllers/jobs

```js
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
```

#### Deploy

- remove existing git repo

- add reverse() in showStats

controllers/jobs.js

```js
monthlyApplications = monthlyApplications
  .map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    const date = moment()
      .month(month - 1)
      .year(year)
      .format('MMM Y');
    return { date, count };
  })
  .reverse();
```

- remove Procfile
- remove engines from package.json

```json
"engines": {
    "node": "16.x"
  }
```

- fix build folder (remove /build from client/.gitignore)
- setup new github repo
- deploy to render
