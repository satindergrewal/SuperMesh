// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateIPInfo();
});

// Functions =============================================================

// Fill table with data
function populateIPInfo() {
    console.log('Populating...')

    // Get public IP
    $.getJSON( '/admin/network/ipinfo', function( data ) {
        $( "#public_ip" ).text( data.ip );
    });

    $.getJSON( '/admin/network/ifconfig', function( data ) {
        console.log(data);
        //$( "#public_ip" ).text( data.ip );
    });
};