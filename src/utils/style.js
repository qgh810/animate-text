export const insertStyles = function (id, styles) {
  let style = document.getElementById(id)
  if (!style) {
    style = document.createElement('style') 
    style.id = id
  }
  style.innerHTML = styles
  document.body.appendChild(style)
}
