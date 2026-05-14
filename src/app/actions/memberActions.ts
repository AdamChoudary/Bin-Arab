'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

import { Member } from '@/types';

const MEMBERS_FILE = path.join(process.cwd(), 'src/data/members.json');

async function readMembers(): Promise<Member[]> {
  try {
    const data = await fs.readFile(MEMBERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeMembers(members: Member[]) {
  await fs.writeFile(MEMBERS_FILE, JSON.stringify(members, null, 2));
}

export async function getMembers(): Promise<Member[]> {
  return await readMembers();
}

export async function addMember(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const role = formData.get('role') as Member['role'];
  
  if (!name || !email || !role) {
    throw new Error('Missing required fields');
  }

  const members = await readMembers();
  const newMember: Member = {
    id: Date.now(),
    name,
    email,
    role,
    status: 'Active',
    avatar: name.substring(0, 2).toUpperCase(),
    joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  };

  members.push(newMember);
  await writeMembers(members);
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteMember(id: number) {
  const members = await readMembers();
  const updatedMembers = members.filter((m) => m.id !== id);
  await writeMembers(updatedMembers);
  revalidatePath('/admin');
  return { success: true };
}
