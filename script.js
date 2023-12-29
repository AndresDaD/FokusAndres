document.addEventListener('DOMContentLoaded', function () {
    // Función para iniciar un temporizador
    function startTimer(duration, display, startButton, pauseButton) {
        let timer = duration, minutes, seconds;
        const intervalId = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(intervalId);
                startButton.removeAttribute('disabled');
                pauseButton.setAttribute('disabled', 'disabled');
            }
        }, 1000);

        startButton.setAttribute('disabled', 'disabled');
        pauseButton.removeAttribute('disabled');

        // Guardar el ID del intervalo para poder pausar
        startButton.dataset.intervalId = intervalId;
    }

    // Función para pausar un temporizador
    function pauseTimer(pauseButton) {
        const startButton = document.getElementById(pauseButton.dataset.startButtonId);
        const intervalId = startButton.dataset.intervalId;

        if (intervalId) {
            clearInterval(intervalId);
            pauseButton.setAttribute('disabled', 'disabled');
        }
    }

    // Función para iniciar o pausar un hábitat
    function toggleHabitat(habitatId) {
        const habitatTimer = document.getElementById(`${habitatId}-timer`);
        const startButton = document.getElementById(`start-${habitatId}`);
        const pauseButton = document.getElementById(`pause-${habitatId}`);

        startButton.addEventListener('click', function () {
            startTimer(getDuration(habitatId), habitatTimer, startButton, pauseButton);
            pauseButton.dataset.startButtonId = `start-${habitatId}`;
        });

        pauseButton.addEventListener('click', function () {
            pauseTimer(pauseButton);
            startButton.removeAttribute('disabled');
        });
    }

    // Obtener la duración según el hábitat
    function getDuration(habitatId) {
        switch (habitatId) {
            case 'enfoque':
                return 25 * 60;
            case 'descanso-corto':
                return 5 * 60;
            case 'descanso-largo':
                return 15 * 60;
            default:
                return 0;
        }
    }

    // Iniciar o pausar cada hábitat
    toggleHabitat('enfoque');
    toggleHabitat('descanso-corto');
    toggleHabitat('descanso-largo');
});
