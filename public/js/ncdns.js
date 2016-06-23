// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateFields();
    
    // Update IPtabels Settings button click
    $('#BtnUpdateNCDNSSettings').on('click', UpdateNCDNSSettings);
    $('#BtnRestartNCDNSService').on('click', RestartNCDNSService);

});

// Functions =============================================================

// Fill table with data
function populateFields() {
    // jQuery AJAX call for JSON
    $.getJSON( '/admin/ncdns/getsettings', function( data ) {
        //console.log('---------firewall Settings-----------');
        //console.log(data);

        //Set NCDNS Service settings
        /*if ( data[1].enable_ncdns_service === "true" ) {
            $( "#enable_ncdns_service" ).prop( "checked", true );
        } else if ( data[1].enable_ncdns_service === "false" ) {
            $( "#enable_ncdns_service" ).prop( "checked", false );
        }
        $( "#rpc_user" ).val( data[0].rpcuser );
        $( "#rpc_pass" ).val( data[0].rpcpass );*/
    });
};


// Update NCDNS Settings
function UpdateNCDNSSettings() {


    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'POST',
        //data: NMCSettings,
        url: '/admin/ncdns/update',
        dataType: 'html',
        success: function(data, textStatus, jqXHR) {
            var NCDNSData = JSON.parse(data);
            //console.log(NCDNSData);

            if (NCDNSData.msg === 'success') {
                console.log('Success');
                swal("Success", "NCDNS Settings Saved.", "success");

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

function RestartNCDNSService() {
    console.log('==> Restarting NCDNS Service...');
    $.getJSON( '/admin/ncdns/restartncdns', function( data ) {
        //console.log(data);
        if (data.msg === 'success') {
            //console.log('Success');
            swal("Success", "NCDNS Service Restarted.", "success");

            populateFields();
        }
        else {
            // If something goes wrong, alert the error message that our service returned
            swal("Oops...", "Something went wrong!", "error");
        }
    });
}