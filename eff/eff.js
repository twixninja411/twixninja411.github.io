
const pkmnTypes = ["Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"];
const chart = 
[["","","","","","","","","","","","","/","0","","","/",""],
["","/","/","","2","2","","","","","","2","/","","/","","2",""],
["","2","/","","/","","","","2","","","","2","","/","","",""],
["","","2","/","/","","","","0","2","","","","","/","","",""],
["","/","2","","/","","","/","2","/","","/","2","","/","","/",""],
["","/","/","","2","/","","","2","2","","","","","2","","/",""],
["2","","","","","2","","/","","/","/","/","2","0","","2","2","/"],
["","","","","2","","","/","/","","","","/","/","","","0","2"],
["","2","","2","/","","","2","","0","","/","2","","","","2",""],
["","","","/","2","","2","","","","","2","/","","","","/",""],
["","","","","","","2","2","","","/","","","","","0","/",""],
["","/","","","2","","/","/","","/","2","","","/","","2","/","/"],
["","2","","","","2","/","","/","2","","2","","","","","/",""],
["0","","","","","","","","","","2","","","2","","/","",""],
["","","","","","","","","","","","","","","2","","/","0"],
["","","","","","","/","","","","2","","","2","","/","","/"],
["","/","/","/","","2","","","","","","","2","","","","/","2"],
["","/","","","","","2","/","","","","","","","2","2","/",""]];

function makeEff(n)
{
  return {imm:false, eff:n};
}

function makeImm()
{
  return {imm:true, eff:null};
}

function appendEff(e1,e2)
{
  if(e1.imm || e2.imm)
  {
    return makeImm();
  }
  else
  {
    return makeEff(e1.eff + e2.eff);
  }
}

function multFromEff(e)
{
  if(e.imm)
  {
    return "0";
  }
  else if(e.eff >= 0)
  {
    return "" + 2**e.eff;
  }
  else
  {
    return "1/" + 2**(-e.eff);
  }
}


function fixArray()
{
  for(let i=0; i<18; i++)
  {
    for(let j=0; j<18; j++)
    {
      switch(chart[i][j])
      {
        case "2":
          chart[i][j] = makeEff(1);
          break;
        case "/":
          chart[i][j] = makeEff(-1);
          break;
        case "0":
          chart[i][j] = makeImm();
          break;
        default:
          chart[i][j] = makeEff(0);
          break;
      }
    }
  }
}

function parseInput(str)
{
  const tys = []
  let i=0;
  while(i<str.length)
  {
    if(str[i] == " ")
    {
      i++;
    }
    else
    {
      let nextI = str.indexOf(" ",i);
      nextI = (nextI != -1 ? nextI : str.length);
      let tyName = str.substring(i,nextI);
      let ty = pkmnTypes.indexOf(tyName);
      if(ty == -1)
        return null;
      tys.push(ty);
      i = nextI;
    }
  }
  return tys;
}

function makeEffList(defNum)
{
  let ret = {len:defNum, data:[]}
  for(var i=0; i<2*defNum+2; i++)
  {
    ret.data.push([]);
  }
  return ret;
}

function getFromEffList(ls,e)
{
  let i;
  if(e.imm)
  {
    i=0;
  }
  else
  {
    i=1+e.eff+ls.len;
  }
  return ls.data[i]
}

function totalEffForOne(atk, defs)
{
  let total = makeEff(0);
  for(let d=0; d<defs.length; d++)
  {
    total = appendEff(total, chart[atk][defs[d]]);
  }
  return total;
}

function totalEff(defs)
{
  let totalLs = makeEffList(defs.length);
  for(let atk=0; atk<18; atk++)
  {
    var t = totalEffForOne(atk, defs);
    getFromEffList(totalLs,t).push(atk);
  }
  return totalLs;
}

function showEffList(ls)
{
  let es = [];
  for(let i=ls.len; i>=-ls.len; i--)
  {
    es.push(makeEff(i));
  }
  es.push(makeImm());

  let strs = [];
  for(let i=0; i<es.length; i++)
  {
    let e = es[i];
    let tys = getFromEffList(ls,e);
    if(tys.length > 0)
    {
      let m = multFromEff(e);
      var str = "x" + m + ":";
      for(let k=0; k<tys.length; k++)
      {
        str = str + " " + pkmnTypes[tys[k]];
      }
      strs.push(str);
    }
  }
  return strs;
}

function makeLine(dstEle,str)
{
    let pEle = document.createElement("p");
    let pText = document.createTextNode(str);
    pEle.appendChild(pText);
    dstEle.appendChild(pEle);
}

function doStuff()
{
  let dstEle = document.getElementById("dstdiv");
  dstEle.innerHTML = '';

  let input = document.forms["effForm"]["inp"].value;
  let defs = parseInput(input);
  if(defs === null)
  {
    makeLine(dstEle,"Parse error");
  }
  else
  {
    let ls = totalEff(defs);
    let strs = showEffList(ls);
    for(let i=0; i<strs.length; i++)
    {
      makeLine(dstEle,strs[i]);
    }
  }
  return false;
}
