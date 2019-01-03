# opskins-auth

## Setup / Init

```js
const Auth = require('opskins-auth')
const auth = Auth('SOME_API_KEY')

auth
  .createClient({
    name: 'Some Website',
    redirect_uri: 'https://auth.somewebsite.com',
  })
  .then(resp => {
    // do somthing
  })
  .catch(console.error)
```

## Responses

List of example responses for reference.

### oauth-client

```js
{
  "client_id": "ff371b045307",
  "name": "TestApp2",
  "redirect_uri": "http://localhost:1234",
  "time_created": 1535407757,
  "has_secret": true
}
```

### token-resp

```js
{
  "access_token": "AQAAAAQAAAAAAAVd4P////9Z3Sdf3C+GZhYgJzVwBLYfjo+n8LIAzj+JaAippILcmeX2e2o=",
  "token_type": "bearer",
  "expires_in": 1800,
  "scope": "identity items",
  "refresh_token": "6EnU6ZvGi5OoBcSpGs2V4PkcgfBgwr1V"
}
```

## IOAuth API Methods

### createClient({ [name], [redirect_uri] }, [can_keep_secret])

Create a new OAuth client.

> Returns [OAuth](#oauth-client) client object and secret.

#### Required Object

- `name` - Name for this client, to be displayed to users when they are prompted to approve access
- `redirect_uri` - URI to which users are redirected after approving or denying access

#### Optional Arguments

- `can_keep_secret` - Set this to 0 if your client cannot keep a secret and will maintain per-token secrets (see OAuth documentation). Default 1

```js
auth
  .createClient(
    {
      name: 'Some Website',
      redirect_uri: 'https://auth.somewebsite.com',
    },
    true
  )
  .then(({ secret, client }) => {
    // do somthing...
  })
```

### deleteClient([client_id])

Delete an OAuth client that you own, and invalidate all of its tokens.

> Returns 200 response.

#### Required Arguments

- `client_id` - Hexadecimal client_id of the client you want to delete

```js
auth.deleteClient('some_client_id')
```

### getOwnedClientList()

Get a list of all OAuth clients owned by the authenticated user.

> Returns list of [OAuth](#oauth-client) client objects.

```js
auth.getOwnedClientList().then(clients => {
  // do somthing
})
```

### resetClientSecret([client_id])

Reset the secret for a secret-bearing OAuth client that you own. If you use this, a new secret will be generated and the old one will no longer work.

Does not work if the client_id you pass does not keep a secret.

> Returns [OAuth](#oauth-client) client object with secret.

#### Required Arguments

- `client_id` - Hexadecimal client_id of the client you want to delete

```js
auth.resetClientSecret('some_client_id').then(({ secret, client }) => {
  // do somthing...
})
```

### updateClient([client_id], { [name], [redirect_uri] })

Update an OAuth client that you own. At least one of name and redirect_uri is required.

> Returns [OAuth](#oauth-client) client object.

#### Required Arguments

- `client_id` - Hexadecimal client_id of the client you want to delete

#### Optional Object

- `name` - Name for this client, to be displayed to users when they are prompted to approve access
- `redirect_uri` - URI to which users are redirected after approving or denying access

```js
auth
  .updateClient('some_client_id', {
    name: 'Some Updated Website',
    redirect_uri: 'https://auth.someupdatedwebsite.com',
  })
  .then(client => {
    // do somthing...
  })
```

## Oauth API Methods

### accessToken([code])

Using a authorization code from the user authorization flow, you can exchange it for a bearer token.

> Returns [Token](#token-resp) object.

#### Required Arguments

- `code` - the authorization code you received in your return URL

```js
auth.accessToken('some_client_code').then(token => {
  // do somthing...
})
```

### refreshToken([refresh_token])

If you have a refresh token (i.e. you've already authorized the user in the past), you can use it to get a new bearer token.

> Returns [Token](#token-resp) object.

#### Required Arguments

- `refresh_token` - a refresh token

```js
auth.refreshToken('some_client_token').then(token => {
  // do somthing...
})
```

### revokeToken([token])

If you did not request permanent access to a user's account, then you don't need to do anything to "sign the user out". Their bearer token will automatically expire. If you requested permanent access and received a refresh token, then when you no longer need access to the user's account, you should revoke the refresh token.

> Returns [Token](#token-resp) object.

#### Required Arguments

- `token` - a user's token

```js
auth.revokeToken('some_client_token').then(token => {
  // do somthing...
})
```
