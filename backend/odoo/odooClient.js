const axios = require('axios')

const createOdooUser = async (name) => {
  try {
    await axios.post('https://<your-odoo-url>/jsonrpc', {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'object',
        method: 'execute_kw',
        args: [
          'your_db_name',
          2,
          'your_admin_password',
          'res.partner',
          'create',
          [{ name }]
        ]
      },
      id: new Date().getTime()
    })
    console.log('User synced to Odoo')
  } catch (err) {
    console.error('Odoo sync failed', err)
  }
}

module.exports = { createOdooUser }
