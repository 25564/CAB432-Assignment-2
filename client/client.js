function initialise() {
    RetrieveData();
    setInterval(RetrieveData, 15000);
}

function DisplayResults (Results) {      
    console.log(Results);

    document.getElementById('PositiveWordList').innerHTML = Results[0].map(function(Word) {
        return `<li><p>${Word.noun}</p></li>`;
    }).join('');

    document.getElementById('NegativeWordList').innerHTML = Results[1].map(function(Word) {
        return `<li><p>${Word.noun}</p></li>`;
    }).join('');
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