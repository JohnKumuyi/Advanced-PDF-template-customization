function PageInit()
{
    return;
    var orderStatus = nlapiGetFieldText('orderstatus');
    if (orderStatus == "Pending Approval")
    {
        var createPO = nlapiGetFieldText('custbody55');
        var lineCount = nlapiGetLineItemCount('item') * 1;
        for (var i = 1; i <= lineCount; i ++) {
             nlapiSelectLineItem('item', i);
             setLineValue(createPO);
             nlapiCommitLineItem('item');  
        }
    }
}

function ValidateLine(type, name)
{
    return true;
    if (type == 'item') {
        var orderStatus = nlapiGetFieldText('orderstatus');
        if (orderStatus == "Pending Approval")
        {
            var createPO = nlapiGetFieldText('custbody55');
            setLineValue(createPO);
        }
    }

    return true;
}

function FieldChanged(name, type)
{
    if (type == 'custbody55') {
  //      alert('custbody55');
  //      return;
        var orderStatus = nlapiGetFieldText('orderstatus');
        if (orderStatus == "Pending Approval")
        {
            var createPO = nlapiGetFieldText('custbody55');
            var lineCount = nlapiGetLineItemCount('item') * 1;
            for (var i = 1; i <= lineCount; i ++) {
                 nlapiSelectLineItem('item', i);
                 setLineValue(createPO);
                 nlapiCommitLineItem('item');  
            }
        }
    }
}

function setLineValue(createPO)
{
    if (createPO == 'Drop Shipment') {
        var poVendor = nlapiGetCurrentLineItemValue('item', 'povendor');
        if (poVendor) {
            nlapiSetCurrentLineItemValue('item', 'createwo', 'F');
            nlapiSetCurrentLineItemText('item', 'createpo', 'Drop Shipment');    
        } else {
            clearFlags();
        }
    } else if (createPO == 'Special Order') {
        var poVendor = nlapiGetCurrentLineItemValue('item', 'povendor');
        if (poVendor) {
            nlapiSetCurrentLineItemValue('item', 'createwo', 'F');
            nlapiSetCurrentLineItemText('item', 'createpo', 'Special Order');    
        } else {
            clearFlags();
        }
    } else if (createPO == 'Create WO') {
        var itemId = nlapiGetCurrentLineItemValue('item', 'item');
        if (itemId && IsAssembly(itemId)) {
            nlapiSetCurrentLineItemValue('item', 'createwo', 'T');
            nlapiSetCurrentLineItemText('item', 'createpo', '');
        } else {
            clearFlags();
        }
    } else {
        clearFlags();    
    }
}

function clearFlags()
{
    nlapiSetCurrentLineItemValue('item', 'createwo', 'F');
    nlapiSetCurrentLineItemText('item', 'createpo', '');
}

function IsAssembly(itemId)
{
    var filters = [];
    filters.push(new nlobjSearchFilter('internalid', null, 'is', itemId));
    var searchResult = nlapiSearchRecord('item', null, filters, null);
    if (searchResult) {
        var element = searchResult[0];
        var recordType = element.getRecordType();
        if (recordType == 'assemblyitem') {
            return 1;
        }
    }
    return 0;
}