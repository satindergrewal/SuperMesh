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
        $( "#public_ip_status" ).text( 'Online' );
        $( "#public_ip_div" ).removeClass( "text-danger" ).addClass( "text-success" );
        $( "#public_ip_icon" ).removeClass( "fa fa-times-circle" ).addClass( "fa fa-check-circle" );
    });

    $.getJSON( '/admin/network/ifconfig', function( data ) {
        console.log(data);
        //$( "#public_ip" ).text( data.ip );

        for (i = 0; i < data.length; i++) {
            //console.log(data[i]);

            if ( data[i].interface === 'eth0' ) {
                $( "#lan_ip" ).text( data[i].ipv4_address );
            }

            if ( data[i].interface === 'wlan1' ) {
                $( "#wan_ip" ).text( data[i].ipv4_address );
            }
        }
    });
};