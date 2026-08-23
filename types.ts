export interface Speaker {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  type: 'PEMATERI 1' | 'PEMATERI 2' | 'MODERATOR';
}

export interface NavItem {
  label: string;
  href: string;
}