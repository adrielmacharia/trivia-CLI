const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = [
    {
        question: "What is the capital of France?",
        options: ["1. London", "2. Paris", "3. Berlin", "4. Madrid"],
        correctAnswer: "2"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["1. Earth", "2. Mars", "3. Jupiter", "4. Venus"],
        correctAnswer: "2"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["1. Elephant", "2. Blue Whale", "3. Giraffe", "4. Great White Shark"],
        correctAnswer: "2"
    },
    {
        question: "How many continents are there on Earth?",
        options: ["1. Five", "2. Six", "3. Seven", "4. Eight"],
        correctAnswer: "3"
    }
];

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function startTimer(seconds, promptText) {
    return new Promise((resolve) => {
        let timeLeft = seconds;
        
        const timerId = setInterval(() => {
            timeLeft--;
            rl.setPrompt(`\n(Time left: ${timeLeft}s) ${promptText}\n> `);
            rl.prompt();
            
            if (timeLeft <= 0) {
                clearInterval(timerId);
                resolve("TIMEOUT");
            }
        }, 1000);

        rl.question(`\n(Time left: ${timeLeft}s) ${promptText}\n> `, (answer) => {
            clearInterval(timerId); // Stop the timer
            resolve(answer.trim());
        });
    });
}

async function playTriviaGame() {
    console.log("==================================");
    console.log("   WELCOME TO THE TRIVIA CLI GAME ");
    console.log("==================================");
    
    let score = 0;
    const timeLimit = 10;


    for (let i = 0; i < questions.length; i++) {
        const currentQ = questions[i];
        
        
        console.log(`\n--- Question ${i + 1} of ${questions.length} ---`);
        console.log(currentQ.question);
        
        currentQ.options.forEach(option => console.log(option));

        const userAnswer = await startTimer(timeLimit, "Enter the number of your answer:");

        if (userAnswer === "TIMEOUT") {
            console.log(`\n⏰ Time's up! The correct answer was: ${currentQ.correctAnswer}`);
        } else if (userAnswer === currentQ.correctAnswer) {
            console.log("\n✅ Correct!");
            score++;
        } else {
            console.log(`\n❌ Incorrect. The correct answer was: ${currentQ.correctAnswer}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    console.log("\n==================================");
    console.log("           GAME OVER              ");
    console.log("==================================");
    console.log(`Your final score is: ${score} out of ${questions.length}`);
    
    if (score === questions.length) {
        console.log("Perfect score! You are a trivia master!");
    } else if (score >= questions.length / 2) {
        console.log("Good job! You know your stuff.");
    } else {
        console.log("Better luck next time!");
    }

    
    rl.close();
}

playTriviaGame();