// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateFields();
    
    // Update IPtabels Settings button click
    $('#BtnUpdatefirewallSettings').on('click', UpdatefirewallSettings);
    // Restart AP Service button click
    $('#BtnRestartfirewall').on('click', Restartfirewall);

});

// Functions =============================================================

// Fill table with data
function populateFields() {
    // jQuery AJAX call for JSON
    $.getJSON( '/admin/firewall/getsettings', function( data ) {
        //console.log('---------firewall Settings-----------');
        //console.log(data);

        //Dashboard values update from JSON file
        $( "#firewall_primary_dns" ).val( data.DNS[0].dns1 );
        $( "#firewall_secondary_dns" ).val( data.DNS[0].dns2 );      
    });
};


// Update WPA Settings
function UpdatefirewallSettings() {

    /*App.loader('show');
    setTimeout(function () {
        App.loader('hide');
    }, 3000);*/

    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: firewallSettings,
        url: '/admin/firewall/enableipv4fwd',
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


//  Restart Access Point Service
function Restartfirewall() {
    $.getJSON( '/admin/firewall/restartfirewall', function( data ) {
        console.log(data);
    });
};