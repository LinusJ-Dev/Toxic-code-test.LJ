import { redirect } from 'next/navigation';

export default function Show() {
  redirect('/');
  return null;
}