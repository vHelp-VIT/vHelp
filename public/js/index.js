async function postQuestion() {
    let email = document.getElementById('mailArea').value
    let query = document.getElementById('formContent').value
    console.log('Email ', email)
    console.log('Query ', query)
    if (!email || !query) {
        alert('All Fields are mandatory!!')
        return
    }

    let data = {
        question_area: query,
        query_email: email,
        categories: [ "Ford", "BMW", "Fiat" ]
    }

    console.log('Data ', data)

    let res= await fetch("/query/new", {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "content-type": "application/json"
        }
    })
    
    let returnData = await res.json()
    if(returnData._id){
        alert('Your Query is Posted!!')
    }
}