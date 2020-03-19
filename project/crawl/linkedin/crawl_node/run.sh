###########################################
# Let's Have Some Fun
# File Name: run.sh
# Author: Weilin Liu
# Mail: liuweilin17@qq.com
# Created Time: Thu Mar  5 21:41:44 2020
###########################################
#!/bin/bash

# Canada, data scientists
node index1.js &> res1
count=`wc -l res1`
echo "res1 done $count"

# Canada, data engineer
node index2.js &> res2
count=`wc -l res2`
echo "res2 done $count"

# United States, data scientists
node index3.js &> res3
count=`wc -l res3`
echo "res3 done $count"

# United States, data engineer
node index4.js &> res4
count=`wc -l res4`
echo "res4 done $count"

# Canada, data analyst
node index5.js &> res5
count=`wc -l res5`
echo "res5 done $count"

# United States, data analyst
node index6.js &> res6
count=`wc -l res6`
echo "res6 done $count"
