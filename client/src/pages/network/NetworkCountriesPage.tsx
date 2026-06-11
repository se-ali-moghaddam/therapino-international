import { motion } from 'framer-motion';
import { Globe, Users, ChartBar as BarChart2, TrendingUp, MapPin } from 'lucide-react';
import NetworkSidebar from '../../components/dashboard/NetworkSidebar';
import { mockCountries, rttNetworkStats } from '../../data/mockData';

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

export default function NetworkCountriesPage() {
  return (
    <div className="min-h-screen bg-calm-50">
      <NetworkSidebar />
      <div className="ml-56 p-6">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-calm-900">RTT Global Network</h1>
            <p className="text-calm-500 mt-1">Practitioners and clients across {rttNetworkStats.countries} countries worldwide</p>
          </motion.div>

          {/* Region Summary */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-4 text-white shadow-sm">
              <Globe size={24} className="mb-2 opacity-80" />
              <p className="text-2xl font-bold">{mockCountries.filter(c => ['United States', 'Canada'].includes(c.name)).reduce((a, c) => a + c.practitioners, 0).toLocaleString()}</p>
              <p className="text-sm text-primary-200">North America</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-4 text-white shadow-sm">
              <Globe size={24} className="mb-2 opacity-80" />
              <p className="text-2xl font-bold">{mockCountries.filter(c => ['United Kingdom', 'Spain', 'Germany', 'France'].includes(c.name)).reduce((a, c) => a + c.practitioners, 0).toLocaleString()}</p>
              <p className="text-sm text-teal-200">Europe</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-warning-500 to-warning-700 rounded-2xl p-4 text-white shadow-sm">
              <Globe size={24} className="mb-2 opacity-80" />
              <p className="text-2xl font-bold">{mockCountries.filter(c => c.name === 'Australia').reduce((a, c) => a + c.practitioners, 0).toLocaleString()}</p>
              <p className="text-sm text-warning-200">Oceania</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-success-500 to-success-700 rounded-2xl p-4 text-white shadow-sm">
              <Globe size={24} className="mb-2 opacity-80" />
              <p className="text-2xl font-bold">{mockCountries.filter(c => ['India', 'Japan', 'South Africa'].includes(c.name)).reduce((a, c) => a + c.practitioners, 0).toLocaleString()}</p>
              <p className="text-sm text-success-200">Africa & Asia</p>
            </motion.div>
          </motion.div>

          {/* Country Cards */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {mockCountries.map((country) => (
              <motion.div key={country.name} variants={fadeInUp} className="bg-white rounded-2xl border border-calm-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <h3 className="font-bold text-calm-900">{country.name}</h3>
                    <p className="text-xs text-calm-500">{country.practitioners} practitioners</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-calm-50 rounded-xl text-center">
                    <p className="text-lg font-bold text-calm-900">{country.clients.toLocaleString()}</p>
                    <p className="text-xs text-calm-500">Clients</p>
                  </div>
                  <div className="p-3 bg-calm-50 rounded-xl text-center">
                    <p className="text-lg font-bold text-calm-900">{Math.round(country.sessions / 1000)}K</p>
                    <p className="text-xs text-calm-500">Sessions</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-calm-100 text-xs text-calm-400 flex items-center gap-1 justify-center">
                  <MapPin size={12} />
                  <span>Active RTT region</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
