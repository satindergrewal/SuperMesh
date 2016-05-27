// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateIPInfo();

/*
    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // Delete User link click
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
*/

    // Udate Network Settings button click
    $('#BtnUpdateNetSettings').on('click', UpdateNetSettings);
    $('#BtnRestartNetSettings').on('click', UpdateNetSettings);

    //Update LAN0 input values on DHCP/Static options selection change
    $('input[type=radio][name=eth0_dhcp_satic]').change(function() {
        if (this.value == 'dhcp') {
            $( "#eth0_dhcp" ).prop( "checked", true );
            /*$( "#eth0_addr" ).val('');
            $( "#eth0_netmask" ).val('');
            $( "#eth0_gateway" ).val('');*/
            $( "#eth0_addr" ).prop( "disabled", true );
            $( "#eth0_netmask" ).prop( "disabled", true );
            $( "#eth0_gateway" ).prop( "disabled", true );
        }
        else if (this.value == 'static') {
            $( "#eth0_static" ).prop( "checked", true );
            $( "#eth0_addr" ).prop( "disabled", false );
            $( "#eth0_netmask" ).prop( "disabled", false );
            $( "#eth0_gateway" ).prop( "disabled", false );
        }
    });


    //Update LAN0 input values on Enable/Disable options selection change
    $('input[type=checkbox][id=eth0_enable_disable]').change(function() {
        console.log($( "#eth0_enable_disable" ).is(':checked'));
        if ($( "#eth0_enable_disable" ).is(':checked') == false ) {
            $( "#eth0_addr" ).prop( "disabled", true );
            $( "#eth0_netmask" ).prop( "disabled", true );
            $( "#eth0_gateway" ).prop( "disabled", true );
        }
        else if ($( "#eth0_enable_disable" ).is(':checked') == true ) {
            $( "#eth0_addr" ).prop( "disabled", false );
            $( "#eth0_netmask" ).prop( "disabled", false );
            $( "#eth0_gateway" ).prop( "disabled", false );
        }
    });




    
    //Update WLAN0 input values on DHCP/Static options selection change
    $('input[type=radio][name=wlan0_dhcp_satic]').change(function() {
        if (this.value == 'dhcp') {
            $( "#wlan0_dhcp" ).prop( "checked", true );
            /*$( "#wlan0_addr" ).val('');
            $( "#wlan0_netmask" ).val('');
            $( "#wlan0_gateway" ).val('');*/
            $( "#wlan0_addr" ).prop( "disabled", true );
            $( "#wlan0_netmask" ).prop( "disabled", true );
            $( "#wlan0_gateway" ).prop( "disabled", true );
        }
        else if (this.value == 'static') {
            $( "#wlan0_static" ).prop( "checked", true );
            $( "#wlan0_addr" ).prop( "disabled", false );
            $( "#wlan0_netmask" ).prop( "disabled", false );
            $( "#wlan0_gateway" ).prop( "disabled", false );
        }
    });

    //Update WLAN0 input values on Enable/Disable options selection change
    $('input[type=checkbox][id=wlan0_enable_disable]').change(function() {
        console.log($( "#wlan0_enable_disable" ).is(':checked'));
        if ($( "#wlan0_enable_disable" ).is(':checked') == false ) {
            $( "#wlan0_addr" ).prop( "disabled", true );
            $( "#wlan0_netmask" ).prop( "disabled", true );
            $( "#wlan0_gateway" ).prop( "disabled", true );
        }
        else if ($( "#wlan0_enable_disable" ).is(':checked') == true ) {
            $( "#wlan0_addr" ).prop( "disabled", false );
            $( "#wlan0_netmask" ).prop( "disabled", false );
            $( "#wlan0_gateway" ).prop( "disabled", false );
        }
    });





    //Update LAN1 input values on DHCP/Static options selection change
    $('input[type=radio][name=eth1_dhcp_satic]').change(function() {
        if (this.value == 'dhcp') {
            $( "#eth1_dhcp" ).prop( "checked", true );
            /*$( "#eth1_addr" ).val('');
            $( "#eth1_netmask" ).val('');
            $( "#eth1_gateway" ).val('');*/
            $( "#eth1_addr" ).prop( "disabled", true );
            $( "#eth1_netmask" ).prop( "disabled", true );
            $( "#eth1_gateway" ).prop( "disabled", true );
        }
        else if (this.value == 'static') {
            $( "#eth1_static" ).prop( "checked", true );
            $( "#eth1_addr" ).prop( "disabled", false );
            $( "#eth1_netmask" ).prop( "disabled", false );
            $( "#eth1_gateway" ).prop( "disabled", false );
        }
    });

    //Update LAN1 input values on Enable/Disable options selection change
    $('input[type=checkbox][id=eth1_enable_disable]').change(function() {
        console.log($( "#eth1_enable_disable" ).is(':checked'));
        if ($( "#eth1_enable_disable" ).is(':checked') == false ) {
            $( "#eth1_addr" ).prop( "disabled", true );
            $( "#eth1_netmask" ).prop( "disabled", true );
            $( "#eth1_gateway" ).prop( "disabled", true );
        }
        else if ($( "#eth1_enable_disable" ).is(':checked') == true ) {
            $( "#eth1_addr" ).prop( "disabled", false );
            $( "#eth1_netmask" ).prop( "disabled", false );
            $( "#eth1_gateway" ).prop( "disabled", false );
        }
    });
    




    //Update WLAN1 input values on DHCP/Static options selection change
    $('input[type=radio][name=wlan1_dhcp_satic]').change(function() {
        if (this.value == 'dhcp') {
            $( "#wlan1_dhcp" ).prop( "checked", true );
            /*$( "#wlan1_addr" ).val('');
            $( "#wlan1_netmask" ).val('');
            $( "#wlan1_gateway" ).val('');*/
            $( "#wlan1_addr" ).prop( "disabled", true );
            $( "#wlan1_netmask" ).prop( "disabled", true );
            $( "#wlan1_gateway" ).prop( "disabled", true );
        }
        else if (this.value == 'static') {
            $( "#wlan1_static" ).prop( "checked", true );
            $( "#wlan1_addr" ).prop( "disabled", false );
            $( "#wlan1_netmask" ).prop( "disabled", false );
            $( "#wlan1_gateway" ).prop( "disabled", false );
        }
    });

    //Update WLAN1 input values on Enable/Disable options selection change
    $('input[type=checkbox][id=wlan1_enable_disable]').change(function() {
        console.log($( "#wlan1_enable_disable" ).is(':checked'));
        if ($( "#wlan1_enable_disable" ).is(':checked') == false ) {
            $( "#wlan1_addr" ).prop( "disabled", true );
            $( "#wlan1_netmask" ).prop( "disabled", true );
            $( "#wlan1_gateway" ).prop( "disabled", true );
        }
        else if ($( "#wlan1_enable_disable" ).is(':checked') == true ) {
            $( "#wlan1_addr" ).prop( "disabled", false );
            $( "#wlan1_netmask" ).prop( "disabled", false );
            $( "#wlan1_gateway" ).prop( "disabled", false );
        }
    });

});

