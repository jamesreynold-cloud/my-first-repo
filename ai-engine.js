function subscribePlan(planName) {
    document.getElementById('selectedPlan').value = planName;
    document.getElementById('planTitle').textContent = 'Subscribe to ' + planName;
    document.getElementById('subscribeModal').classList.add('active');
}

function completeSubscription(e) {
    e.preventDefault();
    const form = document.getElementById('subscribeForm');
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <p>✓ Subscription Started!</p>
        <p>Welcome to AI Recommendation Engine!</p>
        <p style="font-size: 0.9em; margin-top: 10px;">Your free trial starts now. API key sent to email.</p>
    `;
    form.parentNode.insertBefore(successMsg, form);
    form.style.display = 'none';
    setTimeout(() => {
        document.getElementById('subscribeModal').classList.remove('active');
        document.getElementById('subscribeForm').style.display = '';
        successMsg.remove();
        form.reset();
    }, 2000);
}

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('subscribeModal').classList.remove('active');
});

document.getElementById('subscribeModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('subscribeModal')) {
        document.getElementById('subscribeModal').classList.remove('active');
    }
});
