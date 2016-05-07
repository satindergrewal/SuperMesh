// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateFields();

});

// Functions =============================================================

// Fill table with data
function populateFields() {


    // jQuery AJAX call for JSON
    $.getJSON( '/admin/accesspoint/getsettings', function( data ) {

        $.each(data, function(index){
            console.log('---------AP Settings-----------');
            //console.log(this.country);
            //console.log(this.iso2);

            //console.log(index);

        // Inject the whole content string into our existing HTML table
        //$('#wifilist tbody').html(tableContent);
        //console.log(tableContent);

        });
        console.log(data);
        //console.log(data[0]);
    });

	// Empty content string
    var CountryCodeList = '';
    var CountryCodeSelected = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/assets/country_codes.json', function( data ) {

        $.each(data, function(index){
            //console.log('--------------------');
            //console.log(this.country);
            //console.log(this.iso2);

            //console.log(index);

            if (this.iso2 === 'US') {
            	CountryCodeSelected = 'selected'
            } else {
            	CountryCodeSelected = ''
            }

			CountryCodeList += '<option value="' + this.iso2 + '" ' + CountryCodeSelected + '>' + this.iso2 + ': ' + this.country + '</option>';
            //<option value="1">Option #1</option>

        // Inject the whole content string into our existing HTML table
        $('#ap_country').html(CountryCodeList);
        //console.log(tableContent);

        });
        //console.log(data);
        //console.log(data[0]);
    });
};