import KitchenTemplate from '../../templates/KitchenTemplate';

export default function KMJKPage() {
  const contractorData = {
    contractorName: 'KMJK Construction',
    logo: '/images/contractors/kmjk-logo.png',
    phone: '(772) 555-0123',
    email: 'info@kmjk.pro',
    serviceAreas: [
      'Port St. Lucie',
      'Fort Pierce',
      'Stuart',
      'Jensen Beach',
      'Palm City',
      'Vero Beach'
    ],
    rating: 5,
    projectsCompleted: 127,
    yearsExperience: 8
  };

  return <KitchenTemplate {...contractorData} />;
}
