function initialise() {
    RetrieveData();
    setInterval(RetrieveData, 15000);
}

function DisplayResults (Results) {      
    console.log(Results)
//     document.getElementById('SortedRegionsList').innerHTML = Results.slice(0, 5).map(function(Region) {
//     return `<li>${Region.zoneID}</li>`;
//     }).join('');
}

function RetrieveData() {
    console.log('Retrieving Data')
    const url = 'http://Public-Analyse-CAB432-456363383.ap-southeast-2.elb.amazonaws.com/data';

    let request = new XMLHttpRequest();

    request.open("GET", url, true);
    request.onreadystatechange = function () { // Callback for request
        if (request.readyState === 4 && request.status === 200) {
            DisplayResults(JSON.parse(request.responseText)); // Display results to user
        }
    };
    request.send(null);
}