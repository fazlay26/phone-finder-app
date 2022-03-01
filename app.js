const NoResultsFound = displayStyle => {
    document.getElementById('no-results').style.display = displayStyle;
}
const writeSomething = displayStyle => {
    document.getElementById('write-something').style.display = displayStyle;
}

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    //console.log(searchFieldText)
    // remove searchText
    searchField.value = '';

    if (searchFieldText == '') {
        writeSomething('block')
        //toggoleSpinner('none')

    }
    else {
        writeSomething('none')
    }

    // loadData
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneResult(data.data))

}
// displayData
const displayPhoneResult = phones => {
    //console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    // remove previous result
    phoneContainer.textContent = ''
    // if (!phones) {
    //     console.log('nai')
    //     NoResultsFound('block')

    // }
    // else {
    //     NoResultsFound('none')
    // }

    for (const phone of phones) {
        //console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = ` <div class="card">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
                <h5>Brand:${phone.brand}</h5>
                <button onclick="phoneDetails('${phone.slug}')" class="btn-warning text-light">Details</button>
        </div>

    </div>`;
        phoneContainer.appendChild(div)

    }
}
// load single phone details
const phoneDetails = detail => {
    //console.log(detail)
    const url = `https://openapi.programming-hero.com/api/phone/${detail}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data))
}
// display single phoneDetails
const displayPhoneDetail = info => {
    console.log(info)
    const phoneDetails = document.getElementById('phone-details');
    // remove previous result
    phoneDetails.textContent = ''
    const div = document.createElement('div')
    div.classList.add('card');
    div.innerHTML = `<img src="${info.data.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${info.data.releaseDate ? info.data.releaseDate : 'Release Date Not found'}</h5>
      <h5 class="card-title">${info.data.name}</h5>

      <h5>sensors:</h5>
      <ul><li>${info.data.mainFeatures.sensors[0]}</li></ul>
      <ul><li>${info.data.mainFeatures.sensors[1]}</li></ul>
      <ul><li>${info.data.mainFeatures.sensors[2]}</li></ul>
      <ul><li>${info.data.mainFeatures.sensors[3]}</li></ul>
      <ul><li>${info.data.mainFeatures.sensors[4]}</li></ul>
      <ul><li>${info.data.mainFeatures.sensors[5]}</li></ul>
      <h5>Display Size</h5>
      <p>${info.data.mainFeatures.displaySize}</p>
      <h5>Memory</h5>
      <p>${info.data.mainFeatures.memory}</p>
      <h5>Storage</h5>
      <p>${info.data.mainFeatures.storage}</p>



    </div>`;
    phoneDetails.appendChild(div);

}