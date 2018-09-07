
# download poster as pdf from google sheets
# convert pdf to pngs online
# potentially delete bad slides and re-number with this program

import os
fs = os.listdir()
fs.sort()

for i in range(len(fs)):
  os.system("mv {} Poster-{}.png".format(fs[i], i)) 


