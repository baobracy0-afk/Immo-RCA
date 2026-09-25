"use client";

import {useMemo,useState} from "react";
import {Search,MapPin,Home,Building2,Landmark,KeyRound,Heart,Plus,ShieldCheck,ChevronRight,X,UserPlus,Eye,EyeOff,CheckCircle2} from "lucide-react";

const biens=[
 {id:1,type:"Maison",title:"Maison familiale à PK12",price:"450 000 FCFA / mois",loc:"PK12, Bangui",info:"3 chambres",img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"},
 {id:2,type:"Terrain",title:"Terrain résidentiel 500 m²",price:"12 000 000 FCFA",loc:"Bimbo",info:"500 m²",img:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80"},
 {id:3,type:"Appartement",title:"Appartement moderne centre-ville",price:"350 000 FCFA / mois",loc:"Centre-ville, Bangui",info:"2 chambres",img:"https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80"}
];

export default function Page(){
 const[q,setQ]=useState("");
 const[type,setType]=useState("Tous");
 const[fav,setFav]=useState<number[]>([]);
 const[auth,setAuth]=useState<"signup"|"login"|null>(null);
 const[menu,setMenu]=useState(false);
 const[userRole,setUserRole]=useState<"client"|"vendeur"|null>(null);
 const filtered=useMemo(()=>biens.filter(b=>(type==="Tous"||b.type===type)&&(!q||((b.title+" "+b.loc).toLowerCase().includes(q.toLowerCase())))),[q,type]);

 return <main>
  <header className="bg-white/95 backdrop-blur border-b sticky top-0 z-30">
   <div className="container flex items-center justify-between py-4">
    <div className="flex items-center gap-3">
     <div className="w-10 h-10 rounded-xl bg-[#10233f] text-[#d8a84e] grid place-items-center font-black">R</div>
     <div><b className="text-xl text-[#10233f]">Immo RCA</b><div className="text-xs text-gray-500">L'immobilier en Centrafrique</div></div>
    </div>
    <nav className="hidden lg:flex gap-6 text-sm font-semibold"><a href="#annonces">Annonces</a><a href="#terrains">Terrains</a><a href="#agences">Agences</a><a href="#comment">Comment ça marche</a></nav>
    <div className="flex items-center gap-2">
      <button onClick={()=>setAuth("login")} className="hidden sm:inline-flex btn dark"><KeyRound size={16}/><span className="ml-2">Se connecter</span></button>
      <button onClick={()=>setAuth("signup")} className="btn gold"><UserPlus size={16}/><span className="ml-2">Créer un compte</span></button>
    </div>
   </div>
  </header>

  <section className="hero">
   <div className="container py-16 md:py-20">
    <span className="inline-flex gap-2 items-center bg-white/10 rounded-full px-4 py-2 text-sm"><ShieldCheck size={16}/> Annonces immobilières en RCA</span>
    <h1 className="text-4xl md:text-6xl font-black max-w-4xl leading-tight mt-5">Trouvez votre <span className="text-[#d8a84e]">logement, terrain ou local</span> en Centrafrique.</h1>
    <p className="text-white/75 text-lg max-w-2xl mt-5">Recherchez à Bangui et dans les autres villes, comparez les biens et contactez directement les propriétaires et agences.</p>
    <div className="card mt-8 p-3 grid md:grid-cols-[1fr_180px_auto] gap-3">
      <div className="flex items-center gap-2 px-3"><Search/><input className="outline-none w-full" placeholder="Quartier, ville, type de bien..." value={q} onChange={e=>setQ(e.target.value)}/></div>
      <select className="input" value={type} onChange={e=>setType(e.target.value)}><option>Tous</option><option>Maison</option><option>Appartement</option><option>Terrain</option></select>
      <button onClick={()=>document.getElementById("annonces")?.scrollIntoView({behavior:"smooth"})} className="btn gold">Rechercher</button>
    </div>
    <div className="flex flex-wrap gap-3 mt-5 text-sm text-white/70"><span>✓ Recherche simple</span><span>✓ Prix en FCFA</span><span>✓ Contact direct</span></div>
   </div>
  </section>

  <section className="container py-10 grid md:grid-cols-4 gap-4">
   <Stat icon={<Home/>} n="Logements" s="Maisons & appartements"/><Stat icon={<Landmark/>} n="Terrains" s="Parcelles à vendre"/><Stat icon={<Building2/>} n="Locaux" s="Commerces & bureaux"/><Stat icon={<ShieldCheck/>} n="Annonces" s="Infos vérifiables"/>
  </section>

  <section id="annonces" className="container pb-16">
   <div className="flex items-end justify-between mb-6"><div><p className="text-[#d09b35] font-bold">À découvrir</p><h2 className="text-3xl font-black text-[#10233f]">Annonces récentes</h2></div><button className="font-bold flex items-center">Voir tout <ChevronRight size={18}/></button></div>
   {filtered.length===0 ? <div className="card p-10 text-center text-gray-500">Aucun bien ne correspond à votre recherche.</div> :
   <div className="grid md:grid-cols-3 gap-6">{filtered.map(b=><article className="card overflow-hidden hover:-translate-y-1 transition" key={b.id}>
    <div className="relative"><img src={b.img} alt={b.title} className="w-full h-56 object-cover"/><button aria-label="Ajouter aux favoris" onClick={()=>setFav(x=>x.includes(b.id)?x.filter(i=>i!==b.id):[...x,b.id])} className="absolute right-3 top-3 bg-white rounded-full p-3 shadow"><Heart size={18} fill={fav.includes(b.id)?"currentColor":"none"}/></button><span className="absolute left-3 bottom-3 bg-[#10233f] text-white rounded-full px-3 py-1 text-xs font-bold">{b.type}</span></div>
    <div className="p-5"><h3 className="font-black text-lg">{b.title}</h3><div className="text-[#d09b35] font-black mt-2">{b.price}</div><div className="text-gray-500 text-sm mt-2 flex items-center gap-1"><MapPin size={15}/>{b.loc} · {b.info}</div><button onClick={()=>setAuth("signup")} className="btn dark w-full mt-4"><Eye size={17}/><span className="ml-2">Voir le bien</span></button></div>
   </article>)}</div>}
  </section>

  <section id="agences" className="bg-white border-y"><div className="container py-14 grid md:grid-cols-2 gap-10 items-center"><div><p className="text-[#d09b35] font-bold">Pour propriétaires & agences</p><h2 className="text-3xl font-black text-[#10233f]">Publiez votre bien et recevez des demandes.</h2><p className="text-gray-600 mt-3">Créez votre compte gratuitement puis ajoutez photos, prix, localisation, caractéristiques et moyens de contact.</p><button onClick={()=>setAuth("signup")} className="btn gold mt-5"><Plus size={18}/><span className="ml-2">Publier une annonce</span></button></div>
   <div className="card p-6"><h3 className="font-black text-xl">Catégories Immo RCA</h3><div className="grid grid-cols-2 gap-3 mt-5"><Mini t="Vente" d="Maisons & terrains"/><Mini t="Location" d="Longue durée"/><Mini t="Commercial" d="Bureaux & boutiques"/><Mini t="Terrain" d="Parcelles"/></div></div>
  </div></section>

  <section id="comment" className="container py-14"><h2 className="text-3xl font-black text-center text-[#10233f]">Comment ça marche ?</h2><div className="grid md:grid-cols-3 gap-5 mt-8"><Step n="1" t="Créez votre compte" d="Inscrivez-vous rapidement pour sauvegarder vos recherches et favoris."/><Step n="2" t="Recherchez & comparez" d="Consultez photos, prix, surface et informations des biens."/><Step n="3" t="Contactez" d="Appelez ou écrivez au propriétaire ou à l'agence."/></div></section>

  <section className="container pb-16"><div className="rounded-3xl bg-[#f7f1e5] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"><div><p className="text-[#b47d1c] font-bold">Nouveau sur Immo RCA</p><h2 className="text-3xl font-black text-[#10233f] mt-1">Vous cherchez un bien ? Commencez gratuitement.</h2><p className="text-gray-600 mt-2">Votre compte vous permet de retrouver facilement vos favoris.</p></div><button onClick={()=>setAuth("signup")} className="btn dark whitespace-nowrap"><UserPlus size={18}/><span className="ml-2">Créer mon compte</span></button></div></section>

  <footer className="bg-[#10233f] text-white"><div className="container py-10 flex flex-col md:flex-row justify-between gap-4"><div><b className="text-2xl">Immo RCA</b><p className="text-white/60">La plateforme immobilière pour la République centrafricaine.</p></div><div className="text-sm text-white/60">© 2026 Immo RCA · Bangui, RCA</div></div></footer>

  {auth && <AuthModal mode={auth} onClose={()=>setAuth(null)} onSwitch={()=>setAuth(auth==="signup"?"login":"signup")} onAccess={(role)=>{setUserRole(role);setAuth(null)}}/>}
  {userRole && <Dashboard role={userRole} onClose={()=>setUserRole(null)}/>}
 </main>
}

function AuthModal({mode,onClose,onSwitch,onAccess}:{mode:"signup"|"login",onClose:()=>void,onSwitch:()=>void,onAccess:(role:"client"|"vendeur")=>void}){
 const[name,setName]=useState(""); const[email,setEmail]=useState(""); const[password,setPassword]=useState(""); const[role,setRole]=useState<"client"|"vendeur">("client"); const[show,setShow]=useState(false); const[done,setDone]=useState(false);
 const submit=(e:React.FormEvent)=>{e.preventDefault(); if(mode==="signup"){localStorage.setItem("immo_rca_user",JSON.stringify({name,email,role}));} else {const saved=localStorage.getItem("immo_rca_user"); if(saved){try{setRole(JSON.parse(saved).role||"client")}catch{}}} setDone(true);};
 return <div className="fixed inset-0 z-50 bg-[#071426]/70 backdrop-blur-sm grid place-items-center p-4" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
  <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
   <div className="p-6 border-b flex justify-between items-center"><div><div className="text-xs font-bold text-[#b47d1c] uppercase tracking-wide">Immo RCA</div><h2 className="text-2xl font-black text-[#10233f] mt-1">{mode==="signup"?"Créer votre compte":"Se connecter"}</h2></div><button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X/></button></div>
   {done ? <div className="p-8 text-center"><CheckCircle2 className="mx-auto text-green-600" size={52}/><h3 className="font-black text-xl mt-4">{mode==="signup"?"Compte créé !":"Connexion effectuée !"}</h3><p className="text-gray-500 mt-2">{mode==="signup" ? "Votre espace personnel est prêt." : "Bienvenue sur votre espace Immo RCA."}</p><button onClick={()=>onAccess(role)} className="btn dark w-full mt-6">Accéder à mon espace</button></div> :
   <form onSubmit={submit} className="p-6 space-y-4">
    {mode==="signup" && <div><label className="text-sm font-bold">Nom complet</label><input required className="input mt-1" value={name} onChange={e=>setName(e.target.value)} placeholder="Ex. Jean Dupont"/></div>}
    <div><label className="text-sm font-bold">Email</label><input required type="email" className="input mt-1" value={email} onChange={e=>setEmail(e.target.value)} placeholder="vous@email.com"/></div>
    <div><label className="text-sm font-bold">Mot de passe</label><div className="relative"><input required minLength={6} type={show?"text":"password"} className="input mt-1 pr-12" value={password} onChange={e=>setPassword(e.target.value)} placeholder="6 caractères minimum"/><button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-4 text-gray-500">{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></div>
    {mode==="signup" && <div><label className="text-sm font-bold">Je suis</label><div className="grid grid-cols-2 gap-3 mt-2"><button type="button" onClick={()=>setRole("client")} className={"p-4 rounded-xl border text-left "+(role==="client"?"border-[#d8a84e] bg-[#f7f1e5]":"border-gray-200")}><b>🏠 Client</b><div className="text-xs text-gray-500 mt-1">Je cherche un bien</div></button><button type="button" onClick={()=>setRole("vendeur")} className={"p-4 rounded-xl border text-left "+(role==="vendeur"?"border-[#d8a84e] bg-[#f7f1e5]":"border-gray-200")}><b>🏢 Vendeur</b><div className="text-xs text-gray-500 mt-1">Je publie des biens</div></button></div></div>}
    <button className="btn dark w-full">{mode==="signup"?"Créer mon compte":"Se connecter"}</button>
    <p className="text-center text-sm text-gray-500">{mode==="signup"?"Déjà un compte ?":"Pas encore de compte ?"} <button type="button" onClick={onSwitch} className="font-bold text-[#b47d1c]">{mode==="signup"?"Se connecter":"Créer un compte"}</button></p>
   </form>}
  </div>
 </div>
}

function Stat({icon,n,s}:{icon:React.ReactNode,n:string,s:string}){return <div className="card p-5 flex items-center gap-4"><div className="p-3 rounded-xl bg-[#f7f1e5] text-[#b47d1c]">{icon}</div><div><div className="font-black">{n}</div><div className="text-xs text-gray-500">{s}</div></div></div>}
function Mini({t,d}:{t:string,d:string}){return <div className="border rounded-xl p-4 hover:border-[#d8a84e] transition"><b>{t}</b><div className="text-xs text-gray-500">{d}</div></div>}
function Step({n,t,d}:{n:string,t:string,d:string}){return <div className="card p-6"><div className="w-10 h-10 rounded-full bg-[#d8a84e] grid place-items-center font-black">{n}</div><h3 className="font-black text-xl mt-4">{t}</h3><p className="text-gray-500 mt-2">{d}</p></div>}


function Dashboard({role,onClose}:{role:"client"|"vendeur",onClose:()=>void}){
 return <div className="fixed inset-0 z-[60] bg-[#f7f8fa] overflow-y-auto">
  <header className="bg-white border-b sticky top-0 z-10"><div className="container flex items-center justify-between py-4"><div><b className="text-xl text-[#10233f]">Immo RCA</b><div className="text-xs text-gray-500">Mon espace {role==="vendeur"?"vendeur":"client"}</div></div><button onClick={onClose} className="btn dark">Retour aux annonces</button></div></header>
  <div className="container py-8">
   <div className="rounded-3xl bg-[#10233f] text-white p-8"><p className="text-[#d8a84e] font-bold">Bienvenue 👋</p><h1 className="text-3xl md:text-4xl font-black mt-2">{role==="vendeur"?"Espace vendeur":"Espace client"}</h1><p className="text-white/70 mt-2">{role==="vendeur"?"Gérez vos annonces et recevez les demandes des personnes intéressées.":"Retrouvez vos favoris, vos recherches et contactez les propriétaires."}</p></div>
   <div className="grid md:grid-cols-3 gap-5 mt-6">
    {role==="vendeur" ? <>
      <div className="card p-6"><div className="text-3xl">➕</div><h2 className="font-black text-xl mt-3">Publier un bien</h2><p className="text-gray-500 mt-2">Ajoutez maison, appartement, terrain ou local.</p><button className="btn gold mt-4 w-full">Nouvelle annonce</button></div>
      <div className="card p-6"><div className="text-3xl">🏠</div><h2 className="font-black text-xl mt-3">Mes annonces</h2><p className="text-gray-500 mt-2">Gérez vos biens publiés.</p><button className="btn dark mt-4 w-full">Voir mes annonces</button></div>
      <div className="card p-6"><div className="text-3xl">💬</div><h2 className="font-black text-xl mt-3">Demandes reçues</h2><p className="text-gray-500 mt-2">Consultez les contacts intéressés.</p><button className="btn dark mt-4 w-full">Voir les demandes</button></div>
    </> : <>
      <div className="card p-6"><div className="text-3xl">❤️</div><h2 className="font-black text-xl mt-3">Mes favoris</h2><p className="text-gray-500 mt-2">Retrouvez les biens que vous avez enregistrés.</p><button className="btn dark mt-4 w-full">Voir mes favoris</button></div>
      <div className="card p-6"><div className="text-3xl">🔎</div><h2 className="font-black text-xl mt-3">Mes recherches</h2><p className="text-gray-500 mt-2">Reprenez vos recherches immobilières.</p><button className="btn dark mt-4 w-full">Mes recherches</button></div>
      <div className="card p-6"><div className="text-3xl">💬</div><h2 className="font-black text-xl mt-3">Mes contacts</h2><p className="text-gray-500 mt-2">Retrouvez vos échanges avec les vendeurs.</p><button className="btn dark mt-4 w-full">Voir mes contacts</button></div>
    </>}
   </div>
  </div>
 </div>
}
