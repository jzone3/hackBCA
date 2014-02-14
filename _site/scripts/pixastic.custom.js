/*
 * Pixastic - JavaScript Image Processing Library
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 * MIT License [http://www.pixastic.com/lib/license.txt]
 */


if(typeof jQuery!="undefined"&&jQuery&&jQuery.fn){jQuery.fn.pixastic=function(action,options){var newElements=[];this.each(function(){if(this.tagName.toLowerCase()=="img"&&!this.complete){return;}
var res=Pixastic.process(this,action,options);if(res){newElements.push(res);}});if(newElements.length>0)
return jQuery(newElements);else
return this;};};Pixastic.Actions.desaturate={process:function(params){var useAverage=!!(params.options.average&&params.options.average!="false");if(Pixastic.Client.hasCanvasImageData()){var data=Pixastic.prepareData(params);var rect=params.options.rect;var w=rect.width;var h=rect.height;var p=w*h;var pix=p*4,pix1,pix2;if(useAverage){while(p--)
data[pix-=4]=data[pix1=pix+1]=data[pix2=pix+2]=(data[pix]+data[pix1]+data[pix2])/3}else{while(p--)
data[pix-=4]=data[pix1=pix+1]=data[pix2=pix+2]=(data[pix]*0.3+data[pix1]*0.59+data[pix2]*0.11);}
return true;}else if(Pixastic.Client.isIE()){params.image.style.filter+=" gray";return true;}},checkSupport:function(){return(Pixastic.Client.hasCanvasImageData()||Pixastic.Client.isIE());}}
Pixastic.Actions.glow={process:function(params){var amount=(parseFloat(params.options.amount)||0);var blurAmount=parseFloat(params.options.radius)||0;amount=Math.min(1,Math.max(0,amount));blurAmount=Math.min(5,Math.max(0,blurAmount));if(Pixastic.Client.hasCanvasImageData()){var rect=params.options.rect;var blurCanvas=document.createElement("canvas");blurCanvas.width=params.width;blurCanvas.height=params.height;var blurCtx=blurCanvas.getContext("2d");blurCtx.drawImage(params.canvas,0,0);var scale=2;var smallWidth=Math.round(params.width/scale);var smallHeight=Math.round(params.height/scale);var copy=document.createElement("canvas");copy.width=smallWidth;copy.height=smallHeight;var clear=true;var steps=Math.round(blurAmount*20);var copyCtx=copy.getContext("2d");for(var i=0;i<steps;i++){var scaledWidth=Math.max(1,Math.round(smallWidth-i));var scaledHeight=Math.max(1,Math.round(smallHeight-i));copyCtx.clearRect(0,0,smallWidth,smallHeight);copyCtx.drawImage(blurCanvas,0,0,params.width,params.height,0,0,scaledWidth,scaledHeight);blurCtx.clearRect(0,0,params.width,params.height);blurCtx.drawImage(copy,0,0,scaledWidth,scaledHeight,0,0,params.width,params.height);}
var data=Pixastic.prepareData(params);var blurData=Pixastic.prepareData({canvas:blurCanvas,options:params.options});var p=rect.width*rect.height;var pix=p*4,pix1=pix+1,pix2=pix+2,pix3=pix+3;while(p--){if((data[pix-=4]+=amount*blurData[pix])>255)data[pix]=255;if((data[pix1-=4]+=amount*blurData[pix1])>255)data[pix1]=255;if((data[pix2-=4]+=amount*blurData[pix2])>255)data[pix2]=255;}
return true;}},checkSupport:function(){return Pixastic.Client.hasCanvasImageData();}}
Pixastic.Actions.lighten={process:function(params){var amount=parseFloat(params.options.amount)||0;amount=Math.max(-1,Math.min(1,amount));if(Pixastic.Client.hasCanvasImageData()){var data=Pixastic.prepareData(params);var rect=params.options.rect;var p=rect.width*rect.height;var pix=p*4,pix1=pix+1,pix2=pix+2;var mul=amount+1;while(p--){if((data[pix-=4]=data[pix]*mul)>255)
data[pix]=255;if((data[pix1-=4]=data[pix1]*mul)>255)
data[pix1]=255;if((data[pix2-=4]=data[pix2]*mul)>255)
data[pix2]=255;}
return true;}else if(Pixastic.Client.isIE()){var img=params.image;if(amount<0){img.style.filter+=" light()";img.filters[img.filters.length-1].addAmbient(255,255,255,100*-amount);}else if(amount>0){img.style.filter+=" light()";img.filters[img.filters.length-1].addAmbient(255,255,255,100);img.filters[img.filters.length-1].addAmbient(255,255,255,100*amount);}
return true;}},checkSupport:function(){return(Pixastic.Client.hasCanvasImageData()||Pixastic.Client.isIE());}}