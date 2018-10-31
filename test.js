const FrappeRequest = require("./index").FrappeRequest;

const frappe = FrappeRequest('http://localhost:8002', 'Administrator', 'frappe');

frappe.then(async (res) => {
  const accounts = await res.get_list('Account');
  const items = await res.get_list('Item');
  const interest = await res.get_doc('Item', 'INTEREST');
  // const new_item = await res.insert({
  //   'doctype': 'Item',
  //   'item_code': 'Test',
  //   'item_group': 'All Item Groups'
  // });
  // const deleted_item = await res.delete('Item', 'Test');
  // console.log(deleted_item);
  const item_group = await res.get_value('Item', 'item_name', { 'item_code': 'INTEREST' });
  const customer = await res.set_value('Customer', 'Thesis', 'customer_name', 'Thesis Vamoy');
  const proceed_pos = await res.get_api('pharmakit.utils.proceed_pos');

  console.log(items);
  console.log(interest);
  console.log(item_group);
  console.log(customer);
  console.log(proceed_pos);
});
