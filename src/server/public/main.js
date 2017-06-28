/* global m */

// Resource list
let db = {}

m.request('db').then((data) => {
  db = data
})

m.mount(
  document.getElementById('resources'),
  {
    view () {
      const keys = Object.keys(db)
      const resourceList = (
        m(
          'ul',
          keys
            .map((key) => {
              return m('li', [
                m('a', { href: key }, '/' + key),
                m('sup', Array.isArray(db[key])
                  ? ' ' + db[key].length + 'x'
                  : ' object'
                )
              ])
            })
            .concat([
              m('a', { href: 'db' }, '/db'),
              m('sup', m('em', ' state'))
            ])
        )
      )

      return [
        m('h4', 'Resources'),
        keys.length
          ? resourceList
          : m('p', 'No resources found')
      ]
    }
  }
)

// Custom routes
let customRoutes = {}

m.request('__rules').then((data) => {
  customRoutes = data
})

m.mount(
  document.getElementById('custom-routes'),
  {
    view () {
      const rules = Object.keys(customRoutes)
      if (rules.length) {
        return [
          m('h4', 'Custom routes'),
          m('table', rules.map((rule) => {
            return m('tr', [
              m('td', rule),
              m('td', '⇢ ' + customRoutes[rule])
            ])
          }))
        ]
      }
    }
  }
)
