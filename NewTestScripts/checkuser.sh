ret=false
getent passwd satinder >/dev/null 2>&1 && ret=true

echo $ret

if $ret; then
    echo "yes the user exists"
else
    echo "No, the user does not exist"
fi