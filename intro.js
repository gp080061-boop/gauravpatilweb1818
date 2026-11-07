
(function(){
  const intro=document.getElementById('cinematicIntro');
  const welcome=document.getElementById('introWelcome');
  const videoScreen=document.getElementById('introVideoScreen');
  const video=document.getElementById('lamboIntroVideo');
  const soundButton=document.getElementById('introSound');
  const skip=document.getElementById('skipIntro');
  if(!intro||!video) return;
  let done=false;
  function finish(){
    if(done)return; done=true;
    try{video.pause();}catch(e){}
    try{stopEngineSound();}catch(e){}
    intro.classList.add('is-leaving');
    setTimeout(()=>{intro.remove();document.body.classList.add('intro-complete');},800);
  }
  function startVideo(){
    if(done)return;
    welcome.style.display='none';
    videoScreen.classList.add('is-active');
    videoScreen.setAttribute('aria-hidden','false');
    video.currentTime=0;
    video.play().catch(()=> {
      // If browser blocks autoplay, a click on sound/play control starts it.
      soundButton.textContent='▶ PLAY VIDEO';
    });
    startEngineSound();
  }
  // Start the original driving video immediately; side welcome animates for 5 seconds (3 seconds + 2 seconds).
  startVideo();
  // Keep the entire cinematic intro short: exactly 6 seconds before portfolio reveal.
  setTimeout(finish,6000);
  skip.addEventListener('click',finish);
  const carAudio=document.getElementById('lamboCarAudio');
  function startEngineSound(){
    try{if(carAudio){carAudio.currentTime=0;carAudio.volume=0.78;carAudio.play().catch(()=>{});}}catch(e){}
  }
  function stopEngineSound(){
    try{if(carAudio){carAudio.pause();carAudio.currentTime=0;}}catch(e){}
  }
  soundButton.addEventListener('click',()=>{
    const soundOn=carAudio ? carAudio.paused : video.muted;
    video.muted=true;
    if(soundOn){
      video.play().catch(()=>{});
      startEngineSound();
      soundButton.textContent='🔊 SOUND ON';
    }else{
      stopEngineSound();
      soundButton.textContent='🔇 SOUND OFF';
    }
  });
})();
