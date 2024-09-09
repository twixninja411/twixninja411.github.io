
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
    
    let pEle = document.createElement("p");
    let pText = document.createTextNode(newLink);
    pEle.appendChild(pText);
    dstEle.appendChild(pEle);
  }
  return false;
}
