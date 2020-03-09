/*//////////////////////////////////////////////////////////////////////////////
///                                PORTFOLIO                                 ///
//============================================================================//
//        Author: Marcin Żemlok
//         Email: marcinzemlok@gmail.com
//       Version: 0.2
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
--------------------------------------------------------------------------------
// [09/03/2020]        Marcin Żemlok
        Basic timeline done.                                                 ///
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
    constructor(point, path, icon, x, y, r) {
        this.x = x
        this.y = y
        this.r = r
        this.point = point;
        this.path = path;
        this.icon = icon;

        // Point settings
        this.point.setAttribute('cx', this.x);
        this.point.setAttribute('cy', this.y);
        this.point.setAttribute('r', this.r);

        // Path settings
        this.pathGap = 10;
        this.calculatePath();
        this.path.setAttribute('d', this.pathString);
        this.path.setAttribute('transform-origin', `${x} ${y}`);

        // Icon settings
        this.icon.style.top = `${this.y}px`;
        this.icon.style.left = `${this.x}px`;
    }

    calculatePath() {
        this.pathString = "";
        // Move to the beginning of first arc
        this.pathString = `${this.pathString} M ${this.x} ${this.y - this.r - this.pathGap}`;
        // Draw first arc
        this.pathString = `${this.pathString} A ${this.r + this.pathGap} ${this.r + this.pathGap} 0 0 1 ${this.x + this.r + this.pathGap} ${this.y}`;
        // Move to the beginning of second arc
        this.pathString = `${this.pathString} M ${this.x} ${this.y + this.r + this.pathGap}`;
        // Draw second arc
        this.pathString = `${this.pathString} A ${this.r + this.pathGap} ${this.r + this.pathGap} 0 0 1 ${this.x - this.r - this.pathGap} ${this.y}`;
    }

    mouseEnter() {
        this.icon.classList.add('icon-hover');
    }

    mouseLeave() {
        this.icon.classList.remove('icon-hover');
    }
}

class Timeline {
    /**
     * This class takes care of rendering and animating timeline.
     */

    constructor(radius) {
        this._init(radius);
    }

    _init(radius = 0) {
        const svgLine = document.querySelector('#timeline rect');
        const svgPoints = document.querySelectorAll('#timeline circle');

        this.x = svgLine.x.baseVal.value;
        this.y = svgLine.y.baseVal.value;
        this.r = radius;
        this.height = svgLine.height.baseVal.value;
        this.width = svgLine.width.baseVal.value;
        this.points = [];

        const inc = this.width / (svgPoints.length + 1);
        svgPoints.forEach((po, i) => {
            const id = po.getAttribute('id');
            const data_icon = po.getAttribute('data-icon');
            const pa = document.querySelector(`#${id} + path`)
            const ico = document.querySelector(`#${data_icon}`)

            const x = this.x + inc * (i + 1);
            const y = this.y + (this.height / 2);

            const tmpTP = new TimelinePoint(po, pa, ico, x, y, this.r);

            po.addEventListener("mouseenter", () => {
                tmpTP.mouseEnter();
            });
            po.addEventListener("mouseleave", () => {
                tmpTP.mouseLeave();
            });

            this.points.push(tmpTP);
        });
    }

    // TODO About me cards functionality
}

var timeline = new Timeline(10);
window.addEventListener('resize', () => {
    timeline._init(10);
});
