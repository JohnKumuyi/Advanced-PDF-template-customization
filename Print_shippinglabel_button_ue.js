/**
 * Add 'Shipping Label Print' button to Item Page
 *
 * Script ID: customscript_printshippinglabel
 * Script Type: User Event
 * Deployed to: Item Fulfilment
 *
 */

function beforeload(type, form) {
  if (type == 'view') {
    var script =
      "window.open(nlapiResolveURL('SUITELET', 'customscript_shippinglabel', 'customdeploy_shippinglabel') + '&custom_id=' + nlapiGetRecordId());";
    form.addButton('custpage_printshippinglabel', 'Screen Shipping labels', script);
  }
}