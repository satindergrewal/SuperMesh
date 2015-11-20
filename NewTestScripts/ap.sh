#!/bin/sh



#For minibian setup
apt-get update
apt-get install nano sudo rpi-update raspi-config usbutils dosfstools -y
apt-get remove initramfs-tools -y

#Install Wireless Firmware
apt-get install firmware-linux-nonfree wireless-tools wpasupplicant -y


#Add user Pi if does not exists - Applies to minibian
add_user(){
	user_exists=false
	getent passwd pi >/dev/null 2>&1 && user_exists=true

	if $ret; then
		echo "yes the user exists"
	else
		echo "No, the user does not exist"
		sudo adduser pi
		sudo usermod -a -G sudo pi
	fi
}

