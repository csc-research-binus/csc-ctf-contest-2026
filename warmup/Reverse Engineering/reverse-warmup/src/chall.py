#!/usr/bin/python3

flag = [67, 83, 67, 123, 71, 48, 111, 100, 95, 76, 117, 55, 107, 95, 84, 48, 109, 111, 114, 114, 48, 119, 95, 71, 117, 121, 50, 125]

input = input("Please input your password : ")

if len(input) != len(flag):
    print("Yea, Nice Try bruh!")
    exit()

check = True
for i in range(len(flag)):
    if chr(flag[i]) != input[i]:
        check = False
        break

print("HELLLLL YEAAAAAA") if check else print("HELLL NAAAHHHHH")
