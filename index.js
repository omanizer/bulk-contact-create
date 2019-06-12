const axios = require('axios')

let numberOfContactsToAdd = 50
if (!process.env.API_KEY) {
  throw new Error('No API_KEY env var added.')
}

let run = async () => {
  let promises = []
  for (var i = 0; i < numberOfContactsToAdd; i++) {
    promises.push(axios({
      url: 'https://app.citygro.com/v2/contacts',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`
      },
      data: {
        first_name: 'Mass Contact Create',
        last_name: i + ''
      }
    }))
  }
  await Promise.all(promises)
}

let initialTime = Date.now()
run().then(() => {
  let durationMs = Date.now() - initialTime
  console.log(`${numberOfContactsToAdd} contacts added in ${durationMs / 1000} seconds`)
})
