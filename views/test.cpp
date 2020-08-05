#include<iostream>
#include<queue>
#include<vector>
using namespace std;

void match(queue<int> q1,queue<int> q2,int a,int b){
    cout<<a<<" "<<b<<endl;
	int count=0;
	vector<int> v;
	int pos=0;
	while(pos<a && pos<b){
		if(q1.front()==q2.front()){
			v.push_back(pos);
			q1.pop();
			q2.pop();
			count++;
			pos++;
		}
		else{
			q1.pop();
			q2.pop();
			pos++;
		}
	}

    cout<<"Number of elements Common: "<<count<<endl;
	
	cout<<"Common Positions "<<endl;
	for(int i=0;i<v.size();i++){
		cout<<v[i]<<" ";
	}
	cout<<endl;
	
			
}

int main(){
	int a,b,ele;
	cin>>a>>b;
	queue<int> q1,q2;
	for(int i=0;i<a;i++){
		cin>>ele;
		q1.push(ele);
	}
	for(int i=0;i<b;i++){
		cin>>ele;
		q2.push(ele);
	}
	match(q1,q2,a,b);
	return 0;
}