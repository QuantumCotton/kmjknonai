import { ReactNode } from 'react';
import Layout from './Layout';
import ChatWidget from '../atlas/ChatWidget';

interface LayoutWithAtlasProps {
  children: ReactNode;
}

export default function LayoutWithAtlas({ children }: LayoutWithAtlasProps) {
  return (
    <Layout>
      {children}
      <ChatWidget position="bottom-right" />
    </Layout>
  );
}
