// TODO-EMERGENCIAS: telefonos de siniestros pendientes de entrega por Melanie
// (issue #19). Este es el UNICO punto de mantenimiento de la lista: actualizar
// solo este archivo, sin tocar componentes. phone: '' se muestra como
// "Por confirmar" hasta completar la entrega.
export interface EmergencyContact {
  name: string;
  phone: string; // formato legible con espacios; el tel: elimina espacios
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  { name: 'Mapfre', phone: '' },
  { name: 'Pacífico', phone: '' },
  { name: 'Rimac', phone: '' },
  { name: 'La Positiva', phone: '' },
  { name: 'Chubb', phone: '' },
  { name: 'Crecer', phone: '' },
  { name: 'Protecta Security', phone: '' },
  { name: 'Secrex Cesce', phone: '' },
  { name: 'InSur', phone: '' },
  { name: 'Avla', phone: '' },
  { name: 'AuguStar', phone: '' },
  { name: 'Sanitas', phone: '' },
  { name: 'Quálitas', phone: '' },
];
