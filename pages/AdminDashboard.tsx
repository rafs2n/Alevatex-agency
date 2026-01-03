
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Mail, Calendar, MessageSquare, Trash2, CheckCircle, 
  Search, Download, Filter, Eye, ChevronRight, LayoutDashboard, 
  TrendingUp, Clock, Archive
} from 'lucide-react';
import { Lead } from '../data/content';

const AdminDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'contacted' | 'archived'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = () => {
    const stored = localStorage.getItem('alevatex_leads');
    if (stored) {
      setLeads(JSON.parse(stored));
    }
  };

  const updateLeadStatus = (id: string, newStatus: Lead['status']) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    setLeads(updated);
    localStorage.setItem('alevatex_leads', JSON.stringify(updated));
    if (selectedLead?.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  const deleteLead = (id: string) => {
    if (window.confirm("Are you sure you want to delete this lead forever?")) {
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      localStorage.setItem('alevatex_leads', JSON.stringify(updated));
      setSelectedLead(null);
    }
  };

  const exportLeads = () => {
    const headers = ['Name', 'Email', 'Service', 'Message', 'Timestamp', 'Status'];
    const csvContent = [
      headers.join(','),
      ...leads.map(l => [
        `"${l.name}"`,
        `"${l.email}"`,
        `"${l.service}"`,
        `"${l.message.replace(/"/g, '""')}"`,
        `"${new Date(l.timestamp).toLocaleString()}"`,
        `"${l.status}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alevatex_leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          lead.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    archived: leads.filter(l => l.status === 'archived').length,
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 dark:bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <LayoutDashboard size={24} />
              </div>
              <h1 className="text-3xl font-black tracking-tight">Leads Dashboard</h1>
            </div>
            <p className="text-slate-500">Manage incoming inquiries and client relationships.</p>
          </div>
          
          <button 
            onClick={exportLeads}
            className="flex items-center space-x-2 bg-white dark:bg-card border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
          >
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Inquiries', value: stats.total, icon: <Users size={20} />, color: 'bg-blue-500' },
            { label: 'New Leads', value: stats.new, icon: <TrendingUp size={20} />, color: 'bg-green-500' },
            { label: 'Followed Up', value: stats.contacted, icon: <CheckCircle size={20} />, color: 'bg-amber-500' },
            { label: 'Archived', value: stats.archived, icon: <Archive size={20} />, color: 'bg-slate-500' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white dark:bg-card rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl text-white ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-2xl font-black">{stat.value}</span>
              </div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main List Area */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-card rounded-[2.5rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
              {/* Controls */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text"
                    placeholder="Search by name, email or service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-dark border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-primary transition-all"
                  />
                </div>
                <div className="flex items-center space-x-2 bg-slate-50 dark:bg-dark p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                  {['all', 'new', 'contacted', 'archived'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status as any)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                        filterStatus === status ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table / List */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-dark/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                      <tr 
                        key={lead.id} 
                        className={`hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors ${selectedLead?.id === lead.id ? 'bg-primary/5' : ''}`}
                        onClick={() => setSelectedLead(lead)}
                      >
                        <td className="px-6 py-5">
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{lead.name}</p>
                            <p className="text-xs text-slate-400">{lead.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="text-xs font-medium px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full">
                            {lead.service}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center text-xs text-slate-400 space-x-1">
                            <Clock size={12} />
                            <span>{new Date(lead.timestamp).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                            lead.status === 'new' ? 'text-green-500 bg-green-500/10' :
                            lead.status === 'contacted' ? 'text-amber-500 bg-amber-500/10' :
                            'text-slate-400 bg-slate-500/10'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <ChevronRight size={18} className="text-slate-300" />
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-20 text-center">
                          <div className="flex flex-col items-center text-slate-400">
                            <Archive size={48} strokeWidth={1} className="mb-4 opacity-20" />
                            <p className="text-lg">No inquiries found matching your filters.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Details Sidebar Area */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              {selectedLead ? (
                <motion.div 
                  key={selectedLead.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white dark:bg-card rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 shadow-xl sticky top-32"
                >
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-2xl">
                      {selectedLead.name.charAt(0)}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => deleteLead(selectedLead.id)}
                        className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-1">{selectedLead.name}</h3>
                  <a href={`mailto:${selectedLead.email}`} className="text-primary hover:underline mb-8 block font-medium">
                    {selectedLead.email}
                  </a>

                  <div className="space-y-6 mb-10">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Inquiry for</p>
                      <div className="p-4 bg-slate-50 dark:bg-dark rounded-2xl border border-slate-100 dark:border-slate-800 font-bold">
                        {selectedLead.service}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Message</p>
                      <div className="p-4 bg-slate-50 dark:bg-dark rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 leading-relaxed italic">
                        "{selectedLead.message}"
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Submission Date</p>
                      <p className="text-sm font-medium">{new Date(selectedLead.timestamp).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {selectedLead.status === 'new' ? (
                      <button 
                        onClick={() => updateLeadStatus(selectedLead.id, 'contacted')}
                        className="col-span-2 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2"
                      >
                        <CheckCircle size={18} />
                        <span>Mark Contacted</span>
                      </button>
                    ) : selectedLead.status === 'contacted' ? (
                      <button 
                        onClick={() => updateLeadStatus(selectedLead.id, 'archived')}
                        className="col-span-2 py-4 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-2xl hover:bg-slate-900 transition-all flex items-center justify-center space-x-2"
                      >
                        <Archive size={18} />
                        <span>Archive Lead</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => updateLeadStatus(selectedLead.id, 'new')}
                        className="col-span-2 py-4 border border-slate-200 dark:border-slate-800 font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                      >
                        Restore Lead
                      </button>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="h-full border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center text-slate-400">
                  <Eye size={48} strokeWidth={1} className="mb-4 opacity-20" />
                  <p className="text-sm uppercase tracking-widest font-bold">Select a lead to view details</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
