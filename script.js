let move_speed = 3, gravity = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let backgroundMusic = document.getElementById('background-music');
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/die.mp3');

let background = document.querySelector('.background').getBoundingClientRect();
let score_val = document.querySelector('.score_val');
let message = document.getElementById('game-message');
let menu = document.getElementById('menu');
let startButton = document.getElementById('start-button');
let highScoreButton = document.getElementById('high-score-button');
let restartButton = document.getElementById('restart-button');
let leftButton = document.getElementById('left-button');
let upButton = document.getElementById('up-button');
let downButton = document.getElementById('down-button');
let rightButton = document.getElementById('right-button');
let profileButton = document.getElementById('profile-button');
let closeModalButton = document.getElementById('close-modal');
let closeProfileButton = document.getElementById('close-profile-button');
let profileModal = document.getElementById('profile-modal');
let highScore = localStorage.getItem('highScore') || 0;

let game_state = 'Start';
let difficulty = 'easy';
let pipe_frequency = 115; // Frequency of pipe creation, changes with difficulty

img.style.display = 'none';
message.classList.add('messageStyle');

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
highScoreButton.addEventListener('click', showHighScore);
profileButton.addEventListener('click', showProfile);
closeModalButton.addEventListener('click', closeProfile);
closeProfileButton.addEventListener('click', closeProfile);
leftButton.addEventListener('click', () => moveBird(-30, 0));
upButton.addEventListener('click', () => moveBird(0, -30));
downButton.addEventListener('click', () => moveBird(0, 30));
rightButton.addEventListener('click', () => moveBird(30, 0));

document.getElementById('difficulty').addEventListener('change', (e) => {
    difficulty = e.target.value;
    pipe_frequency = difficulty === 'easy' ? 115 : difficulty === 'medium' ? 90 : 70;
});

function startGame() {
    menu.style.display = 'none';
    img.style.display = 'block';
    bird.style.top = '40vh';
    bird.style.left = '30vw'; // Reset position
    game_state = 'Play';
    score_val.innerHTML = '0';
    message.querySelector('p').innerHTML = '';
    message.style.display = 'none';
    backgroundMusic.play();
    play();
}

function restartGame() {
    document.querySelectorAll('.pipe_sprite').forEach(e => e.remove());
    img.style.display = 'block';
    bird.style.top = '40vh';
    bird.style.left = '30vw'; // Reset position
    game_state = 'Play';
    score_val.innerHTML = '0';
    message.querySelector('p').innerHTML = '';
    message.style.display = 'none';
    play();
}

function showHighScore() {
    alert(`High Score: ${highScore}`);
}

function showProfile() {
    document.getElementById('profile-high-score').innerHTML = highScore;
    profileModal.style.display = 'block';
}

function closeProfile() {
    profileModal.style.display = 'none';
}

function play() {
    let pipe_separation = 0;

    function move() {
        if (game_state !== 'Play') return;

        document.querySelectorAll('.pipe_sprite').forEach(element => {
            let pipe_props = element.getBoundingClientRect();
            let bird_props = bird.getBoundingClientRect();

            if (pipe_props.right <= 0) {
                element.remove();
            } else {
                if (isColliding(bird_props, pipe_props)) {
                    endGame();
                    return;
                } else {
                    if (pipe_props.right < bird_props.left && pipe_props.right + move_speed >= bird_props.left && element.increase_score === '1') {
                        score_val.innerHTML = parseInt(score_val.innerHTML) + 1;
                        sound_point.play();
                        element.increase_score = '0';
                    }
                    element.style.left = pipe_props.left - move_speed + 'px';
                }
            }
        });

        requestAnimationFrame(move);
    }

    function create_pipe() {
        if (game_state !== 'Play') return;

        if (pipe_separation > pipe_frequency) {
            pipe_separation = 0;

            let pipe_pos = Math.floor(Math.random() * 43) + 8;

            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_pos - 70 + 'vh';
            document.body.appendChild(pipe_sprite_inv);

            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_pos + 35 + 'vh'; // Adjusted for better gameplay
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';
            document.body.appendChild(pipe_sprite);
        }

        pipe_separation++;
        requestAnimationFrame(create_pipe);
    }

    function endGame() {
        game_state = 'End';
        backgroundMusic.pause();
        sound_die.play();
        if (parseInt(score_val.innerHTML) > highScore) {
            highScore = parseInt(score_val.innerHTML);
            localStorage.setItem('highScore', highScore);
        }
        message.querySelector('p').innerHTML = 'Game Over! Press Restart';
        message.style.display = 'block';
        restartButton.style.display = 'inline';
    }

    requestAnimationFrame(move);
    requestAnimationFrame(create_pipe);
}

function moveBird(xChange, yChange) {
    let birdProps = bird.getBoundingClientRect();
    let newLeft = birdProps.left + xChange;
    let newTop = birdProps.top + yChange;

    // Prevent the bird from moving off-screen
    if (newLeft < 0) newLeft = 0;
    if (newLeft > background.width - birdProps.width) newLeft = background.width - birdProps.width;
    if (newTop < 0) newTop = 0;
    if (newTop > background.height - birdProps.height) newTop = background.height - birdProps.height;

    bird.style.left = newLeft + 'px';
    bird.style.top = newTop + 'px';
}

function isColliding(rect1, rect2) {
    return !(rect2.left > rect1.right || 
             rect2.right < rect1.left || 
             rect2.top > rect1.bottom || 
             rect2.bottom < rect1.top);
}
