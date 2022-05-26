'use strict'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const noContext = document.getElementById('noContextMenu');

  noContext.addEventListener('contextmenu', e => {
    e.preventDefault()})