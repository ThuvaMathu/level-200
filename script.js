
// TODO: Modify this function
function generateShortCode(storeId, transactionId) {
  // Logic goes here
  const code = "A".charCodeAt(0);
  var charArr = [];
  var storeIdArr = [...(storeId + "")].map(Number);
  var transactionIdArr = [...(transactionId + "")].map(Number);
  if (storeIdArr.length < 3) {
    for (let i = storeIdArr.length; i < 3; i++) {
      charArr.push("A");
    }
  }
  var totalArr = storeIdArr.concat(transactionIdArr);
  totalArr.forEach((x) => {
    charArr.push(String.fromCharCode(code + x));
  });
  var d = charArr.join("");
  return d;
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
  // Logic goes here
  var storeArr = [];
  var tranArr = [];
  var storeValue = [];
var tranValue = [];
    
  var shortCodeArr = shortCode.split("");
  for (let i = 0; i < shortCodeArr.length; i++) {
    if (i < 3) storeArr.push(shortCodeArr[i]);
    else tranArr.push(shortCodeArr[i]);
  }
  storeArr.forEach((charCode) => {
    storeValue.push(charCode.charCodeAt(0) - 65);
  });
  tranArr.forEach((charCode) => {
    tranValue.push(charCode.charCodeAt(0) - 65);
  });
  return {
    storeId: parseInt(storeValue.join("")), // store id goes here,
    shopDate: new Date(), // the date the customer shopped,
    transactionId: parseInt(tranValue.join("")), // transaction id goes here
  };
}

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {
  var storeIds = [175, 42, 0, 9];
  var transactionIds = [9675, 23, 123, 7];

  storeIds.forEach(function (storeId) {
    transactionIds.forEach(function (transactionId) {
      var shortCode = generateShortCode(storeId, transactionId);
      var decodeResult = decodeShortCode(shortCode);
      $("#test-results").append(
        "<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>"
      );
      AddTestResult("Length <= 9", shortCode.length <= 9);
      AddTestResult("Is String", typeof shortCode === "string");
      AddTestResult("Is Today", IsToday(decodeResult.shopDate));
      AddTestResult("StoreId", storeId === decodeResult.storeId);
      AddTestResult("TransId", transactionId === decodeResult.transactionId);
    });
  });
}

function IsToday(inputDate) {
  // Get today's date
  var todaysDate = new Date();
  // call setHours to take the time out of the comparison
  return inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0);
}

function AddTestResult(testName, testResult) {
  var div = $("#test-results").append(
    "<div class='" +
      (testResult ? "pass" : "fail") +
      "'><span class='tname'>- " +
      testName +
      "</span><span class='tresult'>" +
      testResult +
      "</span></div>"
  );
}
