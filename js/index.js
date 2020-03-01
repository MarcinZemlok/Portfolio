/*//////////////////////////////////////////////////////////////////////////////
///                                PORTFOLIO                                 ///
//============================================================================//
//        Author: Marcin Żemlok
//         Email: marcinzemlok@gmail.com
//       Version: 0.1
//
//   Description: My portfolio page.
//
// Creation date: 01/03/2020
================================= CHANGE LOG ===================================
// [01/03/2020]        Marcin Żemlok
        * Initial work draft.
        * Scroll position indicator.                                         ///
//////////////////////////////////////////////////////////////////////////////*/
function scrollIndicator() {
    this.body = document.body;
    this.html = document.documentElement;

    this.windowHeight = (Math.max(this.body.scrollHeight,
        this.body.offsetHeight,
        this.html.clientHeight,
        this.html.scrollHeight,
        this.html.offsetHeight) -
        window.visualViewport.height);

    this.indicateScroll = () => {
        const scroll = window.scrollY / this.windowHeight * 80;
        document.querySelector("#nav-progres").style.height = `${scroll}%`
    };

    window.onscroll = this.indicateScroll;
} new scrollIndicator();
