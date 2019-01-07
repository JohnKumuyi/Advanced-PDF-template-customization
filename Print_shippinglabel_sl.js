/**
 * Suitelet to print Shipping Labels
 *
 * Script ID: customscript_shippinglabels_sl
 * Script Type: Suitelet
 *
 */

function suitelet(request, response) {
  var xml = '';
  try {
    var id = request.getParameter('custom_id');
    if (!id) {
      response.write('custom_id parameter missing');
    }

    var record = nlapiLoadRecord('itemfulfillment', id);
    var subsidiary = record.getFieldValue('subsidiary');
    var subsidiaryRecord = nlapiLoadRecord('subsidiary', subsidiary);
       
    var renderer = nlapiCreateTemplateRenderer();
    var template = nlapiLoadFile('SuiteScripts/shippinglabel.xml');
    renderer.setTemplate(template.getValue());
    renderer.addRecord('record', record);
    renderer.addRecord('subsidiary', subsidiaryRecord);
    xml = renderer.renderToString();
    
    var pattern = /media\.nl\?[a-zA-Z0-9&=\/_-]+"/g;

    xml = xml.replace( pattern, function replacer(match){
       return match.replace(/&/g, '&amp;')
    } );

    
    var pdf = nlapiXMLToPDF(xml);
    response.setContentType('PDF', 'shippinglabel.pdf', 'inline');
    response.write(pdf.getValue());
  } catch (err) {
    response.write(err + ' (line number: ' + err.lineno + ')\nxml: \n' + xml);
    return;
  }
}