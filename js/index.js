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

class MailForm {
    constructor() {
        this.form = document.getElementById("contact-form");
        this.form.onsubmit = this.handleSubmit;
    }

    handleSubmit = (evt) => {
        const senderName = this.form[0].value;
        const senderEmail = this.form[1].value;
        const senderOrganization = this.form[2].value;
        const senderMessage = this.form[3].value;

        const encodedURI = encodeURI(`mailto:marcinzemlok@gmail.com?subject=Portfolio contact&body=Sender name: ${senderName}\nSender email: ${senderEmail}\nSender organization: ${senderOrganization}\nMessage:\n${senderMessage}`);

        window.open(
            encodedURI,
            "_blank"
        );

        evt.preventDefault;
    }
}

mailForm = new MailForm();
