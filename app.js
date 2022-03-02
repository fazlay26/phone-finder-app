const toggoleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggoleSearchResult = displayStyle => {
    document.getElementById('phone-container').style.display = displayStyle;
}
const toggoleSinglePhone = displayStyle => {
    document.getElementById('phone-details').style.display = displayStyle;
}
const NoResultsFound = displayStyle => {
    document.getElementById('no-results').style.display = displayStyle;
}
const writeSomething = displayStyle => {
    document.getElementById('write-something').style.display = displayStyle;
}
const mobileFounder = displayStyle => {
    document.getElementById('phone-founder').style.display = displayStyle;
}
const searchPhone = () => {
    toggoleSpinner('block')
    toggoleSearchResult('none')
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    //console.log(searchFieldText)
    // remove searchText
    searchField.value = '';

    if (searchFieldText == '') {
        writeSomething('block')
        toggoleSpinner('none')
        NoResultsFound('none')

    }
    else {
        writeSomething('none')
        NoResultsFound('none')
    }

    // loadData
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneResult(data.data))
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = ''

}
// displayData
const displayPhoneResult = phones => {
    console.log(phones)

    const phoneContainer = document.getElementById('phone-container');
    // remove previous result
    phoneContainer.innerHTML = ''
    //if any phones are not in array
    if (!phones.length) {


        NoResultsFound('block')
        mobileFounder('none')
        //writeSomething('block')

    }
    else {

        NoResultsFound('none')
        //writeSomething('none')
        mobileFounder('block')

    }
    const phoneFounder = document.getElementById('phone-founder');
    phoneFounder.innerHTML = ''
    const p = document.createElement('p');
    p.innerHTML = `<p>${phones.slice(0, 20).length} phones Found</p> `;
    phoneFounder.appendChild(p);



    phones.slice(0, 20)?.forEach(phone => {
        //console.log(phone)

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
                <h5>Brand:${phone.brand}</h5>
                <button onclick="phoneDetails('${phone.slug}')" class=" btn-primary text-light rounded">Details</button>
        </div>

    </div>`;
        phoneContainer.appendChild(div)

    })
    toggoleSpinner('none');
    toggoleSearchResult('flex')

}
// load single phone details
const phoneDetails = detail => {
    //console.log(detail)
    const url = `https://openapi.programming-hero.com/api/phone/${detail}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data))

    toggoleSpinner('block')
}

// display single phoneDetails
const displayPhoneDetail = info => {
    console.log(info)
    toggoleSpinner('block');
    toggoleSinglePhone('none')
    const phoneDetails = document.getElementById('phone-details');
    // remove previous result
    phoneDetails.textContent = ''
    const div = document.createElement('div')
    div.classList.add('card');
    div.innerHTML = `<img src="${info.data.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${info.data.name}</h5>
      <h5 class="card-title">${info.data.releaseDate ? info.data.releaseDate : 'Release Date Not found'}</h5>
      
      <h5>sensors:</h5>
      <ul><li>${info.data.mainFeatures.sensors[0]}</li></ul>
      <ul><li>${info.data.mainFeatures.sensors[1]}</li></ul>
      <ul><li>${info.data.mainFeatures.sensors[2]}</li></ul>
      <ul><li>${info.data.mainFeatures.sensors[3]}</li></ul>
      <ul><li>${info.data.mainFeatures.sensors[4]}</li></ul>
      <ul><li>${info.data.mainFeatures.sensors[5]}</li></ul>
      <h5>Others</h5>
      <ul><li>Bluetooth:${info.data.others ? info.data.others.Bluetooth : 'not available'}</li></ul>
      <ul><li>GPS:${info.data.others ? info.data.others.GPS : 'not available'}</li></ul>
      <ul><li>NFC:${info.data.others ? info.data.others.NFC : 'not available'}</li></ul>
      <ul><li>Radio:${info.data.others ? info.data.others.Radio : 'not available'}</li></ul>
      <ul><li>USB:${info.data.others ? info.data.others.USB : 'not available'}</li></ul>
      <ul><li>WLAN:${info.data.others ? info.data.others.WLAN : 'not available'}</li></ul>
      <ul><li>WLAN:${info.data.others ? info.data.others.WLAN : 'not available'}</li></ul>
      

      <h5>Chipset</h5>
      <p>${info.data.mainFeatures.chipSet}</p>

      
      <h5>Display Size</h5>
      <p>${info.data.mainFeatures.displaySize}</p>
      <h5>Memory</h5>
      <p>${info.data.mainFeatures.memory}</p>
      <h5>Storage</h5>
      <p>${info.data.mainFeatures.storage}</p>
    </div>`;
    phoneDetails.appendChild(div);
    toggoleSpinner('none')
    toggoleSinglePhone('block')

}
