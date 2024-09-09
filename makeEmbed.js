
function makeEmbed() {
  let dstEle = document.getElementById("dstlink");
  dstEle.innerHTML = '';
  
  let src = document.forms["embedForm"]["srclink"].value;
  let vQuPos = src.indexOf("?v=");
  let vAmPos = src.indexOf("&v=");
  let vPos = (vQuPos == -1) ? vAmPos : vQuPos;
  if (vPos != -1)
  {
  	let stPos = vPos + 3;
  	let nextAmPos = src.indexOf("&",stPos);
    let endPos = (nextAmPos == -1) ? src.length : nextAmPos;
    let vStr = src.substring(stPos,endPos);
    let newLink = "https://youtube.com/embed/" + vStr;
    
    let aEle = document.createElement("a");
    aEle.setAttribute("href",newLink);
    aEle.setAttribute("target","_blank");
    let aText = document.createTextNode(newLink);
    aEle.appendChild(aText);
    dstEle.appendChild(aEle);
  }
  return false;
}
