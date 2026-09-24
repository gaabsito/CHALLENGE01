const hotels = [
 {name:'Casa Salina',city:'Mallorca',price:155,photo:'photo-1571896349842-33c89424de2d',description:'Luz mediterránea, tardes de piscina y el mar a un paseo.'},
 {name:'Patio del Alba',city:'Granada',price:95,photo:'photo-1566073771259-6a8506099945',description:'Un refugio con encanto para perderse entre calles con historia.'},
 {name:'El Jardín Urbano',city:'Madrid',price:135,photo:'photo-1566665797739-1674de7a421a',description:'Diseño tranquilo y desayunos largos en el corazón de la ciudad.'},
 {name:'Refugio del Norte',city:'Asturias',price:110,photo:'photo-1449158743715-0a90ebb6d2d8',description:'Verde hasta el horizonte, aire fresco y calma entre montañas.'}
];
const $ = id => document.getElementById(id);
const euros = value => new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value);
let selected;
function render(){
 let visible=hotels.filter(h=>(!$('destination').value||h.city===$('destination').value)&&h.price<=Number($('budget').value));
 if($('sort').value==='price') visible.sort((a,b)=>a.price-b.price);
 $('count').textContent=`${visible.length} hoteles para tu próxima escapada`;
 $('hotels').replaceChildren();
 if(!visible.length){$('hotels').textContent='No hay hoteles con estos filtros. Prueba otro destino o precio.';return;}
 visible.forEach(h=>{
 const card=document.createElement('article');card.className='card';
 card.innerHTML=`<img class="photo" src="https://images.unsplash.com/${h.photo}?auto=format&fit=crop&w=800&q=80" alt="Imagen ilustrativa de ${h.name}" loading="lazy"><p class="location">${h.city} · España</p><h3>${h.name}</h3><p class="description">${h.description}</p><div class="card-bottom"><p>Desde <strong>${euros(h.price)}</strong> / noche</p><button type="button" aria-label="Ver estancia en ${h.name}">Ver estancia ↗</button></div>`;
 card.querySelector('button').onclick=()=>{selected=h;$('hotel-name').textContent=h.name;$('hotel-description').textContent=h.description;$('nights').value=2;estimate();$('details').showModal();};
 $('hotels').append(card);
 });
}
function estimate(){const n=Number($('nights').value);$('estimate').textContent=Number.isInteger(n)&&n>=1&&n<=30?`${n} noches · ${euros(n*selected.price)} por habitación`:'Introduce entre 1 y 30 noches.';}
$('filters').addEventListener('change',render);
$('filters').addEventListener('submit',e=>e.preventDefault());
$('filters').addEventListener('reset',()=>setTimeout(render,0));
$('nights').addEventListener('input',estimate);
$('close').onclick=()=>$('details').close();
render();
