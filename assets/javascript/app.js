$(document).ready(function () {

    //Variable that will hold our interval for question timer
    var showQuestion;

    var timerRunning = false;

    var random;

    $(".user-info").hide();

    //Start Game
    $(".start").on("click", function () {
        startGame();
        $(".user-info").show();
    });

    //Sets interval on main game function
    function startGame() {
        nextQuestion();
    };
    //Main function driving the game
    function nextQuestion() {
        showQuestion = setTimeout(timeUp, 1000 * 30);
        if (questionArr.length > 0) {
            //Empties any previous content in game interface
            $(".interface").empty();
            //Selects random question and answer choices
            random = Math.floor(Math.random() * (questionArr.length));

            //Displays Question, timer and shuffled answer choices:
            $(".interface").append('<div class="question"><p>' + questionArr[random].question + '</p></div>');
            $(".question").append('<div id="time-left"><p>Time left: <span id="timer">30</span> seconds</p>')
            //Starts countdown
            startCountDown();
            var choices = shuffleChoices();

            for (i = 0; i < choices.length; i++) {
                choices[i]();
            }

            //Array of functions so we can randomize answer choices; Fisher-Yates algorithm.
            function shuffleChoices() {
                var answerChoices = [choice1, choice2, choice3, choice4];

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
                return answerChoices;
            }

            //These functions append our answer choices below our question. Get shuffled in shuffleChoices().
            function choice1() {
                $(".interface").append('<div class="choices"><p>' + questionArr[random].a + '</p></div>')
            };
            function choice2() {
                $(".interface").append('<div class="choices"><p>' + questionArr[random].b + '</p></div>')
            };
            function choice3() {
                $(".interface").append('<div class="choices"><p>' + questionArr[random].c + '</p></div>')
            };
            function choice4() {
                $(".interface").append('<div class="choices"><p>' + questionArr[random].answer + '</p></div>')
            };

            //User selects answer
            $(".choices").on("click", function () {
                if ($(this).text() === questionArr[random].answer) {
                    rightAnswer();
                }
                else {
                    wrongAnswer();
                }
            });
        }
        else {
            $(".interface").empty();
            clearInterval(showQuestion);
            $(".interface").append('<h2 id ="game-over">We\'re out of questions, so...<br>GAME OVER.</h2>');
            $(".interface").append('<button type="button" class="btn btn-success btn-lg d-flex justify-content-center replay">Play again?</button>')
            $(".replay").on("click", function () {
                location.reload();
            });

        }
    };

    function rightAnswer() {
        $(".interface").empty()
        var r = Math.floor(Math.random() * (correctImgArr.length));
        $(".interface").html('<img src="' + correctImgArr[r] + '" class="img-fluid giphy" />')
        $(".interface").prepend("<h2>Correct!</h2>")
        $(".interface").append('<div class="question"><p>' + questionArr[random].fact + '</p></div>');
        var newScore = parseInt($("#score").text());
        $("#score").html(newScore + 10);
        questionArr.splice(random, 1); // Remove this question from game
        clearInterval(showQuestion);
        stopCountDown();
        setTimeout(startGame, 5000);
    }

    function wrongAnswer() {
        $(".interface").empty()
        var r = Math.floor(Math.random() * (wrongImgArr.length));
        $(".interface").html('<img src="' + wrongImgArr[r] + '" class="img-fluid giphy" />')
        $(".interface").prepend("<h2>Incorrect!</h2>")
        $(".interface").append('<div class="question"><p>' + questionArr[random].fact + '</p></div>');
        var newScore = parseInt($("#score").text());
        $("#score").html(newScore - 10);
        questionArr.splice(random, 1); // Remove this question from game
        clearInterval(showQuestion);
        stopCountDown();
        setTimeout(startGame, 5000);
    }

    function timeUp() {
        $(".interface").empty()
        var r = Math.floor(Math.random() * (timeUpImgArr.length));
        $(".interface").html('<img src="' + timeUpImgArr[r] + '" class="img-fluid giphy" />')
        $(".interface").prepend("<h2>Time's Up!</h2>")
        $(".interface").append('<div class="question"><p>' + questionArr[random].fact + '</p></div>');
        var newScore = parseInt($("#score").text());
        $("#score").html(newScore - 10);
        questionArr.splice(random, 1); // Remove this question from game
        clearInterval(showQuestion);
        stopCountDown();
        setTimeout(startGame, 5000);
    }

    function startCountDown() {
        if (!timerRunning) {
            setInterval(countDown, 1000);
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


    var correctImgArr = ["assets/images/sopranos.gif", "assets/images/kramer.gif", "assets/images/obama.gif", "assets/images/so-smart.gif", "assets/images/thats-it.gif", "assets/images/think.gif", "assets/images/usmart.gif", "assets/images/walter-white.gif", "assets/images/finger-right.gif", "assets/images/colbert.gif",];
    var wrongImgArr = ["assets/images/3rd-rock.gif", "assets/images/big-show.gif", "assets/images/dr-cox.gif", "assets/images/nope.gif", "assets/images/u-thought-wrong.gif", "assets/images/ur-wrong.gif", "assets/images/wallstreet.gif",];
    //Holds our question objects
    var timeUpImgArr = ["assets/images/cobain.gif","assets/images/times-up.gif","assets/images/tick-tock.gif",];

    var questionArr = [
        {
            question: "In what year did the war of 1812 begin?",
            a: "1912",
            b: "1763",
            c: "1817",
            answer: "1812",
            fact: "The War of 1812 (1812–1815) was a conflict fought between the United States, the United Kingdom, and their respective allies.",
        },
        {
            question: "What is Genghis Khan's real name?",
            a: "Xi Jinping",
            b: "Chinggis",
            c: "Babar",
            answer: "Temujin",
            fact: "Temujin, (c.1162 - 1227CE) was the founder of the Mongol Empire, which became the largest contiguous land empire in history.",
        },
        {
            question: "The Achaemenid Empire, also known as the First Persian Empire lasted from 530-330 BCE. Who founded this great empire?",
            a: "Xerxes",
            b: "Darius",
            c: "Alexander the Great",
            answer: "Cyrus the Great",
            fact: "Cyrus the Great founded the Achaemenid Empire, the largest empire the world had seen to date, after overthrowing and conquering the Median Empire, then expanding throughout the Near East."
        },
        {
            question: "Which of the following empires had no written language?",
            a: "Gupta Empire",
            b: "The Aztec Empire",
            c: "The Babylonian Empire",
            answer: "Incan Empire",
            fact: "The Incan Empire was the largest pre-Columbian empire in the Americas. Despite having no writing system, they administered a huge swath of territory with the aid of a counting system based on knots."
        },
        {
            question: "How many Punic Wars were there?",
            a: "1",
            b: "2",
            c: "4",
            answer: "3",
            fact: "The Third Punic War (149–146 BCE) was the last of the Punic Wars fought between the Roman Republic and Carthage. The war ended with the total destruction of Carthage, the annexation of its territory, and the enslavement of its people."
        },
        {
            question: "During the French Revolution, who was the primary force behind the infamous 'Reign of Terror?'",
            a: "Louis XVI",
            b: "Charles de Gaulle",
            c: "Napoleon Bonaparte",
            answer: "Maximiellen Robespierre",
            fact: "Between June 1793 and the end of July 1794, there were 16,594 official death sentences in France, of which 2,639 were in Paris.",
        },
        {
            question: "What event led to the United States entering World War I?",
            a: "The sinking of the USS Maine",
            b: "Germany declared war on the US",
            c: "The attack on Pearl Harbor",
            answer: "The sinking of the Lusitania",
            fact: "The Lusitania was a British Ocean Liner sunk by a German U-boat where 128 Americans died. The event caused such an uproar in the US, that it ultimately led to the decision to join the war two years later."
        },
        {
            question: "The Nazi invasion of which country triggered the beginning of WWII in Europe?",
            a: "France",
            b: "Belgium",
            c: "Austria",
            answer: "Poland",
            fact: "Geramny invaded Poland on September 1, 1939. Britain and France declared war soon after in retaliation.",
        },
        {
            question: "The French and Indian War is better known across the world as which of the following?",
            a: "The Franco-American War",
            b: "The Thirty Years War",
            c: "The British Colonial War",
            answer: "Seven Years War",
            fact: "The Seven Years War (1756 - 1763) was the first truly global conflict, involving every great European Power at the time and spanning five continents",
        },
        {
            question: "What was the goal of the Marshall Plan?",
            a: "To rebuild war-devastated regions",
            b: "To remove trade-barriers",
            c: "To prevent the spread of Communism.",
            answer: "All of these",
            fact: "The Marshall Plan was an American initiative to rebuild Western Europe after WWII."
        },
        {
            question: "Which war was ended by the Treaty of Paris in 1763?",
            a: "The Thirty Years War",
            b: "The Hundred Years War",
            c: "The Franco-Prussian War",
            answer: "The Seven Years War",
            fact: "The Treaty of Paris ended the Seven Years War (aka The French and Indian War), resulting in France ceding most of its colonial possesions to England and Spain"
        },
        {
            question: "Who was the only US President to serve more than two-terms?",
            a: "George Washington",
            b: "Abraham Lincoln",
            c: "Theodore Roosevelt",
            answer: "Franklin D. Roosevelt",
            fact: "Franklin D. Roosevelt served as president for over 12 years, the longest of any president. He was elected four times, and died shortly into his fourth term in 1945."
        },
        {
            question: "Which African Civilization ruled Ancient Egypt as the 25th Dynasty?",
            a: "Mali",
            b: "Libyan Empire",
            c: "Aksum",
            answer: "Kush",
            fact: "The Kingdom of Kush was an regional power for over a thousand years. Kush controlled a large territory surrounding the Nile in what is today Sudan.",
        },
        {
            question: "Which Roman general is famous for conquering and annexing Gaul?",
            a: "Magnus Sextus Pompey",
            b: "Scipio Africanus",
            c: "Magnus Graecus Sulla",
            answer: "Gaius Julius Caesar",
            fact: "Julius Caesar's 'Gallic Wars' lasted from 58 - 50 BCE. The wars pacified the various Gallic tribes and formally annexed the huge territory of Gaul into the Roman Republic.",
        },
        {
            question: "Which former Roman army commander and Germanic King led the Visigoths to sack Rome in 410 CE?",
            a: "Theodosius",
            b: "Genseric",
            c: "Theodoric",
            answer: "Alaric",
            fact: "Alaric's sack of Rome was the first time the city had been sacked in over 1000 years.",
        },
        {
            question: "Which famous general from history terrorized Italy by crossing the Alps with a large army that included war elephants?",
            a: "Napoleon Bonaparte",
            b: "Brennus",
            c: "Geiseric of the Vandals",
            answer: "Hannibal Barca",
            fact: "Hannibal stunned the Romans by taking an overland journey from Spain to Italy through the Alps. His army initially consisted of 38,000 infantry, 8,000 cavalry and 38 elephants",
        },
        {
            question: "Situated on the North African coast (modern-day Tunisia), the great city-state of Carthage was actually founded as a colony by which great sea-faring civilization?",
            a: "Eqyptians",
            b: "Romans",
            c: "Greeks",
            answer: "Phoenicians",
            fact: "Carthage was founded in 814 BC by the Phoenician state of Tyre. Carthage gained independence around 650 BCE and established its political hegemony over other Phoenician settlements throughout the western Mediterranean",
        },
        {
            question: "Who was the first emperor of a unified China?",
            a: "Tang of Shang",
            b: "Zhou Ren",
            c: "Zhao Chengjiao",
            answer: "Qin Shi Huang",
            fact: "Qin Shi Huang (259 - 210 BCE) was the founder of the Qin dynasty. He became King of Qin at 13, and later, at 38, emperor of unified-China after conquering all of the warring states in 221 BCE.",
        },
        {
            question: "Which English king was deposed executed after being tried for treason by the House of Commons during the English civil wars?",
            a: "James II",
            b: "William III",
            c: "Henry IV",
            answer: "Charles I",
            fact: "Charles I was monarch of the three kingdoms of England, Scotland, and Ireland from 1625 until his execution in 1649",
        },
        {
            question: "Who was the first Prime Minister of Canada?",
            a: "Alexander Mackenzie",
            b: "Pierre Trudeau",
            c: "Jean Cretien",
            answer: "Sir John A MacDonald",
            fact: "Sir John Alexander Macdonald (1815 – 1891) was the first Prime Minister of Canada (1867–1873, 1878–1891). The dominant figure of Canadian Confederation, he had a political career which spanned almost half a century.",
        },
        {
            question: "Which leader declared Brazil's independence and founded the Empire of Brazil?",
            a: "Joao I",
            b: "Simon Bolivar",
            c: "Tiradentes",
            answer: "Dom Pedro I",
            fact: "Dom Pedro I  (1798 – 1834), nicknamed 'the Liberator', was the founder and first ruler of the Empire of Brazil. As King Dom Pedro IV, he reigned briefly over Portugal.",
        },
    ]

});