// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateFields();
    
    // Update IPtabels Settings button click
    $('#BtnUpdateFirewallSettings').on('click', UpdatefirewallSettings);

});

// Functions =============================================================

// Fill table with data
function populateFields() {
    // jQuery AJAX call for JSON
    $.getJSON( '/admin/firewall/getsettings', function( data ) {
        //console.log('---------firewall Settings-----------');
        console.log(data);

        //Set IPv4 Forwarding settings
        if ( data.ipv4fwd === '0\n' ) {
            $( "#iptables4_enable_disable" ).prop( "checked", false );
        } else if ( data.ipv4fwd === '1' ) {
            $( "#iptables4_enable_disable" ).prop( "checked", true );
        }

        //Set IPv6 Forwarding settings
        if ( data.ipv6fwd === '0\n' ) {
            $( "#iptables6_enable_disable" ).prop( "checked", false );
        } else if ( data.ipv6fwd === '1' ) {
            $( "#iptables6_enable_disable" ).prop( "checked", true );
        }
    });
};


// Update WPA Settings
function UpdatefirewallSettings() {

    /*App.loader('show');
    setTimeout(function () {
        App.loader('hide');
    }, 3000);*/

    var firewallSettings = {
            'iptables4_enable_disable': $('#iptables4_enable_disable').is(':checked'),
            'iptables6_enable_disable': $('#iptables6_enable_disable').is(':checked')
        }


    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: firewallSettings,
        url: '/admin/firewall/update',
        dataType: 'html',
        success: function(data, textStatus, jqXHR) {
            var APData = JSON.parse(data);
            console.log(APData);

            if (APData.msg === 'success') {
                console.log('Success');
                swal("Success", "firewall Settings Saved.", "success");

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
    
};