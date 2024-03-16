const questions = [
    {
        question: "While creating a website which language is used?",
        answers: [
            {text:"Html", correct: false},
            {text:"Css", correct: false},
            {text:"Javascript", correct: false},
            {text:"All the above", correct: true},
        ]
    },
    {
        question: "In which age you can open ur personal account?",
        answers:[
            {text:"10", correct: false},
            {text:"15", correct: false},
            {text:"16", correct: false},
            {text:"18", correct: true},
        ]
    },
    {
        question: "What does partially means?",
        answers:[
            {text:"equally", correct: false},
            {text:"fully", correct: false},
            {text:"half", correct: true},
            {text:"none", correct: false},
        ]
    }
];

            
           
            const questionElement = document.getElementById("question");
            const answerButtons = document.getElementById("answer-buttons");
            const nextButton = document.getElementById("next-btn");

            let currentQuestionIndex = 0;
            let score = 0;

            function startQuiz(){
                currentQuestionIndex = 0;
                score = 0;
                nextButton.innerHtml = "Next";
                showQuestion();
            }

            function showQuestion(){
                resetState();
                let currentQuestion = questions[currentQuestionIndex];
                let questionNo = currentQuestionIndex + 1;
                questionElement.innerHTML = questionNo + "." + currentQuestion.question;

                currentQuestion.answers.forEach(answer =>{
                    const button = document.createElement("button");
                    button.innerHTML = answer.text;
                    button.classList.add("btn");
                    answerButtons.appendChild(button);
                    if(answer.correct){
                        button.dataset.correct = answer.correct;
                    }
                    button.addEventListener("click" , selectAnswer);
                });
            }
            function resetState(){
                nextButton.style.display = "none";
                while(answerButtons.firstChild){
                    answerButtons.removeChild(answerButtons.firstChild);
                }
            }
            
            function selectAnswer(e){
                const selectedBtn = e.target;
                const isCorrect = selectedBtn.dataset.correct === "true";
                if(isCorrect){
                    selectedBtn.classList.add("correct");
                    score++;
                }else{
                    selectedBtn.classList.add("incorrect");
                }
                Array.from(answerButtons.children).forEach(button =>{
                    if(button.dataset.correct === "true"){
                        button.classList.add("correct");
                    }
                    button.disabled = true;
                });
                nextButton.style.display = "block";
            }

            function showScore(){
                resetState();
                questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
                nextButton.innerHTML = "Well played";
                nextButton.style.display = "block";
            }

            function handleNextButton(){
                currentQuestionIndex++;
                if(currentQuestionIndex < questions.length){
                    showQuestion();
                }else{
                    showScore();
                }
            }

            nextButton.addEventListener("click" , ()=>{
                if(currentQuestionIndex < questions.length){
                    handleNextButton();
                }else{
                    startQuiz();
                }
            });


            startQuiz();