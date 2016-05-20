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
        console.log(data);

        //Get wlan0 JSON data and populate form fields
        $( "#wlan0_dhcpd_primary_dns" ).val( data.DNS[0].dns1 );
        $( "#wlan0_dhcpd_subnet" ).val( data.wlan0_Subnet );
        $( "#wlan0_dhcpd_broadcast_addr" ).val( data.wlan0_BroadcastAddr );
        $( "#wlan0_dhcpd_netmask" ).val( data.wlan0_Netmask );
        $( "#wlan0_dhcpd_range_start" ).val( data.wlan0_Range[0].start );
        $( "#wlan0_dhcpd_range_end" ).val( data.wlan0_Range[0].end );
        $( "#wlan0_dhcpd_primary_router" ).val( data.Routers[0].router1 );

        //Get eth1 JSON data and populate form fields
        $( "#eth1_dhcpd_primary_dns" ).val( data.DNS[0].dns2 );
        $( "#eth1_dhcpd_subnet" ).val( data.eth1_Subnet );
        $( "#eth1_dhcpd_broadcast_addr" ).val( data.eth1_BroadcastAddr );
        $( "#eth1_dhcpd_netmask" ).val( data.eth1_Netmask );
        $( "#eth1_dhcpd_range_start" ).val( data.eth1_Range[0].start );
        $( "#eth1_dhcpd_range_end" ).val( data.eth1_Range[0].end );
        $( "#eth1_dhcpd_primary_router" ).val( data.Routers[0].router2 );
        
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
            'wlan0_dhcpd_primary_dns': $('#wlan0_dhcpd_primary_dns').val(),
            'wlan0_dhcpd_subnet': $('#wlan0_dhcpd_subnet').val(),
            'wlan0_dhcpd_broadcast_addr': $('#wlan0_dhcpd_broadcast_addr').val(),
            'wlan0_dhcpd_netmask': $('#wlan0_dhcpd_netmask').val(),
            'wlan0_dhcpd_range_start': $('#wlan0_dhcpd_range_start').val(),
            'wlan0_dhcpd_range_end': $('#wlan0_dhcpd_range_end').val(),
            'wlan0_dhcpd_primary_router': $('#wlan0_dhcpd_primary_router').val(),
            'eth1_dhcpd_primary_dns': $('#eth1_dhcpd_primary_dns').val(),
            'eth1_dhcpd_subnet': $('#eth1_dhcpd_subnet').val(),
            'eth1_dhcpd_broadcast_addr': $('#eth1_dhcpd_broadcast_addr').val(),
            'eth1_dhcpd_netmask': $('#eth1_dhcpd_netmask').val(),
            'eth1_dhcpd_range_start': $('#eth1_dhcpd_range_start').val(),
            'eth1_dhcpd_range_end': $('#eth1_dhcpd_range_end').val(),
            'eth1_dhcpd_primary_router': $('#eth1_dhcpd_primary_router').val()
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