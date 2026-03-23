



menu = {"Bread":45, "butter":87,"jam":32, "toast":56, "cheese":90}

print("\n\n The list of items:\n- Items: Bread butter jam toast cheese\n- prices: 45,87,32,56,90\n- Enter the below menu to order the item:\n- 1. add item to cart\n- 2. update\n- 3. delete\n- 4. view\n- 5. exit and print bill\n\n")

cart={}
num=1
#menu1()
while num:

    print("\n Enter the menu number to order the item")

    num = int(input())

    if num == 1:
        print("\n\n The list of items:\n- Items: Bread butter jam toast cheese\n- prices: 45,87,32,56,90")

        print("\n\nEnter the name of item to add in cart")
        name=input()
        
        if name in menu:
            print("Enter the quantity of item")
            quantity=int(input())
            cart[name]=quantity
            print("\n Item added in cart successfully")
        else:
            print("\n\nEnter correct item")
        print("")

    
    elif num == 2:
        print("\nEnter the name of item to update in cart")
        name=input()
        if name in cart:
            print("\nEnter the quantity of item to update")
            quantity=int(input())
            cart[name]=quantity
            print("\n Item updated in cart successfully")
        else:
            print("\nItem is not present in cart")
        


    elif num==3:
        print("\n\nEnter the name of item to delete")
        name=input()
        if name in cart:
            cart.pop(name)
            print("\n\nThe item was deleted succesfully")
        else:
            print("\nItem is not present in cart")

    elif num==4:
        print("\n\n")
        if cart:
            for i,v in cart.items():
                print("Item:", i, " quantity: ", v, " price: ",v*menu[i])
        else:
            print("Cart is empty")

        print("\n\n")


    elif num==5:
    
        total=0
        print("Items  Quantity   price")
        for i,v in cart.items():
           print( i, "   ", v, "     ",v*menu[i])
           total+=v*menu[i]
        print("\n\nTotal Bill:", total)
        break

    else:
        print("\n\nEnter the number between 1 and 5 to order the item")

        



#print(cart)
