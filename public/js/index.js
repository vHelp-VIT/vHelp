async function postQuestion() {
    let email = document.getElementById('mailArea').value
    let query = document.getElementById('formContent').value
    let radio_acad = document.getElementById('radio_acad').checked
    let radio_place = document.getElementById('radio_place').checked
    let radio_infra = document.getElementById('radio_infra').checked
    let radio_club = document.getElementById('radio_club').checked
    let radio_acti = document.getElementById('radio_acti').checked
    let radio_gen = document.getElementById('radio_gen').checked

    let postButton = document.getElementById('postQuestionButton')
    postButton.innerHTML = 'Posting Query... <div class="spinner-border text-success" role="status"><span class="sr-only">Loading...</span></div>'

    console.log('Email ', email)
    console.log('Query ', query)
    if (!email || !query) {
        alert('All Fields are mandatory!!')
        return
    }

    let cat = []

    if (radio_acad) {
        cat.push("academics")
    }
    if (radio_place) {
        cat.push("placement")
    }
    if (radio_infra) {
        cat.push("infrastructure")
    }
    if (radio_club) {
        cat.push("clubs_teams")
    }
    if (radio_acti) {
        cat.push("activities")
    }
    if (radio_gen) {
        cat.push("general")
    }
    if (cat.length == 0) {
        cat.push("general")
    }

    let data = {
        question_area: query,
        query_email: email,
        categories: cat
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
        postButton.innerHTML = 'Post Question'
        email.value = ''
        query.value = ''
        radio_acad.checked = false
        radio_place.checked = false
        radio_infra.checked = false
        radio_club.checked = false
        radio_acti.checked = false
        radio_gen.checked = false

        alert('Your Query is Posted!!')
    }
}