window.setInterval(function(){ 
    populateDashboardInfo();
}, 15000);

// Functions =============================================================


// Fill dashboard with data
function populateDashboardInfo() {

    // jQuery AJAX call for JSON
    $.getJSON( '/admin/network/ifconfig', function( data ) {
        console.log(data[0].wlan0);

    });
};

// Fill table with data
function populateIPInfo() {

    // jQuery AJAX call for JSON
    $.getJSON( '/admin/network/getip', function( data ) {
    	//console.log(data[0].wlan0);

        //Enable/Disable and feed eth0 data to form input fields
        if ( data['eth0_iface'] == 'dhcp' ) {
            $( "#eth0_dhcp" ).prop( "checked", true );
            $( "#eth0_addr" ).prop( "disabled", true );
            $( "#eth0_netmask" ).prop( "disabled", true );
            $( "#eth0_gateway" ).prop( "disabled", true );
            $( "#eth0_addr" ).val( data['eth0_addr'] );
            $( "#eth0_netmask" ).val( data['eth0_netmask'] );
            $( "#eth0_gateway" ).val( data['eth0_gateway'] );
        } else {
            $( "#eth0_static" ).prop( "checked", true );
            $( "#eth0_addr" ).val( data['eth0_addr'] );
            $( "#eth0_netmask" ).val( data['eth0_netmask'] );
            $( "#eth0_gateway" ).val( data['eth0_gateway'] );
        }
        if ( data['eth0_enable_disable'] == '# ' ) {
            $( "#eth0_enable_disable" ).prop( "checked", false );
            $( "#eth0_addr" ).prop( "disabled", true );
            $( "#eth0_netmask" ).prop( "disabled", true );
            $( "#eth0_gateway" ).prop( "disabled", true );
        } else {
            $( "#eth0_enable_disable" ).prop( "checked", true );
        }

        //Enable/Disable and feed wlan0 data to form input fields
        if ( data['wlan0_iface'] == 'dhcp' ) {
            $( "#wlan0_dhcp" ).prop( "checked", true );
            $( "#wlan0_addr" ).prop( "disabled", true );
            $( "#wlan0_netmask" ).prop( "disabled", true );
            $( "#wlan0_gateway" ).prop( "disabled", true );
            $( "#wlan0_addr" ).val( data['wlan0_addr'] );
            $( "#wlan0_netmask" ).val( data['wlan0_netmask'] );
            $( "#wlan0_gateway" ).val( data['wlan0_gateway'] );
        } else {
            $( "#wlan0_static" ).prop( "checked", true );
            $( "#wlan0_addr" ).val( data['wlan0_addr'] );
            $( "#wlan0_netmask" ).val( data['wlan0_netmask'] );
            $( "#wlan0_gateway" ).val( data['wlan0_gateway'] );
        }
        if ( data['wlan0_enable_disable'] == '# ' ) {
            $( "#wlan0_enable_disable" ).prop( "checked", false );
            $( "#wlan0_addr" ).prop( "disabled", true );
            $( "#wlan0_netmask" ).prop( "disabled", true );
            $( "#wlan0_gateway" ).prop( "disabled", true );
        } else {
            $( "#wlan0_enable_disable" ).prop( "checked", true );
        }



        //Enable/Disable and feed eth1 data to form input fields
        if ( data['eth1_iface'] == 'dhcp' ) {
            $( "#eth1_dhcp" ).prop( "checked", true );
            $( "#eth1_addr" ).prop( "disabled", true );
            $( "#eth1_netmask" ).prop( "disabled", true );
            $( "#eth1_gateway" ).prop( "disabled", true );
            $( "#eth1_addr" ).val( data['eth1_addr'] );
            $( "#eth1_netmask" ).val( data['eth1_netmask'] );
            $( "#eth1_gateway" ).val( data['eth1_gateway'] );
        } else {
            $( "#eth1_static" ).prop( "checked", true );
            $( "#eth1_addr" ).val( data['eth1_addr'] );
            $( "#eth1_netmask" ).val( data['eth1_netmask'] );
            $( "#eth1_gateway" ).val( data['eth1_gateway'] );
        }
        if ( data['eth1_enable_disable'] == '# ' ) {
            $( "#eth1_enable_disable" ).prop( "checked", false );
            $( "#eth1_addr" ).prop( "disabled", true );
            $( "#eth1_netmask" ).prop( "disabled", true );
            $( "#eth1_gateway" ).prop( "disabled", true );
        } else {
            $( "#eth1_enable_disable" ).prop( "checked", true );
        }

        //Enable/Disable and feed wlan1 data to form input fields
        if ( data['wlan1_iface'] == 'dhcp' ) {
            $( "#wlan1_dhcp" ).prop( "checked", true );
            $( "#wlan1_addr" ).prop( "disabled", true );
            $( "#wlan1_netmask" ).prop( "disabled", true );
            $( "#wlan1_gateway" ).prop( "disabled", true );
            $( "#wlan1_addr" ).val( data['wlan1_addr'] );
            $( "#wlan1_netmask" ).val( data['wlan1_netmask'] );
            $( "#wlan1_gateway" ).val( data['wlan1_gateway'] );
        } else {
            $( "#wlan1_static" ).prop( "checked", true );
            $( "#wlan1_addr" ).val( data['wlan1_addr'] );
            $( "#wlan1_netmask" ).val( data['wlan1_netmask'] );
            $( "#wlan1_gateway" ).val( data['wlan1_gateway'] );
        }
        if ( data['wlan1_enable_disable'] == '# ' ) {
            $( "#wlan1_enable_disable" ).prop( "checked", false );
            $( "#wlan1_addr" ).prop( "disabled", true );
            $( "#wlan1_netmask" ).prop( "disabled", true );
            $( "#wlan1_gateway" ).prop( "disabled", true );
        } else {
            $( "#wlan1_enable_disable" ).prop( "checked", true );
        }

    });
};

