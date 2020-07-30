class Node:
    def __init__(self,data=None):
        self.data=data
        self.left=None
        self.right=None

class BST:
    def __init__(self):
        self.root=None
    
    def insert(self,ele):
        def bst_insert(root,ele):
            if(root==None):
                return Node(ele)

            elif(ele<=root.data):
                root.left=bst_insert(root.left,ele)

            else:
                root.right=bst_insert(root.right,ele)
            return root

        self.root=bst_insert(self.root,ele)

    def in_order(self):
        def printBST(root):
            if(root.left):
                printBST(root.left)
            print(root.data)
            if(root.right):
                printBST(root.right)
        printBST(self.root)

    def search(self,ele):
        def search_BST(root,ele):
            if(root is None):
                return False
            elif(root.data==ele):
                return True
            elif(root.data<ele):
                return search_BST(root.right,ele)
            else:
                return search_BST(root.left,ele)
        return search_BST(self.root,ele)


    def deleteBST(self,ele):
        def minEle(root):
            while(root.left is not None):
                root=root.left
            return root
        
        def deleteNode(root,ele):
            if(root==None):
                return root;
            if(root.data > ele):
                root.left=deleteNode(root.left,ele)
            elif(root.data < ele):
                root.right=deleteNode(root.right,ele)
            else:
                if(root.left==None):
                    temp=root
                    root=root.right;
                    return root;
                
                elif(root.right==None):
                    temp=root;
                    root=root.left
                    return root;
                
                else:
                    temp=minEle(root.right)
                    root.data=temp.data
                    root.right=deleteNode(root.right,temp.data);
                    return root;
        deleteNode(self.root,ele)  

    
if __name__=='__main__':
    bst=BST()
    nums=[23,13,45,90]
    [bst.insert(i) for i in nums]
    bst.in_order()
    print("Searching 13: ",bst.search(13))
    print("Searching 14: ",bst.search(14))
    print("Deleting 23")
    bst.deleteBST(23)
    bst.in_order()
    print("Deleting 13")
    bst.deleteBST(13)
    bst.in_order()


