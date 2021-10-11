rvals = (10, 15, 22, 33, 47, 68, 100, 150, 220, 330, 470, 680, 1000, 1500, 2200, 3300, 4700, 6800, 10000, 15000, 22000, 33000, 47000, 68000, 100000, 150000, 220000, 330000, 470000, 680000, 1000000)
rvals = rvals[4:]
TARGET = 2.1
closest = (0, 0, 0)

for r1 in rvals:
    for r2 in rvals:
        vo = (1.25 * (r1 + r2)) / r1
        if abs(vo - TARGET) < abs(closest[0] - TARGET):
            closest = (vo, r1, r2)

print(closest)