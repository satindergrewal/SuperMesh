// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateFields();
    
    //Testing if populate Channels from JSON files work
    //populateCountryCodes('US');
    //populateACChannels('36');
    //populateBgnChannels('5');
    
    // Udate AP Settings button click
    $('#BtnUpdateDhcpdSettings').on('click', UpdateDHCPDSettings);
    // Restart AP Service button click
    $('#BtnRestartDhcpd').on('click', RestartDhcpd);

});

// Functions =============================================================

// Fill table with data
function populateFields() {
    // jQuery AJAX call for JSON
    $.getJSON( '/admin/dhcpd/getsettings', function( data ) {
        //console.log('---------DHCPD Settings-----------');
        //console.log(data.DNS[0].dns1);
        //console.log(data.AP_Password);
        //console.log(data.AP_Driver);
        //console.log(data.Country_Code);
        //console.log(data);

        //Dashboard values update from JSON file
        $( "#wlan0_dhcpd_primary_dns" ).val( data.DNS[0].dns1 );
        $( "#wlan0_dhcpd_subnet" ).val( data.Subnet );
        $( "#wlan0_dhcpd_netmask" ).val( data.Netmask );
        $( "#wlan0_dhcpd_range_start" ).val( data.Range[0].start );
        $( "#wlan0_dhcpd_range_end" ).val( data.Range[0].end );
        $( "#wlan0_dhcpd_primary_router" ).val( data.Routers[0].router1 );
        $( "#wlan0_dhcpd_secondary_router" ).val( data.Routers[0].router2 );        
    });
};


// Update WPA Settings
function UpdateDHCPDSettings() {

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
        var DHCPDSettings = {
            'dhcpd_primary_dns': $('#dhcpd_primary_dns').val(),
            'dhcpd_secondary_dns': $('#dhcpd_secondary_dns').val(),
            'dhcpd_subnet': $('#dhcpd_subnet').val(),
            'dhcpd_netmask': $('#dhcpd_netmask').val(),
            'dhcpd_range_start': $('#dhcpd_range_start').val(),
            'dhcpd_range_end': $('#dhcpd_range_end').val(),
            'dhcpd_primary_router': $('#dhcpd_primary_router').val(),
            'dhcpd_secondary_router': $('#dhcpd_secondary_router').val()
        }

        //console.log(DHCPDSettings);

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: DHCPDSettings,
            url: '/admin/dhcpd/update',
            dataType: 'html',
            success: function(data, textStatus, jqXHR) {
                var APData = JSON.parse(data);
                console.log(APData);

                if (APData.msg === 'success') {
                    console.log('Success');
                    swal("Success", "DHCPD Settings Saved.", "success");

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
function RestartDhcpd() {
    $.getJSON( '/admin/dhcpd/restartdhcpd', function( data ) {
        console.log(data);
    });
};