// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateFields();
    
    //Testing if populate Channels from JSON files work
    //populateCountryCodes('US');
    //populateACChannels('36');
    //populateBgnChannels('5');

});

// Functions =============================================================

// Fill form with Countr Codes
function populateCountryCodes(getCountryCode) {
    // Empty content string
    var CountryCodeList = '';
    var CountryCodeSelected = '';

    // jQuery AJAX call for Country Codes
    $.getJSON( '/assets/country_codes.json', function( data ) {

        $.each(data, function(index){
            //console.log('--------------------');
            //console.log(this.country);
            //console.log(this.iso2);

            //console.log(index);
            //console.log(getCountryCode);
            if ( this.iso2 == getCountryCode ) {
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
}

// Fill form with AC Channels
function populateACChannels(getACChannel) {
    // Empty content string
    var ACChannelList = '';
    var ACChannelSelected = '';

    // jQuery AJAX call for AC Channels
    $.getJSON( '/assets/802_11ac_channels.json', function( data ) {

        $.each(data, function(index){
            //console.log('---------- AC Channels ----------');
            //console.log(this.ac_channel);

            //console.log(index);
            //console.log(getACChannel);
            if ( this.ac_channel == getACChannel ) {
                ACChannelSelected = 'selected'
            } else {
                ACChannelSelected = ''
            }

            ACChannelList += '<option value="' + this.ac_channel + '" ' + ACChannelSelected + '>' + this.ac_channel + '</option>';
            //<option value="1">Option #1</option>

        // Inject the whole content string into our existing HTML table
        $('#ap_channel').html(ACChannelList);
        //console.log(tableContent);

        });
        //console.log(data);
        //console.log(data[0]);
    });
}

// Fill form with bgn Channels
function populateBgnChannels(getBgnChannel) {
    // Empty content string
    var BgnChannelList = '';
    var BgnChannelSelected = '';

    // jQuery AJAX call for AC Channels
    $.getJSON( '/assets/802_11bgn_channels.json', function( data ) {

        $.each(data, function(index){
            //console.log('---------- Bgn Channels ----------');
            //console.log(this.bgn_channel);

            //console.log(index);
            //console.log(getBgnChannel);
            //console.log(this.bgn_channel);
            if ( this.bgn_channel == getBgnChannel ) {
                //console.log(this.bgn_channel);
                BgnChannelSelected = 'selected'
            } else {
                //console.log(this.bgn_channel);
                BgnChannelSelected = ''
            }
            //console.log(BgnChannelSelected);

            BgnChannelList += '<option value="' + this.bgn_channel + '" ' + BgnChannelSelected + '>' + this.bgn_channel + '</option>';
            //<option value="1">Option #1</option>

        // Inject the whole content string into our existing HTML table
        $('#ap_channel').html(BgnChannelList);
        //console.log(tableContent);

        });
        //console.log(data);
        //console.log(data[0]);
    });
}

// Fill table with data
function populateFields() {
    // jQuery AJAX call for JSON
    $.getJSON( '/admin/accesspoint/getsettings', function( data ) {
        //console.log('---------AP Settings-----------');
        //console.log(data.AP_SSID);
        //console.log(data.AP_Password);
        //console.log(data.AP_Driver);
        //console.log(data.Country_Code);
        //console.log(data);

        //Dashboard values update from JSON file
        $( "#ap_ssid_dash" ).text( data.AP_SSID );
        $( "#ap_password_dash" ).text( data.AP_Password );
        if (data.AP_802_11n_Enabled_Disabled === '# ') {
            $( "#ap_channel_dash" ).text( data.AP_802_11AC_Channel );
            $( "#ap_ieee_dash" ).text( '802.11ac' );
        } else if (data.AP_802_11AC_Enabled_Disabled === '# ') {
            $( "#ap_channel_dash" ).text( data.AP_802_11n_Channel );
            $( "#ap_ieee_dash" ).text( '802.11bgn' );
        }

        //Form Fields values update from JSON file
        if (data.AP_802_11n_Enabled_Disabled === '# ') {
            $( "#ap_ac" ).prop( "checked", true );
            populateACChannels(data.AP_802_11AC_Channel);
            //console.log(data.AP_802_11AC_Channel);
            //$('#ap_channel option[value=' + data.AP_802_11AC_Channel + ']').attr('selected','selected');
        } else if (data.AP_802_11AC_Enabled_Disabled === '# ') {
            $( "#ap_bgn" ).prop( "checked", true );
            populateBgnChannels( data.AP_802_11n_Channel );
            //console.log(data.AP_802_11n_Channel);
            //$('#ap_channel option[value=' + data.AP_802_11n_Channel + ']').attr('selected','selected');
        }
        $( "#ap_ssid" ).val( data.AP_SSID );
        $( "#ap_pass" ).val( data.AP_Password );
        populateCountryCodes( data.Country_Code );
        $('#ap_driver option[value=' + data.AP_Driver + ']').attr('selected','selected');
    });
};