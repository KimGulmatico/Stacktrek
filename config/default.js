module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3030,
  public: '../public/js/',
  paginate: {
    default: 10,
    max: 50,
  },
  cookie: {
    enabled: true,
    name: 'feathers-jwt',
  },
  mongodb: process.env.MONGODB_URI,
  authentication: {
    secret: process.env.AUTH_SECRET,
    strategies: [
      'jwt',
      'local',
      'facebook',
    ],
    path: 'authentication',
    service: 'users',
    cookie: {
      enabled: true,
      name: 'feathers-jwt',
    },
    secretOrKey: process.env.AUTH_SECRET,
    local: {
      usernameField: '\\email',
      passwordField: '\\password',
    },
    facebook: {
      service: 'users',
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      successRedirect: '/',
      failureRedirect: '/',
      scope: [
        'public_profile',
        'email',
      ],
      profileFields: [
        'id',
        'displayName',
        'first_name',
        'last_name',
        'email',
        'gender',
        'profileUrl',
        'birthday',
        'picture',
        'permissions',
      ],
    },
  },
}
