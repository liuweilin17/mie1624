import json
import pandas as pd

flist = ['res1', 'res2', 'res3', 'res4', 'res5', 'res6']

jobs = []
for fname in flist:
    with open(fname) as f:
        for line in f:
            # check whether it is a jsonG
            if line[0] == '{':
                job = json.loads(line)
                jobs.append(job)
print(len(jobs))

pd.DataFrame(jobs).to_csv('linkedin_jobs.csv', index=False)
