/**
 * VAIF EXPERIENCE — Portal Oficial de Certificados
 * script.js
 */

/* ─── DOM refs ─── */
const portalScreen   = document.getElementById('portalScreen');
const certScreen     = document.getElementById('certScreen');
const nameInput      = document.getElementById('participantName');
const nameError      = document.getElementById('nameError');
const certNameEl     = document.getElementById('certName');
const loadingOverlay = document.getElementById('loadingOverlay');

/* ─── Inject base64 images into all <img> tags ─── */
function injectImages() {
  // Portal logo
  document.getElementById('portalLogoImg').src = IMG_VAIF;

  // Certificate images
  document.getElementById('certLogoVaif').src   = IMG_VAIF;
  document.getElementById('certLogoFed').src    = IMG_FED;
  document.getElementById('certLogoDebora').src = IMG_DEBORA;
}

/* ─── Utilities ─── */
function showLoading() { loadingOverlay.style.display = 'flex'; }
function hideLoading() { loadingOverlay.style.display = 'none'; }

function setError(msg) {
  nameInput.classList.add('input-error');
  nameError.textContent = msg || 'Por favor, informe seu nome.';
  nameError.classList.add('visible');
}

function clearError() {
  nameInput.classList.remove('input-error');
  nameError.classList.remove('visible');
}

function toTitleCase(str) {
  return str
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/* ─── Generate Certificate ─── */
function generateCertificate() {
  clearError();
  const raw = nameInput.value.trim();

  if (!raw) { setError('Por favor, informe seu nome.'); nameInput.focus(); return; }
  if (raw.length < 2) { setError('O nome precisa ter ao menos 2 caracteres.'); nameInput.focus(); return; }
  if (raw.length > 80) { setError('O nome não pode ultrapassar 80 caracteres.'); nameInput.focus(); return; }

  const formattedName = toTitleCase(raw);
  certNameEl.textContent = formattedName;

  portalScreen.style.opacity = '0';
  portalScreen.style.transition = 'opacity 0.4s ease';

  setTimeout(() => {
    portalScreen.style.display = 'none';
    certScreen.style.display   = 'block';
    certScreen.style.opacity   = '0';
    certScreen.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      certScreen.style.opacity = '1';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }));
  }, 400);
}

/* ─── New Certificate ─── */
function newCertificate() {
  certScreen.style.opacity = '0';
  certScreen.style.transition = 'opacity 0.35s ease';
  setTimeout(() => {
    certScreen.style.display   = 'none';
    nameInput.value            = '';
    clearError();
    portalScreen.style.display = 'flex';
    portalScreen.style.opacity = '0';
    portalScreen.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      portalScreen.style.opacity = '1';
      nameInput.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }));
  }, 350);
}

/* ─── Download PDF ─── */
async function downloadPDF() {
  showLoading();
  try {
    const cert      = document.getElementById('certificate');
    const actionBar = document.getElementById('actionBar');
    actionBar.style.display = 'none';

    const canvas = await html2canvas(cert, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#FAFAF8',
      logging: false,
      imageTimeout: 15000,
    });

    actionBar.style.display = '';

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    pdf.addImage(imgData, 'JPEG', 0, 0, 297, 210);

    const name = certNameEl.textContent.replace(/\s+/g, '_');
    pdf.save(`Certificado_VAIF_Experience_${name}.pdf`);
  } catch (err) {
    console.error('Erro ao gerar PDF:', err);
    alert('Não foi possível gerar o PDF. Use a opção "Imprimir" e salve como PDF.');
  } finally {
    hideLoading();
  }
}

/* ─── Print ─── */
function printCertificate() { window.print(); }

/* ─── Keyboard ─── */
nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') generateCertificate(); });
nameInput.addEventListener('input',   ()  => { if (nameInput.classList.contains('input-error')) clearError(); });

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
  injectImages();

  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  }));

  if (window.innerWidth > 768) nameInput.focus();
});
