window.addEventListener('DOMContentLoaded', function() {
  var format = 'json'; // Specify the desired format of the response

  var getLocationBtn = document.getElementById('search-btn');
  getLocationBtn.addEventListener('click', getLocation);

  var clearBtn = document.getElementById('clear-btn');
  clearBtn.addEventListener('click', clearLocation);

  function getLocation() {
    var ipInput = document.getElementById('ip-input');
    var fieldSelect = document.getElementById('field-select');
    var ip = ipInput.value;
    var field = fieldSelect.value;

    if (validateIP(ip)) {
      var apiUrl = 'https://ipapi.co/' + ip + '/' + format + '/';
      
      fetch(apiUrl)
        .then(function(response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error: ' + response.status);
          }
        })
        .then(function(data) {
          console.log(data);
          var additionalInfo = {
            version: data.version,
            city: data.city,
            region: data.region,
            region_code: data.region_code,
            country_code: data.country_code,
            country_code_iso3: data.country_code_iso3
          };

          displayLocationInfo(data, additionalInfo);
        })
        .catch(function(error) {
          handleErrors(error);
        });
    } else {
      console.error('Invalid IP address');
    }
  }

  function validateIP(ip) {
    var ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
    return ipRegex.test(ip);
  }

  function displayLocationInfo(data, additionalInfo) {
    var locationInfo = document.getElementById('location-info');
    var infoHTML = `
      <p><strong>${data.field}:</strong> ${data.value}</p>
      <p><strong>Version:</strong> ${additionalInfo.version}</p>
      <p><strong>City:</strong> ${additionalInfo.city}</p>
      <p><strong>Region:</strong> ${additionalInfo.region}</p>
      <p><strong>Region Code:</strong> ${additionalInfo.region_code}</p>
      <p><strong>Country Code:</strong> ${additionalInfo.country_code}</p>
      <p><strong>Country Code ISO3:</strong> ${additionalInfo.country_code_iso3}</p>
    `;
    locationInfo.innerHTML = infoHTML;
  }

  function clearLocation() {
    var locationInfo = document.getElementById('location-info');
    locationInfo.innerHTML = '';
  }

  function handleErrors(error) {
    var locationInfo = document.getElementById('location-info');
    locationInfo.innerHTML = '';

    if (error.message.startsWith('Error:')) {
      locationInfo.innerText = 'An error occurred while fetching the data. Please try again later.';
    } else {
      locationInfo.innerText = 'An error occurred. Please check your input and try again.';
    }
  }
});