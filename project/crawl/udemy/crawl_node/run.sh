###########################################
# Let's Have Some Fun
# File Name: run.sh
# Author: Weilin Liu
# Mail: liuweilin17@qq.com
# Created Time: Fri Mar  6 18:50:38 2020
###########################################
#!/bin/bash

<< liu
for i in {1..95}; do
    echo $i
    #sleep 10
    #node index.js $i
done
liu

while read page;do
    # echo $page
    sleep 5
    node index.js $page
done < pages2
