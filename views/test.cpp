#include<iostream>
using namespace std;

struct Node

{

    int data;

    Node *left;

    Node *right;

};

Node *Insert(Node *node,int data)
{

    if(node==NULL){

    Node *temp;

    temp=new Node;

    temp -> data = data;

    temp -> left = temp -> right = NULL;

    return temp;

    }

    if(data >(node->data))

    {

    node->right = Insert(node->right,data);

    }

    else if(data < (node->data))

    {

    node->left = Insert(node->left,data);

    }

    return node;

}

Node * Find(Node *node, int data)

{
    if(node==NULL) return NULL;

    if(data > node->data)
    return Find(node->right,data);

    else if(data < node->data)
    return Find(node->left,data);


    else return node;


    }

    void Inorder(Node *node)

    {

        if(node==NULL) return;

        Inorder(node->left);

        cout<<node->data<<" ";

        Inorder(node->right);

}

void Preorder(Node *node)
{

    if(node==NULL) return;

    cout<<node->data<<" ";

    Preorder(node->left);

    Preorder(node->right);

}

void Postorder(Node *node)
{

    if(node==NULL) return;

    Postorder(node->left);

    Postorder(node->right);

    cout<<node->data<<" ";

}



void levelorder(struct Node *p,int level)
{
   if (p==NULL) return;
   if(level==1) cout<<p->data<<endl;
   
   else if(level>1)
   
   {
       levelorder(p->left,level);
       levelorder(p->right,level);
   }
   cout<<p->data<<endl;
}
Node* search(struct Node *t,int key)
{
    if(key==0) return 0;
    
    else if(key==t->data)
        return t;
    
    else if(key>t->data) return search(t->right,key);
    
    else return search(t->left,key);

}

int main()

{

Node *root = NULL,*temp;

int ch;

cout<<"\n1.Insert\n 2.Inorder\n 3.Preorder\n 4.Postorder\n 5.level order 6.Search\n 7.Exit\n";

while(1)

{

cout<<"Enter choice :";

cin>>ch;

switch(ch)

{

case 1:

cout<<"\nInsert :";

cin>>ch;

root = Insert(root, ch);

cout<<"\nElements in BST :";

Inorder(root);

cout<<endl;

break;

case 2:

cout<<"\nInorder Travesal :";

Inorder(root);

cout<<endl;

break;

case 3:

cout<<"\nPreorder Traversal :";

Preorder(root);

cout<<endl;

break;

case 4:

cout<<"\nPostorder Traversal :";

Postorder(root);

cout<<endl;

break;

case 5:
cout<<"\n levelorder traversal:";
levelorder(root,5);
cout<<endl;



case 6:

cout<<"\nSearch:";

cin>>ch;

temp = search(root,ch);

if(temp==NULL) cout<<"Element not found";


else cout<<"Element "<<temp->data<<" Found\n";

cout<<endl;

break;

case 7:

exit(0);

break;

default:

cout<<"\nEnter again :";

cout<<endl;

break;

}

}

return 0;

}