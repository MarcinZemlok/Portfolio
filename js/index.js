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
--------------------------------------------------------------------------------
// [04/03/2020]        Marcin Żemlok
        Initial timeline functionality.                                      ///
//////////////////////////////////////////////////////////////////////////////*/
///////////////////////////////////////////////////////////////////////////////
// SCROLL INDICATOR                                                        ///
/////////////////////////////////////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////////////////
// TIMELINE                                                                ///
/////////////////////////////////////////////////////////////////////////////
class TimelinePoint {
    /**
     * This class takes care of rendering and animating points on the timeline
     * @param {Object} point
     * @param {Object} path
     */
    constructor(point, path) {
        this.point = point;
        this.path = path;
    }
}

class Timeline {
    /**
     * This class takes care of rendering and animating timeline.
     */

    constructor() {
        const svgPoints = document.querySelectorAll("#timeline circle");

        this.points = [];

        svgPoints.forEach(po => {
            const id = po.getAttribute("id");
            const pa = document.querySelector(`#${id} + path`)

            this.points.push(new TimelinePoint(po, pa));
        });
    }
}

timeline = new Timeline();

console.log(timeline);
