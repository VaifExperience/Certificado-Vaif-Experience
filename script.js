/**
 * VAIF EXPERIENCE — Portal Oficial de Certificados
 * script.js · 2026
 */

const portalScreen   = document.getElementById('portalScreen');
const certScreen     = document.getElementById('certScreen');
const nameInput      = document.getElementById('participantName');
const nameError      = document.getElementById('nameError');
const certNameEl     = document.getElementById('certName');
const loadingOverlay = document.getElementById('loadingOverlay');

/* Injeta imagens base64 */
function injectImages() {
  document.getElementById('portalLogoImg').src  = IMG_VAIF;
  document.getElementById('certLogoVaif').src   = IMG_VAIF;
  document.getElementById('certLogoFed').src    = IMG_FED;
  document.getElementById('certLogoDebora').src = IMG_DEBORA;
}

function showLoading() { loadingOverlay.style.display = 'flex'; }
function hideLoading() { loadingOverlay.style.display = 'none'; }

function setError(msg) {
  nameInput.classList.add('input-error');
  nameError.textContent = msg;
  nameError.classList.add('visible');
}
function clearError() {
  nameInput.classList.remove('input-error');
  nameError.classList.remove('visible');
}

function toTitleCase(str) {
  return str.trim().replace(/\s+/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function generateCertificate() {
  clearError();
  const raw = nameInput.value.trim();
  if (!raw)        { setError('Por favor, informe seu nome.'); nameInput.focus(); return; }
  if (raw.length < 2) { setError('O nome precisa ter ao menos 2 caracteres.'); nameInput.focus(); return; }

  certNameEl.textContent = toTitleCase(raw);

  portalScreen.style.opacity    = '0';
  portalScreen.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    portalScreen.style.display  = 'none';
    certScreen.style.display    = 'block';
    certScreen.style.opacity    = '0';
    certScreen.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      certScreen.style.opacity = '1';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }));
  }, 400);
}

function newCertificate() {
  certScreen.style.opacity    = '0';
  certScreen.style.transition = 'opacity 0.35s ease';
  setTimeout(() => {
    certScreen.style.display    = 'none';
    nameInput.value             = '';
    clearError();
    portalScreen.style.display  = 'flex';
    portalScreen.style.opacity  = '0';
    portalScreen.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      portalScreen.style.opacity = '1';
      nameInput.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }));
  }, 350);
}

async function downloadPDF() {
  showLoading();
  try {
    const cert      = document.getElementById('certificate');
    const actionBar = document.getElementById('actionBar');
    actionBar.style.display = 'none';

    const canvas = await html2canvas(cert, {
      scale: 2, useCORS: true, allowTaint: true,
      backgroundColor: '#F5EFE6', logging: false, imageTimeout: 15000,
    });
    actionBar.style.display = '';

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, 297, 210);
    pdf.save(`Certificado_VAIF_Experience_${certNameEl.textContent.replace(/\s+/g,'_')}.pdf`);
  } catch(err) {
    console.error(err);
    alert('Não foi possível gerar o PDF. Use "Imprimir" e salve como PDF.');
  } finally {
    hideLoading();
  }
}

function printCertificate() { window.print(); }

nameInput.addEventListener('keydown', e => { if (e.key === 'Enter') generateCertificate(); });
nameInput.addEventListener('input',   ()  => { if (nameInput.classList.contains('input-error')) clearError(); });

document.addEventListener('DOMContentLoaded', () => {
  injectImages();
  document.body.style.opacity    = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  }));
  if (window.innerWidth > 768) nameInput.focus();
});
