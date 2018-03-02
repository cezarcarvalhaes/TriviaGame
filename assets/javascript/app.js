$(document).ready (function() {

var questionArr = [
    {question:"When was the war of 1812?", 
      a:"1912",
      b:"1763",
      c:"1941",
      answer:"1812"
    },
    {question:"What is Genghis Khan's real name?", 
    a: "Xi Jinping",
    b:"Chinggis",
    c:"Babar",
    answer:"Temujin"
    },
    {question:"The Achaemenid Empire, also known as the First Persian Empire lasted from 530-330 BCE. Who founded this great empire?", 
    a: "Xerxes",
    b:"Darius",
    c:"Alexander the Great",
    answer:"Cyrus the Great"
    },
]


//Start Game
    $(".start").on("click",function(){
        $(".start").remove();
        displayQuestion();
    });

    function displayQuestion() {
        //Prints random question and answer choices
        var r = Math.floor(Math.random() * (questionArr.length));
        
        //Displays Question and shuffled answer choices:
        $(".interface").append('<div class="question"><p>'+ questionArr[r].question+'</p></div>');
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

        function choice1(){
        $(".interface").append('<div class="choices"><p>'+ questionArr[r].a +'</p></div>')
        };
        function choice2(){
        $(".interface").append('<div class="choices"><p>'+ questionArr[r].b +'</p></div>')  
        };
        function choice3(){
        $(".interface").append('<div class="choices"><p>'+ questionArr[r].c +'</p></div>')
        };
        function choice4(){
        $(".interface").append('<div class="choices"><p>'+ questionArr[r].answer +'</p></div>')
        };

        //User selects answer
        $(".choices").on("click",function(){
            if ($(this).text() === questionArr[r].answer) {
                $(this).addClass('correct');
                var newScore = parseInt($("#score").text());
                $("#score").html(newScore+10);
                console.log("Correct!");
                questionArr.splice(r, 1); // Remove this question from game
                rightAnswer();
                setTimeout(nextQuestion,4000);
            }
            else {
                $(this).addClass('wrong');
                var newScore = parseInt($("#score").text());
                $("#score").html(newScore-10);
                console.log(this.text)
                questionArr.splice(r, 1); // Remove this question from game
                wrongAnswer();
                setTimeout(nextQuestion,4000);
            }
        });
    };

    function nextQuestion() {
        $(".interface").empty();
        displayQuestion();
    }

    function rightAnswer() {
        $(".interface").empty()
        var r = Math.floor(Math.random() * (correctImgArr.length));
        $(".interface").html('<img src="'+ correctImgArr[r] +'" class="giphy" />')
        $(".interface").prepend("<h2>Correct!</h2>")
    }

    function wrongAnswer() {
        $(".interface").empty()
        var r = Math.floor(Math.random() * (wrongImgArr.length));
        $(".interface").html('<img src="'+ wrongImgArr[r] +'" class="giphy" />')
        $(".interface").prepend("<h2>Correct!</h2>")   
    }

    var correctImgArr = ["assets/images/bill-murray.gif","assets/images/kramer.gif","assets/images/obama.gif", "assets/images/so-smart.gif","assets/images/thats-it.gif","assets/images/think.gif","assets/images/usmart.gif","assets/images/walter-white.gif"]
    var wrongImgArr = ["assets/images/3rd-rock.gif","assets/images/big-show.gif","assets/images/dr-cox.gif","assets/images/nope.gif","assets/images/u-thought-wrong.gif","assets/images/ur-wrong.gif","assets/images/wallstreet.gif","assets/images/dog-fail.gif",]
});