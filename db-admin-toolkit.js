const licenses = {
    'Single Server': '$49/month',
    'Multi-Server': '$149/month',
    'Enterprise': '$399/month'
};

function purchaseLicense(licenseName) {
    document.getElementById('selectedLicense').value = licenseName;
    document.getElementById('licenseTitle').textContent = licenseName + ' License';
    document.getElementById('licensePrice').textContent = licenses[licenseName];
    document.getElementById('purchaseModal').classList.add('active');
}

function completePurchase(e) {
    e.preventDefault();
    const form = document.getElementById('purchaseForm');
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <p>✓ License Purchased Successfully!</p>
        <p>Welcome to DB Admin Toolkit!</p>
        <p style="font-size: 0.9em; margin-top: 10px;">License key will be sent via email.</p>
    `;
    form.parentNode.insertBefore(successMsg, form);
    form.style.display = 'none';
    setTimeout(() => {
        document.getElementById('purchaseModal').classList.remove('active');
        document.getElementById('purchaseForm').style.display = '';
        successMsg.remove();
        form.reset();
    }, 2000);
}

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('purchaseModal').classList.remove('active');
});

document.getElementById('purchaseModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('purchaseModal')) {
        document.getElementById('purchaseModal').classList.remove('active');
    }
});
