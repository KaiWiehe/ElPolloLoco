class Timer {
    second = 0;
    minute = 0;
    hour = 0;
    timerInterval;
    timerContainer;

    startTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            this.timerContainer = document.getElementById('timer');
            this.timerContainer.innerHTML = this.timerContainerHTML();
            this.setTimer();
        }, 1000);
    }

    timerContainerHTML() {
        return (this.hour ? this.hour + ':' : '') + (this.minute < 10 ? '0' + this.minute : this.minute) + ':' + (this.second < 10 ? '0' + this.second : this.second);
    }

    setTimer() {
        this.second++;
        this.second == 60 && (this.minute++, (this.second = 0));
        this.minute == 60 && (this.hour++, (this.minute = 0));
    }
}