document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');
    const loadingProgress = document.createElement('div');
    loadingProgress.id = 'loading-progress';
    loadingScreen.appendChild(loadingProgress);

    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        loadingProgress.style.width = `${progress}%`;
        loadingProgress.textContent = `${Math.round(progress)}%`;
        
        if (progress === 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                content.classList.remove('hidden');
            }, 500); // Short delay after reaching 100%
        }
    }, 100);

    // Fallback in case loading takes too long
    setTimeout(() => {
        if (!loadingScreen.classList.contains('hidden')) {
            clearInterval(loadingInterval);
            loadingScreen.classList.add('hidden');
            content.classList.remove('hidden');
        }
    }, 5000); // Max 5 seconds loading time

    /* -------------------- Smooth Scrolling -------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    /* -------------------- Gallery Slideshow -------------------- */
    const galleryPhotos = document.querySelectorAll('.gallery-photo');
    let currentPhoto = 0;

    function showNextPhoto() {
        galleryPhotos[currentPhoto].classList.remove('active');
        currentPhoto = (currentPhoto + 1) % galleryPhotos.length;
        galleryPhotos[currentPhoto].classList.add('active');
    }

    setInterval(showNextPhoto, 5000); // Auto-slide every 5 seconds

    galleryPhotos.forEach(photo => {
        photo.addEventListener('click', function() {
            this.classList.toggle('zoom');
        });
    });

    /* -------------------- Timeline Animation -------------------- */
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    /* -------------------- Video Progress Tracker -------------------- */
    const video = document.querySelector('video');
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.querySelector('#video-section').appendChild(progressBar);

    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progress}%`;
    });

    /* -------------------- Wishes Section -------------------- */
    let wishCount = 0;
    const wishForm = document.getElementById('wish-form');
    const wishCountElement = document.getElementById('wish-count');
    const wishesList = document.getElementById('wishes-list');

    wishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const wishText = wishForm.querySelector('textarea').value;
        if (wishText.trim() !== '') {
            wishCount++;
            wishCountElement.textContent = wishCount;
            addWishToList(wishText);
            displayConfetti();
            displayPopupMessage("Your wish has been sent!");
            wishForm.reset();
        }
    });

    function addWishToList(wish) {
        const li = document.createElement('li');
        li.textContent = wish;
        wishesList.appendChild(li);
    }

    function displayPopupMessage(message) {
        const popup = document.createElement('div');
        popup.classList.add('popup-message');
        popup.textContent = message;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 3000);
    }


    // Music control functionality
    musicControl.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
            musicControl.textContent = '🔊';
        } else {
            bgMusic.pause();
            musicControl.textContent = '🔇';
        }
    });

   /* Countdown Timer */
const countdownTimer = document.getElementById('countdown-timer');
const eventDate = new Date('2024-10-11T00:00:00').getTime(); // Pastikan format ini benar dan didukung browser

function updateCountdown() {
    const now = new Date().getTime(); // Mendapatkan waktu saat ini
    const timeLeft = eventDate - now; // Menghitung sisa waktu hingga acara

    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)); // Konversi dari milidetik ke hari
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Sisa jam
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)); // Sisa menit
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000); // Sisa detik

        countdownTimer.textContent = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
        countdownTimer.textContent = "Happy Birthday,Maira! Today we celebrate YOU, my love, my joy, my everything!";
    }
}

// Update countdown setiap 1 detik
setInterval(updateCountdown, 1000);


    /* -------------------- Confetti Effect -------------------- */
    function displayConfetti() {
        const confettiElement = document.createElement('div');
        confettiElement.className = 'confetti';
        document.body.appendChild(confettiElement);

        setTimeout(() => {
            confettiElement.remove();
        }, 3000); // Remove after 3 seconds
    }

    /* -------------------- Birthday Quiz -------------------- */
    const quizContainer = document.getElementById('quiz-container');
    const questionContainer = document.getElementById('question-container');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-button');
    const scoreContainer = document.getElementById('score-container');
    const scoreElement = document.getElementById('score');

    let shuffledQuestions, currentQuestionIndex, score;

    const questions = [
        {
            question: "What is Humaira's birth month?",
            answers: [
                { text: 'January', correct: false },
                { text: 'June', correct: false },
                { text: 'September', correct: false },
                { text: 'October', correct: true }
            ]
        },
        {
            question: "What is the most important thing you wish to achieve in life with someone?",
            answers: [
                { text: "Building a harmonious and happy family", correct: true },
                { text: "Supporting each other in every step", correct: true },
                { text: "Living a life full of blessings", correct: true },
                { text: "Being together in both joy and challenges", correct: true }
            ]
        },
        {
            question: "What is the best way to face challenges in life together?",
            answers: [
                { text: "With patience and prayer", correct: true },
                { text: "By communicating and supporting each other", correct: true },
                { text: "By staying calm and finding solutions together", correct: true },
                { text: "Facing it with a sincere heart", correct: true }
            ]
        },
        {
            question: "What are you most grateful for in someone by your side?",
            answers: [
                { text: "Their presence that always brings peace", correct: true },
                { text: "The way they understand without saying much", correct: true },
                { text: "Their sincere and thoughtful care", correct: true },
                { text: "All the little things that make life feel better", correct: true }
            ]
        },
        {
            question: "What does love mean to you in the context of Ta'aruf?",
            answers: [
                { text: "Love based on good and sincere intentions", correct: true },
                { text: "Mutual respect and care for each other", correct: true },
                { text: "Love that grows with time, full of sincerity", correct: true },
                { text: "Building a love that brings goodness and blessings", correct: true }
            ]
        },
        {
            question: "What do you think can make a relationship stronger?",
            answers: [
                { text: "Honesty and openness", correct: true },
                { text: "Understanding each other even when we disagree", correct: true },
                { text: "Patience in facing differences", correct: true },
                { text: "Willingness to always support one another", correct: true }
            ]
        },
        {
            question: "If we're having a tough day, what do you need from me the most?",
            answers: [
                { text: "Support and prayers to get through it all", correct: true },
                { text: "Your presence that makes everything easier", correct: true },
                { text: "A smile that encourages and gives meaning", correct: true },
                { text: "Time to listen and share", correct: true }
            ]
        },
        {
            question: "In your opinion, what is most important in maintaining a relationship?",
            answers: [
                { text: "Mutual trust and support", correct: true },
                { text: "Respecting differences and maintaining communication", correct: true },
                { text: "Commitment to strengthening each other in every situation", correct: true },
                { text: "Having good intentions to bring goodness", correct: true }
            ]
        },
        {
            question: "How do we keep the warmth in our relationship?",
            answers: [
                { text: "By reminding each other of goodness", correct: true },
                { text: "Through prayers together for the blessings of our relationship", correct: true },
                { text: "With small but meaningful gestures", correct: true },
                { text: "Sharing stories and always listening", correct: true }
            ]
        },
        {
            question: "What do you appreciate most in a person you want as a partner?",
            answers: [
                { text: "Their honesty and sincerity", correct: true },
                { text: "The way they respect and value the relationship", correct: true },
                { text: "Their care and affection", correct: true },
                { text: "Their presence that always brings peace to the heart", correct: true }
            ]
        },
        {
            question: "If you could send one important message to our relationship, what would it be?",
            answers: [
                { text: "May Allah always bless every step we take together", correct: true },
                { text: "I hope we continue to support each other in goodness", correct: true },
                { text: "May we build a future full of love and happiness together", correct: true },
                { text: "I pray that our relationship is always based on good intentions", correct: true }
            ]
        }
    ];

    function startQuiz() {
        score = 0;
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        nextButton.classList.remove('hide');
        scoreContainer.classList.add('hide');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        if (currentQuestionIndex < shuffledQuestions.length) {
            showQuestion(shuffledQuestions[currentQuestionIndex]);
        } else {
            showScore();
        }
    }

    function showQuestion(question) {
        questionContainer.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        setStatusClass(document.body, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
        if (correct) score++;
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            nextButton.innerText = 'Finish';
            nextButton.classList.remove('hide');
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function showScore() {
        resetState();
        questionContainer.innerText = `You scored ${score} out of ${questions.length}!`;
        scoreContainer.classList.remove('hide');
        scoreElement.innerText = score;
        nextButton.innerText = 'Restart';
        nextButton.classList.remove('hide');
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });

    startQuiz();
});