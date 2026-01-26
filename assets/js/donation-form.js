import { loadDonationData, saveDonationData } from '../../storage/storage.js';

// Progress block
const donationImg = document.querySelector('.img-wrapper');
const percentageHeadingEl = document.getElementById('progress-in-percentages');
const amountRaisedEl = document.getElementById('amount-raised');
const goalAmountEl = document.getElementById('goal-amount');
const amountRemainingEl = document.getElementById('amount-remaining');

const form = document.getElementById('donation-form');

render();

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const donationData = loadDonationData();

    const userDonationAmount = Number(formData.get('bedrag'));

    donationData.totalDonated = donationData.totalDonated + userDonationAmount;

    donationData.progress = convertDonationToPercentages({ donationAmount: donationData.totalDonated, donationGoal: donationData.donationGoal });
    saveDonationData(donationData);
    render();
});

function convertDonationToPercentages({donationAmount, donationGoal}) {
    return donationAmount * 100 /  donationGoal;
}

function render() {
    const donationData = loadDonationData();
    donationImg.style.setProperty('--progress', donationData.progress);
    percentageHeadingEl.textContent = Math.round(donationData.progress);
    amountRaisedEl.textContent = donationData.totalDonated.toFixed(2);
    goalAmountEl.textContent = donationData.donationGoal.toFixed(2);
    amountRemainingEl.textContent = (donationData.donationGoal - donationData.totalDonated).toFixed(2);
}
