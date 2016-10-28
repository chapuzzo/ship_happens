'use strict';

var createElement = function(name, cssProperties, clickCallback){
  var createdElement = document.createElement('div')
  createdElement.dataset.name = name

  var defaultCSSProperties = {
    backgroundColor: '#00A300FF',
    position: 'absolute',
    top: '30px',
    bottom: '30px',
    left: '30px',
    right: '30px'
  }

  Object.assign(createdElement.style, Object.assign(defaultCSSProperties, cssProperties || {}))


  createdElement.addEventListener('click', function(event){
    clickCallback.call(event.target, event.target.dataset.name)
  })

  return createdElement
}

var Bus = function(){
  var callbacks = {}

  return {
    on: function(eventName, callback){
      callbacks[eventName] = callbacks[eventName] || []
      callbacks[eventName].push(callback)
    },
    trigger: function(eventName, data){
      callbacks[eventName].forEach(function(callback){
        callback(data)
      })
    }
  }
}

var bus = Bus()

var clickedElement = function(){
  this.style.display = 'none'
  bus.trigger('removed_anchor')
}

document.addEventListener('DOMContentLoaded',function(){
  var anchorsToRemove = 2

  bus.on('removed_anchor', function(){
    console.log('removed_anchor')
    anchorsToRemove -= 1
    if (anchorsToRemove == 0)
      alert('win')
  })

  var ship = createElement('ship')
  var anchor1 = createElement('anchor1', {
    backgroundColor: '#FF9C00FF',
    zIndex: 2,
    left: '50px',
    width: '30px',
    height: '80px',
    top: 'auto'
  },
  clickedElement
  )

  var anchor2 = createElement('anchor2', {
    backgroundColor: '#FF9C00FF',
    zIndex: 2,
    left: 'auto',
    right: '50px',
    width: '30px',
    height: '80px',
    top: 'auto'
  },
  clickedElement
  )

  document.body.appendChild(anchor1)
  document.body.appendChild(anchor2)
  document.body.appendChild(ship)
})