// Update Network Settings
function UpdateNetSettings(event) {

    App.loader('show');
    setTimeout(function () {
        App.loader('hide');
    }, 35000);


    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    /*$('#FormNetSettings input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });*/

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var NetworkSettings = {
            'eth0_enable_disable': $('#FormNetSettings #eth0_enable_disable').is(':checked'),
            'eth0_iface': $('#FormNetSettings input:radio[name=eth0_dhcp_satic]:checked').val(),
            'eth0_addr': $('#FormNetSettings #eth0_addr').val(),
            'eth0_netmask': $('#FormNetSettings #eth0_netmask').val(),
            'eth0_gateway': $('#FormNetSettings #eth0_gateway').val(),
            
            'wlan0_enable_disable': $('#FormNetSettings #wlan0_enable_disable').is(':checked'),
            'wlan0_iface': $('#FormNetSettings input:radio[name=wlan0_dhcp_satic]:checked').val(),
            'wlan0_addr': $('#FormNetSettings #wlan0_addr').val(),
            'wlan0_netmask': $('#FormNetSettings #wlan0_netmask').val(),
            'wlan0_gateway': $('#FormNetSettings #wlan0_gateway').val(),
            
            'eth1_enable_disable': $('#FormNetSettings #eth1_enable_disable').is(':checked'),
            'eth1_iface': $('#FormNetSettings input:radio[name=eth1_dhcp_satic]:checked').val(),
            'eth1_addr': $('#FormNetSettings #eth1_addr').val(),
            'eth1_netmask': $('#FormNetSettings #eth1_netmask').val(),
            'eth1_gateway': $('#FormNetSettings #eth1_gateway').val(),
            
            'wlan1_enable_disable': $('#FormNetSettings #wlan1_enable_disable').is(':checked'),
            'wlan1_iface': $('#FormNetSettings input:radio[name=wlan1_dhcp_satic]:checked').val(),
            'wlan1_addr': $('#FormNetSettings #wlan1_addr').val(),
            'wlan1_netmask': $('#FormNetSettings #wlan1_netmask').val(),
            'wlan1_gateway': $('#FormNetSettings #wlan1_gateway').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: NetworkSettings,
            url: '/admin/network/update',
            dataType: 'html',
            success: function(data, textStatus, jqXHR) {
                var NetData = JSON.parse(data);
                //console.log(NetData);

                if (NetData.msg === 'success') {
                    //console.log('Success');
                    swal("Success", "Network Settings Saved.", "success");

                    // Populate IP Info
                    populateIPInfo();
                }
                else {
                    // If something goes wrong, alert the error message that our service returned
                    swal("Oops...", "Something went wrong!", "error");
                }
            },
            error: function(xhr, textStatus, error) {
                //console.log('failure');
                console.log(xhr.statusText);
                console.log(textStatus);
                console.log(error);
                
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
    $.getJSON( '/admin/network/restartnetwork', function( data ) {
        console.log(data);
    });
};