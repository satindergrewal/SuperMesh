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
    var StorageBlockBase = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/admin/storage/usbstorageinfo', function( data ) {
        var tmpIndex = '';
        var LogicalName = '';

        $.each(data.usbinfo, function(index){
            //console.log('---------- Data USB INFO ----------');
            //console.log(this);

            /*tableContent += '<tr>';
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
            //console.log(tableContent);*/

            LogicalName = this.logical_name;
            tmpIndex = index;

            StorageBlockBase += '<div class="col-lg-4">';
            StorageBlockBase += '<div class="block block-bordered">';
            StorageBlockBase += '<div class="block-header">';
            StorageBlockBase += '<h3 class="block-title" style="text-transform: none;">' + this.vendor + ' ' + this.product + ' <small>' + this.size + '</small></h3>';
            StorageBlockBase += '</div>';
            StorageBlockBase += '<div class="block-content"><div class="pull-r-l pull-t push">';
            StorageBlockBase += '<table class="block-table text-center bg-gray-lighter border-b"><tbody>';
            StorageBlockBase += '<tr><td class="border-r" style="width: 50%;"><div class="h2 font-w700" rel="' + index + '" id="free">FREE</div><div class="h5 text-muted text-uppercase push-5-t" rel="' + index + '" id="diskstatus" style="text-transform: none;">Available</div></td>';
            StorageBlockBase += '<td><div class="push-10 push-10-t"><div class="btn-group-vertical" data-toggle="buttons">';
            StorageBlockBase += '<button class="btn btn-success" type="button" onclick="ConnectUSB(' + index + ')"><i class="fa fa-link"></i> Connect</button>';
            StorageBlockBase += '<button class="btn btn-default" type="button" onclick="DisConnectUSB(' + index + ')"><i class="fa fa-expand"></i> Disconnect</button>';
            StorageBlockBase += '<button class="btn btn-danger" type="button" onclick="EraseAndConnect(' + index + ')"><i class="fa fa-trash"></i> Erase &amp; Connect</button>';
            StorageBlockBase += '</div></div></td>';
            StorageBlockBase += '</tr></tbody></table></div>';
            StorageBlockBase += '<table class="table table-borderless table-striped table-condensed">';
            StorageBlockBase += '<tbody><tr><td><strong>Logical Name:</strong></td><td><span rel="' + index + '" data-rel="' + index + '" id="logicname">' + this.logical_name + '</span></td></tr>';
            StorageBlockBase += '<tr><td><strong>Partition:</strong></td><td><span rel="' + index + '" id="partition"></span></td></tr>';
            StorageBlockBase += '<tr><td><strong>Mount Point:</strong></td><td><span rel="' + index + '" id="mount"></span></td></tr>';
            StorageBlockBase += '<tr><td><strong>Total Size:</strong></td><td><span rel="' + index + '" id="totalsize"></span></td></tr>';
            StorageBlockBase += '<tr><td><strong>Available:</strong></td><td><span rel="' + index + '" id="avail"></span></td></tr>';
            StorageBlockBase += '<tr><td><strong>Used:</strong></td><td><span rel="' + index + '" id="used"></span></td></tr></tbody></table>';
            StorageBlockBase += '</div></div></div>';

            $('#storage-blocks').html(StorageBlockBase);
        });
        //console.log(data);
        //console.log(data[0]);
        
        //console.log('df length: '+data.df.length);

        for (i = 0; i < $('span[id="logicname"]').length; i++) {
            //$('span[id="logicname"]').eq(i).html();
            //console.log('Value of i: '+i)
            for (j = 0; j < data.df.length; j++) {
                if ( data.df[j].filesystem === $('span[id="logicname"]').eq(i).html()+'1' ) {
                    //console.log('Logical Name: '+data.df[j].filesystem);
                    $('span[rel="' + i + '"]').eq(1).html( data.df[j].filesystem ); //Parition
                    $('span[rel="' + i + '"]').eq(2).html( data.df[j].mount ); //Mount Point
                    $('span[rel="' + i + '"]').eq(3).html( data.df[j].size ); //Total Size
                    $('span[rel="' + i + '"]').eq(4).html( data.df[j].available ); //Available Space
                    $('span[rel="' + i + '"]').eq(5).html( data.df[j].used ); //Used Space
                    $('div[rel="' + i + '"]').eq(0).html( data.df[j].available ); //Available Bold
                    $('div[rel="' + i + '"]').eq(1).html( '/'+data.df[j].size ); //Total Size
                    if ( data.df[j].available === '' ) {
                        $('div[id="diskstatus"]').eq(i).html('Not Mount');
                    }
                }
            }
        }
    });
};

// Erase and Connect the selected USB Device
function EraseAndConnect(index_value) {

    /*App.loader('show');
    setTimeout(function () {
        App.loader('hide');
    }, 3000);*/

    console.log(index_value);
    //var usb_storage_logic_name = $('td[rel="' + index_value + '"]').eq(0).text();
    var usb_storage_logic_name = $('span[id="logicname"]').eq(index_value).html();
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
                'USBLogicName': $('span[id="logicname"]').eq(index_value).html()
            }

            console.log(StorageSettings);

            // Use AJAX to post the object to our adduser service
            $.ajax({
                type: 'POST',
                data: StorageSettings,
                url: '/admin/storage/eraseconnect',
                dataType: 'html',
                success: function(data, textStatus, jqXHR) {
                    var StorageData = JSON.parse(data);
                    console.log(StorageData);

                    if (StorageData.msg === 'success') {
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


// Connect the selected USB Device
function ConnectUSB(index_value) {

    /*App.loader('show');
    setTimeout(function () {
        App.loader('hide');
    }, 3000);*/

    //console.log(index_value);
    var usb_storage_logic_name = $('span[id="logicname"]').eq(index_value).html();
    console.log(usb_storage_logic_name);

    swal("Success", "Successfully connected " + usb_storage_logic_name + ".", "success");
    //event.preventDefault();
};

// Disconnect the selected USB Device
function DisConnectUSB(index_value) {

    /*App.loader('show');
    setTimeout(function () {
        App.loader('hide');
    }, 3000);*/

    //console.log(index_value);
    var usb_storage_logic_name = $('span[id="logicname"]').eq(index_value).html();
    console.log(usb_storage_logic_name);

    var StorageSettings = {
        'USBLogicName': $('span[id="logicname"]').eq(index_value).html()
    }

    console.log(StorageSettings);

    // Use AJAX to post the object to our adduser service
            $.ajax({
                type: 'POST',
                data: StorageSettings,
                url: '/admin/storage/disconnect',
                dataType: 'html',
                success: function(data, textStatus, jqXHR) {
                    var StorageData = JSON.parse(data);
                    console.log(StorageData);

                    if (StorageData.msg === 'success') {
                        console.log('Success');
                        swal("Success", "Successfully disconnected " + usb_storage_logic_name + ".", "success");

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

    //swal("Success", "Successfully disconnected " + usb_storage_logic_name + ".", "success");
    //event.preventDefault();
};