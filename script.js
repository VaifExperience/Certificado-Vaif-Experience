const input = document.getElementById('nomeParticipante');
const btnGerar = document.getElementById('btnGerar');
const btnPdf = document.getElementById('btnPdf');
const btnImprimir = document.getElementById('btnImprimir');
const btnNovo = document.getElementById('btnNovo');
const painel = document.getElementById('painelEntrada');
const acoes = document.getElementById('acoesCertificado');
const area = document.getElementById('areaCertificado');
const nomeCert = document.getElementById('nomeNoCertificado');
const certificado = document.getElementById('certificado');

function normalizarNome(nome){
  return nome.trim().replace(/\s+/g,' ');
}
function gerar(){
  const nome = normalizarNome(input.value);
  if(!nome){
    input.focus();
    input.placeholder = 'Digite o nome completo primeiro';
    return;
  }
  nomeCert.textContent = nome;
  painel.classList.add('oculto');
  area.classList.remove('oculto');
  acoes.classList.remove('oculto');
  const url = new URL(window.location.href);
  url.searchParams.set('nome', nome);
  history.replaceState(null,'',url);
  setTimeout(()=>area.scrollIntoView({behavior:'smooth',block:'start'}),80);
}
function novo(){
  area.classList.add('oculto');
  acoes.classList.add('oculto');
  painel.classList.remove('oculto');
  input.select();
  const url = new URL(window.location.href);
  url.searchParams.delete('nome');
  history.replaceState(null,'',url);
}
async function baixarPDF(){
  if(!window.html2canvas || !window.jspdf){
    window.print();
    return;
  }
  btnPdf.textContent = 'Gerando...';
  btnPdf.disabled = true;
  try{
    const canvas = await html2canvas(certificado,{scale:2,useCORS:true,backgroundColor:null});
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('landscape','mm','a4');
    pdf.addImage(imgData,'PNG',0,0,297,210);
    const nomeArquivo = 'Certificado-VAIF-' + nomeCert.textContent.replace(/[^a-zA-Z0-9À-ÿ]+/g,'-') + '.pdf';
    pdf.save(nomeArquivo);
  } finally {
    btnPdf.textContent = 'Baixar PDF';
    btnPdf.disabled = false;
  }
}
btnGerar.addEventListener('click', gerar);
input.addEventListener('keydown', e => { if(e.key === 'Enter') gerar(); });
btnNovo.addEventListener('click', novo);
btnImprimir.addEventListener('click', () => window.print());
btnPdf.addEventListener('click', baixarPDF);
window.addEventListener('DOMContentLoaded',()=>{
  const params = new URLSearchParams(location.search);
  const nome = params.get('nome');
  if(nome){ input.value = nome; gerar(); }
});
