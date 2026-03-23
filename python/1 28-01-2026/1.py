s=int(input())
e=int(input())
for a in range(s,e):
    if a%400==0 or (a%4==0 and a%100!=0):
        print(a,end=" ")
    
