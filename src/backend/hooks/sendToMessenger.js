import request from 'request'

const sendToMessenger = () => async (hook) => {
  if (hook.type !== 'after') {
    throw new Error('sendToMessenger should be used as a before hook')
  }

  const { recipient } = hook.result
  const recipientEntity = await hook.app.service('users').get(recipient)
  const recipientPSID = recipientEntity.psid

  let text = 'You have a new request'
  // as a default placeholder in case type is not given

  const url = `${process.env.HOST || hook.app.get('host')}`

  if (hook.result.type === 'CONNECT_USER') {
    text = `${hook.result.senderName} wants to connect with you. View it on ${url} `
  } else if (hook.result.type === 'ATTEST_SKILL') {
    text = `${hook.result.senderName} sent an attestion request on ${hook.result.data.name}. View it on ${url}`
  }

  const options = {
    method: 'POST',
    url: 'https://stacktrek-messenger-webhook.herokuapp.com/webhook',
    headers:
      {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    body:
      {
        object: 'page',
        entry:
          [{
            messaging:
              [{
                sender: { id: '1387014548088709' },
                request: { recipientPSID, text },
              }],
          }],
      },
    json: true,
  }

  request(options, (error, response, body) => {
    if (error) throw new Error(error)
    console.log(body)
  })
}

export default sendToMessenger
