const needle = require('needle');

// Things to do
// =============
// 1. new frapperequests - connects and saves the cookies
// 2. get_doc in your face

function FrappeRequest(url, usr, pwd) {
  
  // Hey man
  this.url = url;

  // Login
  let data = {
    'cmd': 'login',
    'usr': usr,
    'pwd': pwd
  };

  return needle('post', url, data, { json: true })
    .then(res => res.cookies)
    .then(res => {
      this.cookies = res;
      return this;
    })
    .catch(err => console.error(err));

}

FrappeRequest.prototype.get_list = function(doctype) {
  return needle('get', `${this.url}/api/resource/${doctype}`, { cookies: this.cookies })
    .then(res => res.body.data)
    .catch(err => console.error(err));
}

FrappeRequest.prototype.get_doc = function(doctype, name) {
  return needle('get', `${this.url}/api/resource/${doctype}/${name}`, { cookies: this.cookies })
    .then(res => res.body.data)
    .catch(err => console.error(err));
}

FrappeRequest.prototype.get_value = function(doctype, fieldname, filters) {
  let data = {
    'cmd': 'frappe.client.get_value',
    'doctype': doctype,
    'fieldname': fieldname,
    'filters': JSON.stringify(filters)
  };
  return needle('post', `${this.url}`, data, { cookies: this.cookies })
    .then(res => res.body.data)
    .catch(err => console.error(err));
}

FrappeRequest.prototype.set_value = function(doctype, docname, fieldname, value) {
  let data = {
    'cmd': 'frappe.client.set_value',
    'doctype': doctype,
    'name': docname,
    'fieldname': fieldname,
    'value': value
  };
  return needle('post', `${this.url}`, data, { cookies: this.cookies })
    .then(res => res.body.data)
    .catch(err => console.error(err));
}

FrappeRequest.prototype.insert = function(doc) {
  return needle('post', `${this.url}/api/resource/${doc.doctype}`, { data: JSON.stringify(doc) }, { cookies: this.cookies })
    .then(res => res.body.data)
    .catch(err => console.error(err));
}

FrappeRequest.prototype.delete = function(doctype, name) {
  let data = {
    'cmd': 'frappe.client.delete',
    'doctype': doctype,
    'name': name
  };
  return needle('post', `${this.url}`, data, { cookies: this.cookies })
    .then(res => res.body.data)
    .catch(err => console.error(err));  
}

module.exports.FrappeRequest = async function(url, usr, pwd) {
  return await new FrappeRequest(url, usr, pwd);  
}