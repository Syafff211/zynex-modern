import { useStore } from './context/StoreContext';
import { Navbar } from './components/store/Navbar';
import { Hero } from './components/store/Hero';
import { AnnouncementBanner } from './components/store/AnnouncementBanner';
import { PterodactylConfigurator } from './components/store/PterodactylConfigurator';
import { DomainSearch } from './components/store/DomainSearch';
import { ProductList } from './components/store/ProductList';
import { ServerStatusWidget } from './components/store/ServerStatusWidget';
import { Testimonials } from './components/store/Testimonials';
import { FAQ } from './components/store/FAQ';
import { Footer } from './components/store/Footer';
import { FloatingWhatsapp } from './components/store/FloatingWhatsapp';
import { OrderModal } from './components/store/OrderModal';
import { ScrollManager } from './components/store/ScrollManager';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';

export function AppContent() {
  const { currentView, isAdminAuthenticated } = useStore();

  if (currentView === 'admin') {
    if (!isAdminAuthenticated) {
      return <AdminLogin />;
    }
    return <AdminLayout />;
  }

  return (
    <div className="relative min-h-screen bg-[#040711] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Scroll Indicator */}
      <ScrollManager />

      {/* Top Banner Announcement */}
      <AnnouncementBanner />

      {/* Main Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <PterodactylConfigurator />
        <DomainSearch />
        <ProductList />
        <ServerStatusWidget />
        <Testimonials />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Elements */}
      <FloatingWhatsapp />
      <OrderModal />
    </div>
  );
}

export function App() {
  return <AppContent />;
}

export default App;
