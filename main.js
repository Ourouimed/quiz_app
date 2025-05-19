// Json Data Url to fetch
let JsonUrl = './questions.json'

let question = document.querySelector(".question")
let next = document.getElementById("next")

// Initialize question index and total score
let i = 0
let total = 0 

const CreateQuestions = (data) => {
    next.innerHTML = `Next`
  
    if (i < data.length) {
        // Question number
        let QuestNum = document.createElement("span")
        QuestNum.innerHTML = `Question ${i + 1}/${data.length}`
        QuestNum.classList.add("q-no", "bg-teal-200", "text-cyan-500", "mb-1", "px-2", "py-1", "rounded", "font-bold")
        
        // Question text
        let Q = document.createElement("h3")
        Q.classList.add("text-xl", "font-bold", "mb-2")
        Q.innerHTML = `${data[i].question}`
        
        // Container for answers
        let answers = document.createElement("div")
        answers.className = "answers flex flex-col gap-1"
        
        // Feedback paragraph
        let feedback = document.createElement("p")
        feedback.classList.add("mt-2", "font-semibold", "text-center")
        
        // Add answers as clickable divs
        data[i].answers.forEach((answer, index) => {
            let ansEl = document.createElement("div")
            ansEl.className = "answer cursor-pointer rounded border border-gray-300 p-3 text-slate-700 hover:bg-cyan-50 transition-all select-none"
            ansEl.textContent = answer.answer
            ansEl.dataset.correct = answer.status
            
            ansEl.addEventListener("click", () => {
                // Prevent multiple clicks
                if (answers.classList.contains("disabled")) return
                
                if (ansEl.dataset.correct === "true") {
                    total++
                    feedback.textContent = "Correct! 🎉"
                    feedback.classList.remove("text-red-600")
                    feedback.classList.add("text-green-600")
                } else {
                    feedback.textContent = "Oops, that's not correct."
                    feedback.classList.remove("text-green-600")
                    feedback.classList.add("text-red-600")
                }
                
                // Disable further clicks
                answers.classList.add("disabled")
                
                // Highlight correct and wrong answers
                answers.querySelectorAll(".answer").forEach(el => {
                    if (el.dataset.correct === "true") {
                        el.classList.add("bg-green-100", "border-green-400")
                    } else {
                        el.classList.add("bg-red-100", "border-red-400", "opacity-70")
                    }
                    el.style.cursor = "default"
                })
            })
            
            answers.appendChild(ansEl)
        })
        
        question.innerHTML = ''
        question.append(QuestNum, Q, answers, feedback)
        i++
    }
    else {
        next.innerHTML = "Restart"
        next.removeEventListener("click", GetQusetions)
        next.addEventListener("click", () => location.reload())
        
        question.innerHTML = `
            <h1 class="text-2xl font-bold mb-2 text-center">Your Score</h1>
            <div class="single-chart">
                <svg viewBox="0 0 36 36" class="circular-chart orange">
                    <path class="circle-bg" d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"/>
                    <path class="circle" stroke-dasharray="${(total * 100) / data.length}, 100" d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"/>
                    <text x="18" y="20.35" class="percentage">${Math.floor((total * 100) / data.length)}%</text>
                </svg>
            </div>
            <p class="my-2 text-center">
                You have <span class="font-bold text-cyan-500">${total}/${data.length}</span> correct answers
            </p>
        `
    }
}

// Fetch questions JSON and start quiz
async function GetQusetions() {
    try {
        let response = await fetch(JsonUrl)
        let questions = await response.json()
        CreateQuestions(questions)
    }
    catch(error) {
        console.warn(error)
    }
}

// Start quiz button click
next.addEventListener("click", GetQusetions)

// Show current year in footer
document.getElementById("date").innerHTML = new Date().getFullYear()
