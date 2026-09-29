// BABLU BUXA REAL ESTATE - APPLICATION JAVASCRIPT

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  calculateEMI();
  setupURLParams();
});

// Mobile Menu Toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
}

// Property Category Filter
function filterProps(category) {
  const tabs = document.querySelectorAll('.prop-tab-btn');
  tabs.forEach(tab => {
    tab.classList.remove('active', 'bg-brand-gold', 'text-brand-deepNavy');
    tab.classList.add('bg-brand-cardNavy', 'text-slate-300');
    if (tab.textContent.toLowerCase().includes(category) || (category === 'all' && tab.textContent.toLowerCase() === 'all')) {
      tab.classList.add('active', 'bg-brand-gold', 'text-brand-deepNavy');
      tab.classList.remove('bg-brand-cardNavy', 'text-slate-300');
    }
  });

  const cards = document.querySelectorAll('.property-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Filter from Hero Search
function filterPropertiesFromHero() {
  const typeSelect = document.getElementById('heroPropType');
  if (typeSelect) {
    const selectedType = typeSelect.value;
    filterProps(selectedType);
  }
}

// Home Loan EMI Calculator
function calculateEMI() {
  const amountInput = document.getElementById('loanAmount');
  const rateInput = document.getElementById('interestRate');
  const tenureInput = document.getElementById('tenure');

  if (!amountInput || !rateInput || !tenureInput) return;

  const P = parseFloat(amountInput.value);
  const annualRate = parseFloat(rateInput.value);
  const tenureYears = parseFloat(tenureInput.value);

  // Update labels
  const amountValLabel = document.getElementById('loanAmountVal');
  const rateValLabel = document.getElementById('interestRateVal');
  const tenureValLabel = document.getElementById('tenureVal');

  if (amountValLabel) amountValLabel.textContent = formatINR(P);
  if (rateValLabel) rateValLabel.textContent = annualRate.toFixed(1) + ' %';
  if (tenureValLabel) tenureValLabel.textContent = tenureYears + (tenureYears === 1 ? ' Year' : ' Years');

  const r = (annualRate / 12) / 100; // Monthly interest rate
  const n = tenureYears * 12; // Total months

  // EMI formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  const monthlyEMILabel = document.getElementById('monthlyEMI');
  const principalLabel = document.getElementById('calcPrincipal');
  const interestLabel = document.getElementById('calcInterest');
  const totalLabel = document.getElementById('calcTotal');

  if (monthlyEMILabel) monthlyEMILabel.textContent = formatINR(Math.round(emi));
  if (principalLabel) principalLabel.textContent = formatINR(Math.round(P));
  if (interestLabel) interestLabel.textContent = formatINR(Math.round(totalInterest));
  if (totalLabel) totalLabel.textContent = formatINR(Math.round(totalPayment));
}

// Format INR Currency
function formatINR(val) {
  if (isNaN(val)) return '₹ 0';
  return '₹ ' + val.toLocaleString('en-IN');
}

// Property Details Modal
function openPropertyModal(title, price, location, type, imgSrc) {
  const modal = document.getElementById('propertyModal');
  const content = document.getElementById('modalContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="relative rounded-xl overflow-hidden h-64 border border-brand-gold/30">
      <img src="${imgSrc}" alt="${title}" class="w-full h-full object-cover">
      <div class="absolute top-3 left-3 bg-brand-gold text-brand-deepNavy text-xs font-bold px-3 py-1 rounded">RERA Verified</div>
      <div class="absolute bottom-3 right-3 bg-brand-deepNavy/90 text-brand-gold font-heading font-bold text-xl px-3 py-1 rounded-lg border border-brand-gold/30">${price}</div>
    </div>
    <div class="space-y-3">
      <div class="flex items-center gap-2 text-brand-gold text-xs font-semibold">
        <i class="fas fa-map-marker-alt"></i> ${location}
      </div>
      <h3 class="text-2xl font-heading font-bold text-white">${title}</h3>
      <p class="text-xs text-slate-300 leading-relaxed">
        Exclusive property managed by <strong>Bablu Buxa Real Estate</strong>. Verified title, bank loan pre-approved, premium construction quality, and high potential for capital appreciation.
      </p>
      <div class="p-4 bg-brand-deepNavy rounded-xl border border-slate-800 grid grid-cols-2 gap-3 text-xs">
        <div><span class="text-slate-400 block text-[10px]">Property Type:</span><span class="font-bold text-white">${type}</span></div>
        <div><span class="text-slate-400 block text-[10px]">Ownership:</span><span class="font-bold text-emerald-400">Freehold / Clear Title</span></div>
        <div><span class="text-slate-400 block text-[10px]">Possession:</span><span class="font-bold text-white">Immediate / Ready</span></div>
        <div><span class="text-slate-400 block text-[10px]">Advisor:</span><span class="font-bold text-brand-gold">Bablu Buxa Direct Desk</span></div>
      </div>
      <div class="flex gap-3 pt-2">
        <a href="contact.html?property=${encodeURIComponent(title)}" class="flex-1 text-center py-3 bg-brand-gold hover:bg-brand-goldDark text-brand-deepNavy font-bold text-xs rounded-xl transition">
          Book Private Site Visit
        </a>
        <a href="https://wa.me/918578883632?text=Hi%20Bablu%20Buxa%20Real%20Estate,%20I%20am%20interested%20in%20${encodeURIComponent(title)}%20(${price})" target="_blank" class="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition flex items-center gap-2">
          <i class="fab fa-whatsapp text-base"></i> WhatsApp
        </a>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closePropertyModal() {
  const modal = document.getElementById('propertyModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// Contact Form Handler
function handleContactSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('contactName')?.value || '';
  const phone = document.getElementById('contactPhone')?.value || '';
  const email = document.getElementById('contactEmail')?.value || '';
  const interest = document.getElementById('contactInterest')?.value || '';
  const budget = document.getElementById('contactBudget')?.value || '';
  const message = document.getElementById('contactMessage')?.value || '';
  const whatsappConsent = document.getElementById('whatsappConsent')?.checked;

  const successAlert = document.getElementById('formSuccessAlert');
  if (successAlert) {
    successAlert.classList.remove('hidden');
    successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // If user enabled WhatsApp consent, open direct WhatsApp chat after 1.5s
  if (whatsappConsent) {
    setTimeout(() => {
      const waText = `Hi Bablu Buxa Real Estate,%0A%0AMy Name: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AInterest: ${encodeURIComponent(interest)}%0ABudget: ${encodeURIComponent(budget)}%0AMessage: ${encodeURIComponent(message)}`;
      window.open(`https://wa.me/918578883632?text=${waText}`, '_blank');
    }, 1500);
  }

  // Reset form
  const form = document.getElementById('contactForm');
  if (form) form.reset();
}

// Pre-fill parameters if arriving from property link
function setupURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const property = urlParams.get('property');
  const subject = urlParams.get('subject');

  const messageBox = document.getElementById('contactMessage');
  if (property && messageBox) {
    messageBox.value = `I would like more information and a site visit for property: ${property}.`;
  } else if (subject === 'HomeLoanAssistance' && messageBox) {
    messageBox.value = `I am looking for home loan assistance for buying a property. Please share the best interest rate options.`;
  }
}
