export function loadDonationData() {
    const savedDonationData = JSON.parse(localStorage.getItem('donationData'));
    const defaultDonationData = { progress: 0, totalDonated: 0, donationGoal: 5000}

    if (!savedDonationData) {
        localStorage.setItem('donationData', JSON.stringify(defaultDonationData));
        return defaultDonationData;
    }

    return savedDonationData
}

export function saveDonationData(donationDataObj) {
    localStorage.setItem('donationData', JSON.stringify(donationDataObj))
}

