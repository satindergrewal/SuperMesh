// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateFields();
    
    // Update IPtabels Settings button click
    $('#BtnUpdatePDNSRSettings').on('click', UpdatefirewallSettings);

});

// Functions =============================================================

// Fill table with data
function populateFields() {
    // jQuery AJAX call for JSON
    $.getJSON( '/admin/dnsserver/getsettings', function( data ) {
        //console.log('---------PowerDNS Recursor Settings-----------');
        //console.log(data);

        //Set .onion dns settings
        if ( data.onion_enable_disable === true ) {
            $( "#onion_enable_disable" ).prop( "checked", true );
        } else if ( data.onion_enable_disable === false ) {
            $( "#onion_enable_disable" ).prop( "checked", false );
        }

        //Set .bit dns settings
        if ( data.bit_enable_disable === true ) {
            $( "#bit_enable_disable" ).prop( "checked", true );
        } else if ( data.bit_enable_disable === false ) {
            $( "#bit_enable_disable" ).prop( "checked", false );
        }

        //Set .eth dns settings
        if ( data.eth_enable_disable === true ) {
            $( "#eth_enable_disable" ).prop( "checked", true );
        } else if ( data.eth_enable_disable === false ) {
            $( "#eth_enable_disable" ).prop( "checked", false );
        }

        //Set .p2p dns settings
        if ( data.p2p_enable_disable === true ) {
            $( "#p2p_enable_disable" ).prop( "checked", true );
        } else if ( data.p2p_enable_disable === false ) {
            $( "#p2p_enable_disable" ).prop( "checked", false );
        }
    });
};


// Update WPA Settings
function UpdatefirewallSettings() {

    /*App.loader('show');
    setTimeout(function () {
        App.loader('hide');
    }, 3000);*/

    var pdnsSettings = {
            'onion_enable_disable': $('#onion_enable_disable').is(':checked'),
            'bit_enable_disable': $('#bit_enable_disable').is(':checked'),
            'eth_enable_disable': $('#eth_enable_disable').is(':checked'),
            'p2p_enable_disable': $('#p2p_enable_disable').is(':checked')
        }


    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        data: pdnsSettings,
        url: '/admin/dnsserver/update',
        dataType: 'html',
        success: function(data, textStatus, jqXHR) {
            var pdnsData = JSON.parse(data);
            console.log(pdnsData);

            if (pdnsData.msg === 'success') {
                console.log('Success');
                swal("Success", "PowerDNS Recursor Settings Saved.", "success");

                // Populate field data
                populateFields();
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