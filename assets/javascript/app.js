$(document).ready (function() {

//Variable that will hold our interval for question timer
var showQuestion;

var timerRunning = false;

var random;

$(".user-info").hide();

//Start Game
    $(".start").on("click",function() {
        startGame();
        $(".user-info").show();
    });
    
    //Sets interval on main game function
    function startGame() {
    nextQuestion();
    };
    //Main function driving the game
    function nextQuestion() {
            showQuestion = setTimeout(timeUp,1000 * 30);
            if (questionArr.length > 0){
            //Empties any previous content in game interface
            $(".interface").empty();
            //Selects random question and answer choices
            random = Math.floor(Math.random() * (questionArr.length));
            
            //Displays Question, timer and shuffled answer choices:
            $(".interface").append('<div class="question"><p>'+ questionArr[random].question+'</p></div>');
            $(".question").append('<div id="time-left"><p>Time left: <span id="timer">30</span> seconds</p>')
            //Starts countdown
            startCountDown();
            var choices = shuffleChoices();

            for (i=0;i<choices.length;i++) {
                console.log(i,choices[i])
                choices[i]();
            }
            
            //Array of functions so we can randomize answer choices; Fisher-Yates algorithm.
            function shuffleChoices() {
                var answerChoices=[choice1,choice2,choice3,choice4];
                
                var currentIndex = answerChoices.length, temporaryValue, randomIndex;
            
                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
            
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
            
                // And swap it with the current element.
                temporaryValue = answerChoices[currentIndex];
                answerChoices[currentIndex] = answerChoices[randomIndex];
                answerChoices[randomIndex] = temporaryValue;
                }
                console.log("shuffle!")
                console.log(answerChoices);
                return answerChoices;
            }
            
            //These functions append our answer choices below our question. Get shuffled in shuffleChoices().
            function choice1(){
            $(".interface").append('<div class="choices"><p>'+ questionArr[random].a +'</p></div>')
            };
            function choice2(){
            $(".interface").append('<div class="choices"><p>'+ questionArr[random].b +'</p></div>')  
            };
            function choice3(){
            $(".interface").append('<div class="choices"><p>'+ questionArr[random].c +'</p></div>')
            };
            function choice4(){
            $(".interface").append('<div class="choices"><p>'+ questionArr[random].answer +'</p></div>')
            };

            //User selects answer
            $(".choices").on("click",function(){
                if ($(this).text() === questionArr[random].answer) {
                    $(this).addClass('correct');
                    var newScore = parseInt($("#score").text());
                    $("#score").html(newScore+10);
                    console.log("Correct!");
                    rightAnswer();
                }
                else {
                    $(this).addClass('wrong');
                    var newScore = parseInt($("#score").text());
                    $("#score").html(newScore-10);
                    console.log(this.text)
                    wrongAnswer();
                }
            });
        }
        else {
            $(".interface").empty();
            clearInterval(showQuestion);
            $(".interface").append('<h2 id ="game-over">We\'re out of questions, so...<br>GAME OVER.</h2>');
            $(".interface").append('<button type="button" class="btn btn-success btn-lg d-flex justify-content-center replay">Play again?</button>')
            $(".replay").on("click", function(){
                location.reload();
                console.log("??")
            });
           
        }
    };

    function rightAnswer() {
        $(".interface").empty()
        var r = Math.floor(Math.random() * (correctImgArr.length));
        $(".interface").html('<img src="'+ correctImgArr[r] +'" class="giphy" />')
        $(".interface").prepend("<h2>Correct!</h2>")
        $(".interface").append('<div class="question"><p>'+ questionArr[random].fact+'</p></div>');
        questionArr.splice(random, 1); // Remove this question from game
        clearInterval(showQuestion);
        stopCountDown();
        setTimeout(startGame,3000);
    }

    function wrongAnswer() {
        $(".interface").empty()
        var r = Math.floor(Math.random() * (wrongImgArr.length));
        $(".interface").html('<img src="'+ wrongImgArr[r] +'" class="giphy" />')
        $(".interface").prepend("<h2>Incorrect!</h2>")
        $(".interface").append('<div class="question"><p>'+ questionArr[random].fact+'</p></div>');
        questionArr.splice(random, 1); // Remove this question from game
        clearInterval(showQuestion);
        stopCountDown();
        setTimeout(startGame,3000);
    }

    function timeUp() {
        $(".interface").empty()
        var r = Math.floor(Math.random() * (wrongImgArr.length));
        $(".interface").html('<img src="'+ wrongImgArr[r] +'" class="giphy" />')
        $(".interface").prepend("<h2>Time's Up!</h2>")
        $(".interface").append('<div class="question"><p>'+ questionArr[random].fact+'</p></div>');
        clearInterval(showQuestion);
        stopCountDown();
        setTimeout(startGame,5000);
    }

    function startCountDown() {
        if (!timerRunning) {
        setInterval(countDown,1000);
        timerRunning = true;
        }
    }
    function stopCountDown() {
        clearInterval(countDown);
    }

    function countDown() {
        var timeLeft = parseInt($("#timer").text());
        timeLeft--;
        $("#timer").html(timeLeft);
    }


    var correctImgArr = ["assets/images/bill-murray.gif","assets/images/kramer.gif","assets/images/obama.gif", "assets/images/so-smart.gif","assets/images/thats-it.gif","assets/images/think.gif","assets/images/usmart.gif","assets/images/walter-white.gif"]
    var wrongImgArr = ["assets/images/3rd-rock.gif","assets/images/big-show.gif","assets/images/dr-cox.gif","assets/images/nope.gif","assets/images/u-thought-wrong.gif","assets/images/ur-wrong.gif","assets/images/wallstreet.gif",]
    
    //Holds our question objects
    var questionArr = [
        {question:"In what year did the war of 1812 begin?", 
          a:"1912",
          b:"1763",
          c:"1817",
          answer:"1812",
          fact: "The War of 1812 (1812–1815) was a conflict fought between the United States, the United Kingdom, and their respective allies.",
        },
        {question:"What is Genghis Khan's real name?", 
        a: "Xi Jinping",
        b:"Chinggis",
        c:"Babar",
        answer:"Temujin",
        fact: "Temujin, (c.1162 - 1227CE) was the founder of the Mongol Empire, which became the largest contiguous land empire in history.",
        },
        {question:"The Achaemenid Empire, also known as the First Persian Empire lasted from 530-330 BCE. Who founded this great empire?", 
        a: "Xerxes",
        b:"Darius",
        c:"Alexander the Great",
        answer:"Cyrus the Great",
        fact: "Cyrus the Great founded the Achaemenid Empire, the largest empire the world had seen to date, after overthrowing and conquering the Median Empire, then expanding throughout the Near East."
        },
        {question:"Which of the following empires had no written language?", 
        a: "Gupta Empire",
        b:"The Aztec Empire",
        c:"The Babylonian Empire",
        answer:"Incan Empire",
        fact: "The Incan Empire was the largest pre-Columbian empire in the Americas. Despite having no writing system, they administered a huge swath of territory with the aid of a counting system based on knots."
        },
        {question:"How many Punic Wars were there?", 
        a: "1",
        b:"2",
        c:"4",
        answer:"3",
        fact: "The Third Punic War (149–146 BCE) was the last of the Punic Wars fought between the Roman Republic and Carthage. The war ended with the total destruction of Carthage, the annexation of its territory, and the enslavement of its people."
        },
        {question:"During the French Revolution, who was the primary force behind the infamous 'Reign of Terror?'",
        a:"Louis XVI",
        b:"Charles de Gaulle",
        c:"Napoleon Bonaparte",
        answer:"Maximiellen Robespierre",
        fact:"Between June 1793 and the end of July 1794, there were 16,594 official death sentences in France, of which 2,639 were in Paris.",
        },
        {question:"What event led to the United States entering World War I?", 
        a: "The sinking of the USS Maine",
        b:"Germany declared war on the US",
        c:"The attack on Pearl Harbor",
        answer:"The sinking of the Lusitania",
        fact:"The Lusitania was a British Ocean Liner sunk by a German U-boat where 128 Americans died. The event caused such an uproar in the US, that it ultimately led to the decision to join the war two years later."
        },
        {question:"The Nazi invasion of which country triggered the beginning of WWII in Europe?", 
        a: "France",
        b:"Belgium",
        c:"Austria",
        answer:"Poland",
        fact:"Geramny invaded Poland on September 1, 1939. Britain and France declared war soon after in retaliation.",
        },
        {question:"The French and Indian War is better known across the world as which of the following?", 
        a: "The Franco-American War",
        b:"The Thirty Years War",
        c:"The British Colonial War",
        answer:"Seven Years War",
        fact:"The Seven Years War (1756 - 1763) was the first truly global conflict, involving every great European Power at the time and spanning five continents",
        },
        
    ]

});