// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Restart AP Service button click
    $('#RefreshUSBStorage').on('click', populateTable);

});

//window.setInterval(function(){ 
    //populateTable();
//}, 15000);

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/admin/storage/usbstorageinfo', function( data ) {

        $.each(data, function(index){
            /*console.log('--------------------');
            console.log(this.logical_name);*/

            tableContent += '<tr>';
                tableContent += '<td class="text-center">' + this.vendor + ' ' + this.product + '</td>';
                tableContent += '<td class="font-w600" logc_nm="' + this.logical_name + '" rel=' + index + '>' + this.logical_name + '</td>';
                tableContent += '<td class="hidden-xs hidden-sm" rel=' + index + '>' + this.size + '</td>';
                tableContent += '<td class="text-center">';
                tableContent += '<button class="btn btn-sm btn-danger" type="button" rel=' + index + ' onclick="EraseAndConnect(' + index + ')">Erase & Connect</button> ';
                tableContent += '<button class="btn btn-sm btn-success" type="button" rel=' + index + ' onclick="ConnectUSB(' + index + ')">Connect</button>';
                tableContent += '</td>';
            tableContent += '</tr>';

        // Inject the whole content string into our existing HTML table
        $('#usbstoragelist tbody').html(tableContent);
        //console.log(tableContent);

        });
        //console.log(data);
        //console.log(data[0]);
    });
};

// Erase and Connect the selected USB Device
function EraseAndConnect(index_value) {

    /*App.loader('show');
    setTimeout(function () {
        App.loader('hide');
    }, 3000);*/

    console.log(index_value);
    var usb_storage_logic_name = $('td[rel="' + index_value + '"]').eq(0).text();
    console.log(usb_storage_logic_name);

    swal({
        title: "Are you sure?",
        text: "All Data will be DELETED from " + usb_storage_logic_name + " drive! You will not be able to recover it back.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Erase & Connect!",
        cancelButtonText: "No, cancel plz!",
        closeOnConfirm: false,
        closeOnCancel: false
    },
    function(isConfirm){
        if (isConfirm) {
            swal("Erased & Connected!", "All Data from select USB Device has been deleted and it's now connected to System.", "success");
            console.log('Deleted successfully!');

            var StorageSettings = {
                'USBLogicName': $('td[rel="' + index_value + '"]').eq(0).text()
            }

            console.log(StorageSettings);

            // Use AJAX to post the object to our adduser service
            $.ajax({
                type: 'POST',
                data: StorageSettings,
                url: '/admin/storage/eraseconnect',
                dataType: 'html',
                success: function(data, textStatus, jqXHR) {
                    var NetData = JSON.parse(data);
                    console.log(NetData);

                    if (NetData.msg === 'success') {
                        console.log('Success');
                        swal("Success", "Storage Settings Saved.", "success");

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
        } else {
            swal("Cancelled", "All your data on selected USB Device is safe :)", "error");
            console.log('Cancelled Delete Action!');
        }
    });

    //event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    /*var errorCount = 0;
    /*$('#FormNetSettings input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }*/
};


// Erase and Connect the selected USB Device
function ConnectUSB(index_value) {

    /*App.loader('show');
    setTimeout(function () {
        App.loader('hide');
    }, 3000);*/

    console.log(index_value);
    var usb_storage_logic_name = $('td[rel="' + index_value + '"]').eq(0).text();
    console.log(usb_storage_logic_name);

    swal("Success", "Successfully connected " + usb_storage_logic_name + ".", "success");
    //event.preventDefault();
};