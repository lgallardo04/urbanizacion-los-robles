import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines Tailwind classes safely
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a Venezuelan Cedula number
 * Example: '14892304' -> '14.892.304'
 */
export function formatCedula(cedula: string): string {
  if (!cedula) return '';
  const clean = cedula.toString().replace(/\D/g, '');
  return clean.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Formats a date string into a relative time ago in Spanish
 * Example: 'hace 5 minutos'
 */
export function formatTimeAgo(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'hace un momento';
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `hace ${minutes} minuto${minutes !== 1 ? 's' : ''}`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours} hora${hours !== 1 ? 's' : ''}`;
  
  const days = Math.floor(hours / 24);
  if (days < 30) return `hace ${days} día${days !== 1 ? 's' : ''}`;
  
  const months = Math.floor(days / 30);
  if (months < 12) return `hace ${months} mes${months !== 1 ? 'es' : ''}`;
  
  const years = Math.floor(months / 12);
  return `hace ${years} año${years !== 1 ? 's' : ''}`;
}

/**
 * Formats an amount as currency
 * Example: 1500.50 -> '1.500,50 Bs.'
 */
export function formatCurrency(amount: number, currency: string = 'Bs.'): string {
  if (isNaN(amount)) return `0,00 ${currency}`;
  
  return new Intl.NumberFormat('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount) + ' ' + currency;
}

/**
 * Formats a Venezuelan phone number
 * Example: '04145551234' -> '0414-555-1234'
 */
export function formatPhoneVE(phone: string): string {
  if (!phone) return '';
  const clean = phone.toString().replace(/\D/g, '');
  
  if (clean.length === 11) {
    return `${clean.slice(0, 4)}-${clean.slice(4, 7)}-${clean.slice(7)}`;
  }
  
  return phone;
}
