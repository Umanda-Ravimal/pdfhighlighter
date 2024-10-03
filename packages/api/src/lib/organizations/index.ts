interface Organization {
  id: string;
  name: string;
}

const currentOrganizations: Organization[] = [
  { id: '1', name: 'Organization A' },
  { id: '2', name: 'Organization B' },
];

const pendingOrganizations: Organization[] = [
  { id: '3', name: 'Organization C' },
  { id: '4', name: 'Organization D' },
];

export const getCurrentOrganizations = () => {
  return currentOrganizations;
};

export const getPendingOrganizations = () => {
  return pendingOrganizations;
};
