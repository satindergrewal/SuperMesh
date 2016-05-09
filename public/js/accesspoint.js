// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateFields();
    
    //Testing if populate Channels from JSON files work
    //populateCountryCodes('US');
    //populateACChannels('36');
    //populateBgnChannels('5');
    
    // Udate AP Settings button click
    $('#BtnUpdateAPSettings').on('click', UpdateAPSettings);
    // Restart AP Service button click
    $('#BtnRestartAP').on('click', RestartAP);

    //Update AP input values on 802.11bgn/802.11ac options selection change
    $('input[type=radio][name=ap_bgn_ac]').change(function() {
        if (this.value == 'bgn') {
            $('#ap_driver option[value="rtl871xdrv"]').attr('selected','selected');
            populateBgnChannels('5');
        }
        else if (this.value == 'ac') {
            $('#ap_driver option[value="nl80211"]').attr('selected','selected');
            populateACChannels('44');
        }
    });

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


// Update WPA Settings
function UpdateAPSettings() {

    /*App.loader('show');
    setTimeout(function () {
        App.loader('hide');
    }, 3000);*/

    //console.log($('#ap_ssid').val());
    //console.log($('#ap_country').val());
    //console.log($('#ap_pass').val());
    //console.log($('#ap_driver').val());
    //console.log($('input[name=ap_bgn_ac]:checked').val());
    //console.log($('#ap_channel').val());

    //event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    /*$('#FormNetSettings input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });*/

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var APSettings = {
            'ap_ssid': $('#ap_ssid').val(),
            'ap_country': $('#ap_country').val(),
            'ap_pass': $('#ap_pass').val(),
            'ap_driver': $('#ap_driver').val(),
            'ap_bgn_ac': $('input[name=ap_bgn_ac]:checked').val(),
            'ap_channel': $('#ap_channel').val()
        }

        console.log(APSettings);

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: APSettings,
            url: '/admin/accesspoint/update',
            dataType: 'html',
            success: function(data, textStatus, jqXHR) {
                var APData = JSON.parse(data);
                console.log(APData);

                if (APData.msg === 'success') {
                    console.log('Success');
                    swal("Success", "Access Point Settings Saved.", "success");

                    // Populate IP Info
                    //populateIPInfo();
                }
                else {
                    // If something goes wrong, alert the error message that our service returned
                    swal("Oops...", "Something went wrong!", "error");
                }
            },
            error: function(xhr, textStatus, error) {
                console.log('failure');
                console.log(xhr.statusText);
                console.log(textStatus);
                console.log(error);
                swal("Oops...", "Something went wrong!", "error");
                
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};


//  Restart Access Point Service
function RestartAP() {
    $.getJSON( '/admin/accesspoint/restartap', function( data ) {
        console.log(data);
    });
};