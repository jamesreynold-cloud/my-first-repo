const plans = {
    'Starter': { price: '$29/month', description: 'Perfect for small teams and startups' },
    'Professional': { price: '$79/month', description: 'For growing teams and projects' },
    'Enterprise': { price: '$199/month', description: 'For large enterprises with custom needs' }
};

function purchasePlan(planName) {
    const plan = plans[planName];
    document.getElementById('selectedPlan').value = planName;
    document.getElementById('planTitle').textContent = planName + ' Plan';
    document.getElementById('planDescription').textContent = plan.description;
    document.getElementById('planPrice').textContent = plan.price;
    document.getElementById('purchaseModal').classList.add('active');
}

function completePurchase(e) {
    e.preventDefault();
    const form = document.getElementById('purchaseForm');
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <p>✓ Subscription Successful!</p>
        <p>Welcome to Agile Launch Dashboard!</p>
        <p style="font-size: 0.9em; margin-top: 10px;">You will receive setup instructions via email.</p>
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
