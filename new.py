class Node: 
	def __init__(self,key): 
		self.left = None
		self.right = None
		self.val = key 

def insert(root,node): 
	if root is None: 
		root = node 
	else: 
		if root.val < node.val: 
			if root.right is None: 
				root.right = node 
			else: 
				insert(root.right, node) 
		else: 
			if root.left is None: 
				root.left = node 
			else: 
				insert(root.left, node) 


def inorder(root): 
	if root: 
		inorder(root.left) 
		print(root.val) 
		inorder(root.right) 

def minValueNode( node): 
    current = node 
  
    # loop down to find the leftmost leaf 
    while(current.left is not None): 
        current = current.left  
  
    return current 

def deleteNode(root, key): 
    if root is None: 
        return root  
  
    if key < root.val: 
        root.left = deleteNode(root.left, key) 

    elif(key > root.val): 
        root.right = deleteNode(root.right, key) 
  
    else: 
       
        if root.left is None : 
            temp = root.right  
            root = None 
            return temp  
              
        elif root.right is None : 
            temp = root.left  
            root = None
            return temp 
  
        temp = minValueNode(root.right) 
  
        root.val = temp.val
  
        root.right = deleteNode(root.right , temp.val) 
  
  
    return root  



r = Node(50) 
insert(r,Node(30)) 
insert(r,Node(20)) 
insert(r,Node(40)) 
insert(r,Node(70)) 
insert(r,Node(60)) 
insert(r,Node(80)) 


inorder(r) 

r=deleteNode(r,30)
r=deleteNode(r,20)
print("After Delete!!")
inorder(r)

