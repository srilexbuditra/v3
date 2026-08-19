const WHATSAPP_NUMBER = "6282135238350";
let estimate = {service:"Website Company Profile", total:5000000, feature:"Tidak ada"};

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
menuBtn?.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

function money(n){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n)}

function choosePlan(service, price){
  document.getElementById("project").value = service;
  const p = Number(price);
  document.getElementById("result").hidden = false;
  estimate = {service,total:p,feature:"Tidak ada"};
  document.getElementById("total").textContent = money(p);
  document.getElementById("selectedService").textContent = service;
  document.getElementById("estimasi").scrollIntoView({behavior:"smooth",block:"center"});
}

document.getElementById("estimateForm").addEventListener("submit", e=>{
  e.preventDefault();
  const service = document.getElementById("project").value;
  const featureSelect = document.getElementById("feature");
  const feature = Number(featureSelect.value);
  const base = { "Website Company Profile":2500000, "Web Application":5000000, "REST API / Backend":4500000, "Sistem Informasi Custom":7500000, "Database Development":3500000 }[service] || 5000000;
  const total = base + feature;
  estimate = {service,total,feature:featureSelect.options[featureSelect.selectedIndex].text};
  document.getElementById("result").hidden = false;
  document.getElementById("total").textContent = money(total);
  document.getElementById("selectedService").textContent = service;
  document.getElementById("result").scrollIntoView({behavior:"smooth",block:"center"});
});

function sendWhatsApp(){
  const name=document.getElementById("name").value || "-";
  const company=document.getElementById("company").value || "-";
  const email=document.getElementById("email").value || "-";
  const wa=document.getElementById("wa").value || "-";
  const desc=document.getElementById("desc").value || "-";
  const text=`Halo Srilex Buditra, saya ingin konsultasi proyek.%0A%0ANama: ${encodeURIComponent(name)}%0APerusahaan: ${encodeURIComponent(company)}%0AEmail: ${encodeURIComponent(email)}%0AWhatsApp: ${encodeURIComponent(wa)}%0AJenis proyek: ${encodeURIComponent(estimate.service)}%0AFitur: ${encodeURIComponent(estimate.feature)}%0AEstimasi: ${encodeURIComponent(money(estimate.total))}%0ADeskripsi: ${encodeURIComponent(desc)}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,"_blank");
}

function printEstimate(){
  if(document.getElementById("result").hidden){
    alert("Silakan hitung estimasi terlebih dahulu.");
    return;
  }
  window.print();
}
