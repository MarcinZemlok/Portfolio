class Background {
    constructor() {
        this.lightDiv = document.getElementById('background-light');
        document.addEventListener('mousemove', this.update);
    }

    update = (evt) => {
        this.lightDiv.style.top = evt.clientY + 'px';
        this.lightDiv.style.left = evt.clientX + 'px';
    }
}

background = new Background();
