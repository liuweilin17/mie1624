import os
import json
import pandas as pd
import sys

res = []
for i in range(1, 96):
    fname = 'data/hackson' + str(i) + '.json'
    if os.path.exists(fname):
        print(fname)
        with open(fname) as f:
            courses = json.load(f)
            N = len(courses)
            for i in range(N):
                course = courses[i]
                arr = course['title'].split('\n')
                title = arr[0]
                rating_num = arr[-1]
                rating = arr[-2]
                link = course['link']
                j = -3
                while True:
                    if 'CA$' not in arr[j] and 'price' not in arr[j] and 'Price' not in arr[j] and arr[j].strip()!='Free' :
                        break
                    else:
                        j -= 1
                detail = arr[j]
                level = arr[j-1]
                res.append({
                    "title": title,
                    "rating": rating,
                    "level": level,
                    "link": link,
                    "detail": detail,
                })
                # print(course['title'])
                # print({
                #     "title": title,
                #     "rating": rating,
                #     "detail": detail,
                #     "level": level
                # })
                # print('')
                # break

pd.DataFrame(res).to_csv('udemy_courses.csv', index=False)    
