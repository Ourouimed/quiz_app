// Json Data Url to fetch
let JsonUrl = './questions.json'

let question = document.querySelector(".question")
let next = document.getElementById("next")
// Initialize I by 0 (refer to number of question)
let i = 0
// Initialize Total by 0 (refer to number of correct answers)
let total = 0 
// Create Quiz main structure
const CreateQuestions = (data)=>{
    next.innerHTML = `Next`
    // Pass Quizz Questions
    if (i < data.length){
        let QuestNum = document.createElement("span")
        QuestNum.innerHTML =`Question ${i+1}/${data.length}`
        QuestNum.classList.add("q-no" , "bg-teal-200" , "text-cyan-500" ,"mb-1", "px-2" , "py-1" , "rounded" , "font-bold")
        let Q = document.createElement("h3")
        Q.classList.add("text-xl" , "font-bold" , "mb-2")
        Q.innerHTML = `${data[i].question}`
        let answers = document.createElement("div")
        answers.className = "answers"
        data[i].answers.forEach((answer, index) =>{
                let ansEl = document.createElement("div")
                ansEl.className ="answer"
                let radio = document.createElement("input")
                radio.type = "radio"
                radio.id = `answer-${index + 1}`
                radio.name = "questions"
                radio.setAttribute("data-correct" , answer.status)
                let label = document.createElement("label")
                label.setAttribute("for" , radio.id)
                label.innerHTML = ` ${answer.answer}`
                ansEl.append(radio , label)
                answers.append(ansEl)
                radio.addEventListener("input" , ()=>{
                    radio.checked && radio.dataset.correct == "true" ? total++ : total;
                })      
        })
        question.innerHTML = ''
        question.append(QuestNum , Q , answers)
        i++
    }
    // Get Quiz Result
    else {
        next.innerHTML = "Restart"
        next.addEventListener("click" , ()=>{
            location.reload()
        })
        question.innerHTML =   `
            <h1 class="text-2xl font-bold mb-2 text-center">Your Score</h1>
            <div class="single-chart">
                <svg viewBox="0 0 36 36" class="circular-chart orange">
                    <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                    <path class="circle" stroke-dasharray="${(total*100)/data.length}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                    <text x="18" y="20.35" class="percentage">${(total*100)/data.length}%</text>
                </svg>
            </div>
            <p class="my-2 text-center">Your have <span class="font-bold text-cyan-500">${total}/${data.length}</span> correct answers
        `
    }
}
// Fetch Json Data for questions 
async function GetQusetions (URL){
    try {
        let response = await fetch(JsonUrl)
        let questions = await response.json()
        CreateQuestions(questions)
    }
    catch(error){
        console.warn(error)
    }
}
// Start Quiz on button click
next.addEventListener("click" , GetQusetions)
// Get current date
document.getElementById("date").innerHTML = new Date().getFullYear()