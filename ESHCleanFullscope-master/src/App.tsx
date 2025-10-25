import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayoutWithAtlas from './components/layout/LayoutWithAtlas';
import AdminLayout from './components/admin/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import ApplyPage from './pages/ApplyPage';
import MarketsPage from './pages/MarketsPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import FormsPage from './pages/FormsPage';
import ThanksPage from './pages/ThanksPage';

// Contractor Pages
import KMJKPage from './pages/contractor/KMJKPage';
import ContractorDashboard from './pages/contractor/ContractorDashboard';
import LeadInbox from './pages/contractor/LeadInbox';
import AtlasDashboard from './pages/AtlasDashboard';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import LeadsPage from './pages/admin/LeadsPage';
import WorkOrdersPage from './pages/admin/WorkOrdersPage';
import ExecutiveDashboard from './pages/admin/ExecutiveDashboard';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import FinancialDashboard from './pages/admin/FinancialDashboard';
import MarketPerformance from './pages/admin/MarketPerformance';
import ContractorPerformance from './pages/admin/ContractorPerformance';
import ContractorAccountsPage from './pages/admin/ContractorAccountsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Atlas Chatbot */}
        <Route path="/" element={<LayoutWithAtlas><HomePage /></LayoutWithAtlas>} />
        <Route path="/how-it-works" element={<LayoutWithAtlas><HowItWorksPage /></LayoutWithAtlas>} />
        <Route path="/for-contractors" element={<LayoutWithAtlas><ApplyPage /></LayoutWithAtlas>} />
        <Route path="/apply" element={<LayoutWithAtlas><ApplyPage /></LayoutWithAtlas>} />
        <Route path="/markets" element={<LayoutWithAtlas><MarketsPage /></LayoutWithAtlas>} />
        <Route path="/about" element={<LayoutWithAtlas><AboutPage /></LayoutWithAtlas>} />
        <Route path="/blog" element={<LayoutWithAtlas><BlogPage /></LayoutWithAtlas>} />
        <Route path="/forms" element={<LayoutWithAtlas><FormsPage /></LayoutWithAtlas>} />
        <Route path="/thanks" element={<LayoutWithAtlas><ThanksPage /></LayoutWithAtlas>} />
        
        {/* Contractor Sites */}
        <Route path="/c/kmjk" element={<KMJKPage />} />
        
        {/* Contractor Dashboard */}
        <Route path="/contractor/dashboard" element={<ContractorDashboard />} />
        <Route path="/contractor/leads" element={<LeadInbox />} />
        
        {/* Private Atlas dashboard */}
        <Route path="/atlas-control" element={<LayoutWithAtlas><AtlasDashboard /></LayoutWithAtlas>} />
        
        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/executive" element={<AdminLayout><ExecutiveDashboard /></AdminLayout>} />
        <Route path="/admin/contractor-accounts" element={<AdminLayout><ContractorAccountsPage /></AdminLayout>} />
        <Route path="/admin/analytics" element={<AdminLayout><AnalyticsPage /></AdminLayout>} />
        <Route path="/admin/financial" element={<AdminLayout><FinancialDashboard /></AdminLayout>} />
        <Route path="/admin/leads" element={<AdminLayout><LeadsPage /></AdminLayout>} />
        <Route path="/admin/work-orders" element={<AdminLayout><WorkOrdersPage /></AdminLayout>} />
        <Route path="/admin/contractor-performance" element={<AdminLayout><ContractorPerformance /></AdminLayout>} />
        <Route path="/admin/market-performance" element={<AdminLayout><MarketPerformance /></AdminLayout>} />
        
        {/* Catch-all route */}
        <Route path="*" element={<LayoutWithAtlas><HomePage /></LayoutWithAtlas>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
