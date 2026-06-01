import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import JsonLd from '@/components/JsonLd';
import { buildMetadata, SITE } from '@/lib/seo';
import { faqLd } from '@/lib/structuredData';

export const metadata: Metadata = buildMetadata({
  title: 'Bin Arab Real Estate & Builders | Luxury Living in Bahria Islamabad',
  titleAbsolute: true,
  description:
    "Bin Arab Real Estate & Builders helps you buy, sell, rent, invest, build, and renovate luxury homes, plazas, and plots in Bahria Enclave, Islamabad — with complete transparency since 2016.",
  path: '/',
});

const faqs = [
  {
    question: 'Where is Bin Arab Real Estate & Builders located?',
    answer: `${SITE.name} is based at ${SITE.address.street}, ${SITE.address.locality}, Pakistan. You can reach the office Monday to Saturday, 10:00 AM to 7:00 PM.`,
  },
  {
    question: 'What services does Bin Arab Real Estate & Builders offer?',
    answer:
      'We offer property sales, investment consulting, rental management, construction services, premium renovation, and architectural design across Bahria Enclave and Bahria Town, Islamabad.',
  },
  {
    question: 'What types of properties can I buy through Bin Arab?',
    answer:
      'We deal in luxury residential villas, grand commercial plazas, and prime investment plots in the most sought-after sectors of Bahria Enclave, Islamabad.',
  },
  {
    question: 'How can I contact Bin Arab Real Estate & Builders?',
    answer: `Call or WhatsApp ${SITE.phoneDisplay}, or email ${SITE.email} to speak with a property consultant.`,
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqLd(faqs)} />
      <HomeClient />
    </>
  );
}
