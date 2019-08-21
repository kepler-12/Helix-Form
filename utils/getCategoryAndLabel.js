export default (e) => {
  if (e && e.path) {
    let category
    let label
    const search = e.path.slice()
    while ((!category || !label) && search[0] && search[0].getAttribute) {
      if (!category) {
        category = search[0].getAttribute('data-box')
      }
      if (!label) {
        label = search[0].getAttribute('data-title')
      }
      search.shift()
    }
    return {category, label}
  } else {
    return {category: 'app', label: 'app-label'}
  }
}
