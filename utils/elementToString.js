
export default function (elem) {
  var string = ''
  if (elem.tagName) {
    string += elem.tagName
  }
  if (elem.id && elem.id !== '') {
    string += '#' + elem.id
  }
  if (elem.className && elem.className !== '' && elem.className.split) {
    string += '.' + elem.className.split(' ').join('.')
  }
  if (elem.name && elem.name !== '') {
    string += '?name=' + elem.name
  }
  if (elem.href && elem.href !== '') {
    string += '?href=' + elem.href
  }
  if (elem.value && elem.value !== '') {
    string += '?value=' + elem.value
  }
  return elem === window ? 'window' : string
}
