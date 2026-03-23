#1 Write a program which will find all such numbers which are divisible by 7 but are not a multiple of 5, between 2000 and 3200 (both included).

print("The range of number div by 7 and not 5 between 2000 - 3200:")
for num in range(2000, 3201):
    if num % 7==0 and num%5!=0:
        print(num, end=" ")



#2 Write a program which can compute the factorial of a given number
        
num=int(input())
fact=1
for i in range(1,num+1):
    fact*=i
print("Factorial of a number ",num,"= ",fact)




#3 Reverse the given digit for eg:input - 14339 outpu - 93341

num=14339
rev=0
while num!=0:
    rem=num%10
    rev = rev*10 + rem
    num=num//10
print("reverse of number: 14339 is ",rev)





#4 For a given string fiand out the number of vowels and number of consonant
"This is a python programming language it is highlevel"

str="This is a python programming language it is highlevel"
vowels=['a','e','i','o','u']
vow=0
cons=0

for i in str:
    if i.lower() in vowels:
        vow+=1
    elif (i>='a' and i<='z') or (i>='A' and i<='Z'):
        cons+=1

print("vowels = ",vow," and consonant = ",cons)





#5 For a given string count each number of vowels and print it
""""This is a python programming language it is highlevel"
for eg: print output as  
a : count of a in string
e : count of e in string """

str="This is a python programming language it is highlevel"
vowels={'a': 0,'e' :0,'i': 0,'o': 0,'u': 0}
str=str.lower()
for i in str:
    if i in vowels:
        vowels[i]+=1

print(vowels)




