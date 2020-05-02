export default (d: HTMLDocument, s: string, id: string, 
  jsSrc: string, cb: ((this: GlobalEventHandlers, ev: Event) => any) | null) => {
  const fjs = d.getElementsByTagName(s)[0]
  const js: HTMLScriptElement = d.createElement("script")
  js.id = id
  js.src = jsSrc
  if (fjs && fjs.parentNode) {
    fjs.parentNode.insertBefore(js, fjs)
  } else {
    d.head.appendChild(js)
  }
  js.onload = cb
}