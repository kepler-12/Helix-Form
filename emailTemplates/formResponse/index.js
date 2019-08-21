const head = require('./head')
const title = require('./title')
const entries = require('./entries')
const footer = require('./footer')
module.exports = ({notification, data}) => {
  return head(notification.logo) + title(notification) + entries({data}) + footer()
}
