if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
const $=s=>document.querySelector(s);
const B='https://www.gstatic.com/firebasejs/10.12.2/';
const CFG={apiKey:"AIzaSyADLUeub0qgKIeaBM7XoKVAWrRSD_ROqKQ",authDomain:"nont-4cc80.firebaseapp.com",databaseURL:"https://nont-4cc80-default-rtdb.firebaseio.com",projectId:"nont-4cc80",storageBucket:"nont-4cc80.firebasestorage.app",messagingSenderId:"679454459736",appId:"1:679454459736:web:59a1e6ff67f19c8ba1472d"}; // تأكد من databaseURL من لوحة Firebase
let F=null;
try{const m=await Promise.all([import(B+'firebase-app.js'),import(B+'firebase-auth.js'),import(B+'firebase-database.js')]);F=Object.assign({},...m)}catch(e){console.warn('Firebase غير متاح: اللعب محليًا')}
if(F)start(F);
function start(F){
const app=F.initializeApp(CFG),auth=F.getAuth(app),db=F.getDatabase(app);
const ERR={'auth/invalid-email':'البريد الإلكتروني غير صحيح','auth/user-not-found':'لا يوجد حساب بهذا البريد','auth/wrong-password':'كلمة المرور خاطئة','auth/invalid-credential':'البريد أو كلمة المرور غير صحيحة','auth/email-already-in-use':'هذا البريد مسجّل بالفعل','auth/weak-password':'كلمة المرور ضعيفة (6 أحرف على الأقل)','auth/network-request-failed':'تعذّر الاتصال بالإنترنت','auth/too-many-requests':'محاولات كثيرة، حاول لاحقًا','auth/operation-not-allowed':'هذه الطريقة غير مفعّلة في Firebase','auth/popup-closed-by-user':'أُغلقت نافذة جوجل','auth/unauthorized-domain':'أضف نطاق الموقع في Authorized domains'};
let mode='in',prev=null,busy=false,last=0;
function overlay(msg=''){const up=mode==='up';
$('#auth').innerHTML=`<div style="position:fixed;inset:0;z-index:90;overflow:auto;background:radial-gradient(circle at 50% 20%,#1b2a55,#070b16 70%);display:flex;align-items:center;justify-content:center;padding:20px;color:#f2ead3;user-select:text"><div style="width:100%;max-width:360px"><div style="text-align:center;font-size:54px">👑</div><h2 style="text-align:center;color:#f5c542;margin:4px 0 14px">${up?'إنشاء حساب':'تسجيل الدخول'}</h2>
<input id="em" type="email" dir="ltr" placeholder="البريد الإلكتروني" autocomplete="email"><div style="height:8px"></div><input id="pw" type="password" dir="ltr" placeholder="كلمة المرور" autocomplete="${up?'new-password':'current-password'}">${up?'<div style="height:8px"></div><input id="pw2" type="password" dir="ltr" placeholder="تأكيد كلمة المرور">':''}
<div id="aerr" style="color:#f87171;min-height:22px;margin:6px 0;font-size:13px">${msg}</div>
<button id="go" style="width:100%">${up?'إنشاء الحساب':'دخول'}</button><div style="height:8px"></div><button id="gg" class="alt" style="width:100%">الدخول بحساب Google</button><div style="height:8px"></div><button id="gu" class="alt" style="width:100%">اللعب كزائر (مع الترتيب)</button><div style="height:8px"></div><button id="lo" class="alt" style="width:100%">لعب محلي بدون حساب</button>
<p style="text-align:center;font-size:13px"><a id="sw" style="color:#f5c542">${up?'لديّ حساب':'إنشاء حساب جديد'}</a>${up?'':' • <a id="fg" style="color:#8f9ab3">نسيت كلمة المرور؟</a>'}</p></div></div>`;
$('#go').onclick=submit;$('#gg').onclick=()=>run(google);$('#gu').onclick=()=>run(()=>F.signInAnonymously(auth));$('#lo').onclick=()=>{$('#auth').innerHTML=''};
$('#sw').onclick=()=>{mode=up?'in':'up';overlay()};const f=$('#fg');if(f)f.onclick=forgot}
async function run(fn){try{$('#aerr').textContent='';await fn()}catch(e){$('#aerr').textContent=ERR[e.code]||('خطأ: '+(e.message||e.code))}}
const okMail=s=>/^\S+@\S+\.\S+$/.test(s);
function submit(){run(async()=>{const em=$('#em').value.trim(),pw=$('#pw').value;if(!okMail(em))throw{code:'auth/invalid-email'};if(pw.length<6)throw{code:'auth/weak-password'};
if(mode==='up'){if(pw!==$('#pw2').value)throw{message:'كلمتا المرور غير متطابقتين'};await F.createUserWithEmailAndPassword(auth,em,pw)}else await F.signInWithEmailAndPassword(auth,em,pw)})}
function forgot(){run(async()=>{const em=$('#em').value.trim();if(!okMail(em))throw{code:'auth/invalid-email'};await F.sendPasswordResetEmail(auth,em);$('#aerr').style.color='#4ade80';$('#aerr').textContent='تم إرسال رابط الاستعادة إلى بريدك'})}
async function google(){const p=new F.GoogleAuthProvider();try{await F.signInWithPopup(auth,p)}catch(e){if(e.code==='auth/popup-blocked')await F.signInWithRedirect(auth,p);else throw e}}
async function sync(){const u=auth.currentUser,G=window.GAME;if(!u||!G||busy||Date.now()-last<8000)return;busy=true;
try{const S=G.S,inc=G.ips(),w=Math.floor(G.net()),p=prev||{w:1000,ts:Date.now()};
const cap=p.w+((Date.now()-p.ts)/1000*.8+2)*(inc*1.5+50);const wealth=Math.max(0,Math.floor(Math.min(w,cap)));
await F.set(F.ref(db,'players/'+u.uid),{name:String(S.name||'Zjzj Jejs').slice(0,24),avatar:String(S.av||'👑').slice(0,8),wealth,income:Math.min(1e12,Math.floor(inc)),level:Math.min(200,G.lvl(S)),ts:F.serverTimestamp()});
prev={w:wealth,ts:Date.now()};last=Date.now()}catch(e){console.warn('sync',e.code||e.message)}busy=false}
async function top100(){try{const s=await F.get(F.query(F.ref(db,'players'),F.orderByChild('wealth'),F.limitToLast(100)));const L=[];s.forEach(c=>{L.push({id:c.key,...c.val()})});window.LB=L.reverse()}catch(e){window.LB=[];alert('تعذّر تحميل الترتيب: '+(e.code||e.message))}}
window.Cloud={sync,top100,uid:()=>auth.currentUser&&auth.currentUser.uid,logout:()=>F.signOut(auth)};
F.onAuthStateChanged(auth,async u=>{if(!u){prev=null;mode='in';overlay();return}$('#auth').innerHTML='';
try{const s=await F.get(F.ref(db,'players/'+u.uid));if(s.exists())prev={w:s.val().wealth||0,ts:Date.now()}}catch(e){}
if(window.GAME){window.GAME.render();setTimeout(sync,1500)}})}
