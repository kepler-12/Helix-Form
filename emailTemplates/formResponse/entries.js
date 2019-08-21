const decamelize = require('decamelize')
module.exports = ({data}) => {
  let s = `
  <div style="background-color: white; padding: 10px; width: 90%; margin: auto;text-align:left;margin-bottom:20px;">
    <div style="padding:10px;">
      <p style="color:dimgrey;">Form Submitted on ${getFormattedDate()}</p>`
  s += Object.keys(data).map((key) => entry(key, data[key], s)).join(' ')
  s += `
    </div>
  </div>`
  return s
}

function entry(key, value) {
  key = decamelize(key).replace(/_/g, ' ')
  return `
  <div style="border-width:thin;border-bottom-style:solid;border-color:#f2f2f2;">
    <p style="color:#14a7ae;">${key}:</p>
    <p style="color:dimgrey;">${value}</p>
  </div>
`
}

function getFormattedDate() {
  var date = new Date()

  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var min = date.getMinutes()
  var sec = date.getSeconds()

  month = (month < 10 ? '0' : '') + month
  day = (day < 10 ? '0' : '') + day
  hour = (hour < 10 ? '0' : '') + hour
  min = (min < 10 ? '0' : '') + min
  sec = (sec < 10 ? '0' : '') + sec

  var str = month + '/' + day + '/' + date.getFullYear() + ' ' + hour + ':' + min + ':' + sec

  /* alert(str); */

  return str
}
