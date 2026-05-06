import random

flagfile = open("flag.txt")
flag = flagfile.read()

seed = 727
random.seed(seed)
randomnumber = random.randint(1 , 5000)

normaldictionary = list("_-+/{}#1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
randomdictionary = list("E_Ap9{IGKXSqjB2Mm/U7dk85u-a3fvJehiDlRQncyosZLVzNOF+PW16#T}bxr0wHYC4gt")

encrypted_flag = ""

for flagindex in range(len(flag)):
    for dictionaryindex in range(len(normaldictionary)):
        if flag[flagindex] == normaldictionary[dictionaryindex]:
            encrypted_flag += randomdictionary[dictionaryindex]
            break

encrypted_flag = [(ord(encrypted_flag[index]) + randomnumber + index) % 10000 for index in range(len(encrypted_flag))]

encrypted_flag = [(each_integer ^ randomnumber) for each_integer in encrypted_flag]

print(f"here is the final flag: {encrypted_flag}")
