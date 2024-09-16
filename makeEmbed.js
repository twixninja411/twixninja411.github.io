
function stPosForNoDot(src)
{
  let ytPos = src.indexOf("youtube.com");
  if (ytPos != -1)
  {
    let vQuPos = src.indexOf("?v=");
    let vAmPos = src.indexOf("&v=");
    let vPos = (vQuPos == -1) ? vAmPos : vQuPos;
    if (vPos != -1)
    {
      return vPos + 3;
    }
  }
  return -1;
}

function stPosForDot(src)
{
  let ytPos = src.indexOf("youtu.be");
  if(ytPos != -1)
  {
    let fsPos = src.indexOf("/",ytPos);
    if(fsPos != -1)
    {
      return fsPos + 1;
    }
  }
  return -1;
}

function makeEmbed() {
  let dstEle = document.getElementById("dstlink");
  dstEle.innerHTML = '';
  
  let src = document.forms["embedForm"]["srclink"].value;
  let stPos1 = stPosForNoDot(src);
  let stPos2 = stPosForDot(src);
  let stPos = (stPos1 == -1) ? stPos2 : stPos1;
  if (stPos != -1)
  {
  	let nextAmPos = src.indexOf("&",stPos);
  	let nextQuPos = src.indexOf("?",stPos);
    let endPos = Math.min(((nextAmPos == -1) ? src.length : nextAmPos), ((nextQuPos == -1) ? src.length : nextQuPos));
    //let endPos = (nextAmPos == -1) ? src.length : nextAmPos;
    let vStr = src.substring(stPos,endPos);
    let newLink = "https://youtube.com/embed/" + vStr;
    
    let pEle = document.createElement("p");
    let pText = document.createTextNode(newLink);
    pEle.appendChild(pText);
    dstEle.appendChild(pEle);
  }
  return false;
}
