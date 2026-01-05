from datetime import datetime, timedelta

dt = datetime(2021, 1, 5, 18, 49, 20)
dt2 = datetime(2021, 1, 5, 18, 49, 5)

print(datetime.now() - dt2)
print(dt - dt2 < timedelta(seconds=15))
