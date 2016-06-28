#Enable IPv4 forwarding
#Enable Masquerading on eth0 interface, the Internet Interneface
#Enable Masquerading on eth0 interface, the Internet Interneface
sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"; sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE; sudo iptables -t nat -A POSTROUTING -o wlan1 -j MASQUERADE

# Between eth0 (Internet) <-> wlan0 (Local LAN)
#Forward any packet coming from eth0 (Internet) interface to wlan0 (Access Point) interface
#Forward any packet coming from wlan0 (Access Point) interface to eth0 (Internet) interface
sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT; sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT

# Between eth0 (Internet) <-> eth1 (Local LAN)
#Forward any packet coming from eth0 (Internet) interface to eth1 (Access Point) interface
#Forward any packet coming from eth1 (Access Point) interface to eth0 (Internet) interface
sudo iptables -A FORWARD -i eth0 -o eth1 -m state --state RELATED,ESTABLISHED -j ACCEPT; sudo iptables -A FORWARD -i eth1 -o eth0 -j ACCEPT

# Between wlan1 (Internet) <-> wlan0 (Local LAN)
#Forward any packet coming from wlan1 (Internet) interface to wlan0 (Access Point) interface
#Forward any packet coming from wlan0 (Access Point) interface to wlan1 (Internet) interface
sudo iptables -A FORWARD -i wlan1 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT; sudo iptables -A FORWARD -i wlan0 -o wlan1 -j ACCEPT

# Between wlan1 (Internet) <-> eth1 (Local LAN)
#Forward any packet coming from wlan1 (Internet) interface to eth1 (Access Point) interface
#Forward any packet coming from eth1 (Access Point) interface to wlan1 (Internet) interface
sudo iptables -A FORWARD -i wlan1 -o eth1 -m state --state RELATED,ESTABLISHED -j ACCEPT; sudo iptables -A FORWARD -i eth1 -o wlan1 -j ACCEPT

#Mre NAT rules
#Add firewall rule to allow access to SSH through internal network from where the home users connect to. Both LAN (eth1) and wireless (wlan0)
sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 22 -j REDIRECT --to-ports 22; sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 22 -j REDIRECT --to-ports 22

#Add firewall rule to allow internal users to do DNS queries
sudo iptables -t nat -A PREROUTING -i eth1 -p udp --dport 53 -j REDIRECT --to-ports 53; sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 53 -j REDIRECT --to-ports 53

#Make sure SuperMesh web interface is ALWAYS accessible to internal users
sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 3000 -j REDIRECT --to-ports 3000; sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 3000 -j REDIRECT --to-ports 3000

sudo iptables -t nat -A PREROUTING -i eth1 -p udp --dport 9050 -j REDIRECT --to-ports 9050; sudo iptables -t nat -A PREROUTING -i wlan0 -p udp --dport 9050 -j REDIRECT --to-ports 9050

## I2P Ports
# I2P HTTP Proxy
sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 4444 -j REDIRECT --to-ports 4444; sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 4444 -j REDIRECT --to-ports 4444

# I2P Socks Proxy
sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 4447 -j REDIRECT --to-ports 4447; sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 4447 -j REDIRECT --to-ports 4447

# I2P Web Console
sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 7070 -j REDIRECT --to-ports 7070; sudo iptables -t nat -A PREROUTING -i wlan0 -p tcp --dport 7070 -j REDIRECT --to-ports 7070


#Save updated iptables rules to ipv4 file
sudo sh -c "iptables-save > /etc/network/iptables.ipv4.nat"