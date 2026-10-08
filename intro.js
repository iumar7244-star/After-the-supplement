(function(){
  const splash=document.getElementById('iusSplash');
  const video=document.getElementById('iusIntroVideo');
  const page=document.getElementById('iusPageAfterIntro') || document.getElementById('iusReportPage');
  if(!splash||!video||!page) return;
  let done=false;
  function finish(){
    if(done) return;
    done=true;
    splash.classList.add('hide');
    page.classList.add('show');
    setTimeout(()=>splash.remove(),700);
  }
  function playAgain(){
    // Used when moving between Create Account and Sign In on the same auth page.
    const old=document.getElementById('iusSplash');
    if(old) old.remove();
    const s=document.createElement('div');s.id='iusSplash';s.className='ius-splash';s.innerHTML='<video id="iusIntroVideo" class="ius-intro-video" autoplay muted playsinline preload="auto"><source src="ius.mp4" type="video/mp4"></video><div class="ius-loading"><div class="ius-spinner"></div><span>Loading IUS AND SONS...</span></div>';
    document.body.prepend(s);
    const v=s.querySelector('video');let finished=false;
    const end=()=>{if(finished)return;finished=true;s.classList.add('hide');page.classList.add('show');setTimeout(()=>s.remove(),700)};
    v.addEventListener('ended',end,{once:true});v.addEventListener('error',()=>setTimeout(end,1200),{once:true});setTimeout(end,7000);
  }
  window.playIUSIntro=playAgain;
  video.addEventListener('ended',finish,{once:true});
  video.addEventListener('error',()=>setTimeout(finish,1200),{once:true});
  setTimeout(finish,7000);
  ['toLogin','toRegister'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.addEventListener('click',()=>setTimeout(playAgain,0));
  });
})();
