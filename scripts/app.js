/*
 * @Author: dontry
 * @Date:   2017-08-07 21:13:13
 * @Last Modified by:   dontry
 * @Last Modified time: 2017-08-07 21:19:45
 */
'use strict';
window.onload = function() {
    var panels = document.querySelectorAll('.panel');
    panels.forEach(function(panel) {
        panel.addEventListener('click', togglePanelOpen);
        panel.addEventListener('mouseout', removeOpen);
        panel.addEventListener('transitionend', toggleActive);
    });

}


function togglePanelOpen(e) {
    e.preventDefault();
    this.classList.add('open');
}

function removeOpen(e) {
    e.preventDefault();
    this.classList.remove('open');
}

function toggleActive(e) {
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active')
    }
}
