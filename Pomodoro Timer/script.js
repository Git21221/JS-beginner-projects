class PomodoroTimer 
{
    constructor(workDuration, breakDuration) 
    {
        this.workDuration = workDuration * 60;
        this.breakDuration = breakDuration * 60;
        this.timer = null;
        this.isWorking = true;
        this.workAudio = new Audio("work.mp3");
        this.breakAudio = new Audio("break.mp3");
        this.workAudio.loop = true;
        this.breakAudio.loop = true;
    }

    startTimer() 
    {
        this.timer = setInterval(() => 
        {
            this.updateTimer();
        }, 1000);

        if(this.isWorking) 
        {
            this.workAudio.play();
            this.breakAudio.pause();
        } 
        else 
        {
            this.breakAudio.play();
            this.workAudio.pause();
        }
    }

    stopTimer() 
    {
        clearInterval(this.timer);
        this.workAudio.pause();
        this.breakAudio.pause();
    }

    updateTimer() 
    {
        const timeDisplay = document.getElementById("time-display");

        if(this.isWorking) 
        {
            this.workDuration--;
        } 
        else 
        {
            this.breakDuration--;
        }

        if(this.workDuration === 0 && this.isWorking) 
        {
            this.stopTimer();
            this.isWorking = false;
            alert("Time for a break!");
            this.startTimer();
        } 
        else if(this.breakDuration === 0 && !this.isWorking) 
        {
            this.stopTimer();
            this.isWorking = true;
            alert("Back to work!");
            this.startTimer();
        }

        const minutes = Math.floor(this.isWorking ? this.workDuration / 60 : this.breakDuration / 60);
        const seconds = this.isWorking ? this.workDuration % 60 : this.breakDuration % 60;

        const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
        const displaySeconds = seconds < 10 ? "0" + seconds : seconds;

        timeDisplay.innerText = `${displayMinutes}:${displaySeconds}`;
    }

    resetTimer() 
    {
        this.stopTimer();
        this.workDuration = document.getElementById("work-duration").value * 60;
        this.breakDuration = document.getElementById("break-duration").value * 60;
        this.isWorking = true;
        const timeDisplay = document.getElementById("time-display");
        const displayMinutes = this.workDuration < 10 ? "0" + this.workDuration : this.workDuration;
        timeDisplay.innerText = `${displayMinutes}:00`;
    }
}

    const startButton = document.getElementById("start-button");
    const resetButton = document.getElementById("reset-button");
    const timer = new PomodoroTimer(
        document.getElementById("work-duration").value,
        document.getElementById("break-duration").value
    );

    startButton.addEventListener("click", () => 
    {
        timer.startTimer();
        startButton.disabled = true;
        resetButton.disabled = false;
    });

    resetButton.addEventListener("click", () => 
    {
        timer.resetTimer();
        startButton.disabled = false;
        resetButton.disabled = true;
    });