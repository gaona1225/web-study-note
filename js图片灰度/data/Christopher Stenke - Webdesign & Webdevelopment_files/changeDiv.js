var sicherung=new Array();
var active=new Array();
var speed=3;

function changeDiv(id)
{
	var object=document.getElementById(id);
	var hoehe=object.style.height;
	var sichtbar=object.style.display;
	var nr=id.substr(-1);
	if(active[nr]!=false && active[nr]!=true)
		active[nr]=false;
	//alert ('Sicherung fuer '+nr+' ist '+sicherung[nr]);
	if(active[nr]==false)
	{
		active[nr]=true; //erneutes ausfuehren stoppen, bis auf/zuklappen erledigt
		if (sichtbar=='none')
		{
			object.style.height='0px';
			object.style.display='block';
			changeDivRek(id,'0',hoehe.substr(0,3));
		}
		else
		{
			sicherung[nr]=0;
			changeDivRek(id,hoehe.substr(0,(hoehe.length-2)),'0');
		}
	}
}
function changeDivRek(id,curHeight,maxHeight)
{
	var object=document.getElementById(id);
	var nr=id.substr(-1);
	curHeight=parseInt(curHeight);
	if(curHeight < maxHeight) 	
	{ 		
		curHeight+=speed; 	
	} 	
	else 	
	{ 		
		if(sicherung[nr]==0) 			
			sicherung[nr]=curHeight; 		
		curHeight-=speed; 	
	} 	
	object.style.height=curHeight+'px'; 	
	if(curHeight == 0 || (curHeight>=maxHeight && maxHeight!=0))
	{
		if(curHeight <= 0)
		{
			object.style.display='none';
			object.style.height=''+sicherung[nr]+'px';
		}
		active[nr]=false;
	}
	else
	{
	window.setTimeout(function() {changeDivRek(id,curHeight,maxHeight)}, 20);
	}
}