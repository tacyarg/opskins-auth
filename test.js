const Auth = require('opskins-auth')
const auth = Auth('OPSKINS_API_KEY')

auth
  .createClient({
    name: 'Some Website',
    redirect_uri: 'http://localhost:',
  })
  .then(resp => {
    // do somthing
  })
  .catch(console.error)