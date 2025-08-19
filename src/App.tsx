import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Layout/Header';
import { LoadingSpinner } from './components/Common/LoadingSpinner';
import { ProtectedRoute } from './components/Common/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { Survey } from './pages/Survey';
import { Auth } from './pages/Auth';
import { ClientDashboard } from './pages/client/ClientDashboard';
import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';
import { AdminDashboard } from './pages/admin/AdminDashboard';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Suspense fallback={<LoadingSpinner size="lg" className="min-h-screen" />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/survey" element={<Survey />} />
                  <Route 
                    path="/auth" 
                    element={
                      <ProtectedRoute requireAuth={false}>
                        <Auth />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Client Portal Routes */}
                  <Route 
                    path="/client-portal/dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['client']}>
                        <ClientDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/client-portal/*" 
                    element={
                      <ProtectedRoute allowedRoles={['client']}>
                        <div className="text-center py-20">
                          <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            صفحة قيد التطوير
                          </h2>
                          <p className="text-gray-600">
                            هذه الصفحة قيد التطوير وستكون متاحة قريباً
                          </p>
                        </div>
                      </ProtectedRoute>
                    } 
                  />

                  {/* Employee Routes */}
                  <Route 
                    path="/employee/dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['employee']}>
                        <EmployeeDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/employee/*" 
                    element={
                      <ProtectedRoute allowedRoles={['employee']}>
                        <div className="text-center py-20">
                          <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            صفحة قيد التطوير
                          </h2>
                          <p className="text-gray-600">
                            هذه الصفحة قيد التطوير وستكون متاحة قريباً
                          </p>
                        </div>
                      </ProtectedRoute>
                    } 
                  />

                  {/* Admin Routes */}
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/*" 
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <div className="text-center py-20">
                          <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            صفحة قيد التطوير
                          </h2>
                          <p className="text-gray-600">
                            هذه الصفحة قيد التطوير وستكون متاحة قريباً
                          </p>
                        </div>
                      </ProtectedRoute>
                    } 
                  />

                  {/* Fallback Route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>

            {/* Toast Notifications */}
            <Toaster 
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;