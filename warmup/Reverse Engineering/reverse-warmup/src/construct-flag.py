#!/usr/bin/python3

flag = "CSC{G0od_Lu7k_T0morr0w_Guy2}"

tmp = []
for i in range(len(flag)):
    tmp.append(ord(flag[i]))

print(f"len : {len(flag)}")
print(f"flag = {tmp}")
