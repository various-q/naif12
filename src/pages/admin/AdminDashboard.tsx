import React from 'react';
import { 
  Users,
  Settings,
  BarChart3,
  Shield,
  FileText,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const stats = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'إجمالي المستخدمين',
      value: '1,234',
      change: '+12%',
      color: 'blue'
    },
    {
      icon: <Activity className="w-8 h-8 text-green-600" />,
      title: 'المستخدمين النشطين',
      value: '892',
      change: '+8%',
      color: 'green'
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      title: 'الاستبيانات المكتملة',
      value: '2,567',
      change: '+25%',
      color: 'purple'
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: 'التنبيهات الأمنية',
      value: '3',
      change: '-2',
      color: 'red'
    }
  ];

  const systemMetrics = [
    { label: 'أداء النظام', value: 98, color: 'green' },
    { label: 'رضا العملاء', value: 94, color: 'blue' },
    { label: 'أمان البيانات', value: 100, color: 'emerald' },
    { label: 'وقت الاستجابة', value: 87, color: 'yellow' }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user',
      message: 'تم إضافة مستخدم جديد: أحمد محمد',
      time: 'منذ 5 دقائق',
      icon: <Users className="w-4 h-4 text-blue-500" />
    },
    {
      id: 2,
      type: 'security',
      message: 'تم تفعيل المصادقة الثنائية للمدير سارة أحمد',
      time: 'منذ 15 دقيقة',
      icon: <Shield className="w-4 h-4 text-green-500" />
    },
    {
      id: 3,
      type: 'system',
      message: 'تم تحديث إعدادات النظام',
      time: 'منذ ساعة',
      icon: <Settings className="w-4 h-4 text-purple-500" />
    },
    {
      id: 4,
      type: 'warning',
      message: 'تحذير: محاولة دخول غير مصرح بها',
      time: 'منذ ساعتين',
      icon: <AlertTriangle className="w-4 h-4 text-red-500" />
    }
  ];

  const quickActions = [
    {
      title: 'إدارة المستخدمين',
      description: 'إضافة وتعديل المستخدمين والصلاحيات',
      icon: <Users className="w-6 h-6" />,
      color: 'blue',
      href: '/admin/employees'
    },
    {
      title: 'إعدادات النظام',
      description: 'تخصيص إعدادات التطبيق العامة',
      icon: <Settings className="w-6 h-6" />,
      color: 'gray',
      href: '/admin/settings'
    },
    {
      title: 'الأمان والحماية',
      description: 'إدارة الأمان والمصادقة الثنائية',
      icon: <Shield className="w-6 h-6" />,
      color: 'red',
      href: '/admin/security'
    },
    {
      title: 'التحليلات والتقارير',
      description: 'عرض الإحصائيات والتقارير المفصلة',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'green',
      href: '/admin/analytics'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2">
          مرحباً، {user?.name}!
        </h1>
        <p className="text-indigo-100">
          لوحة تحكم المدير - إدارة شاملة لنظام مدرسة تعليم القيادة
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </div>
            <p className={`text-sm text-${stat.color}-600 flex items-center gap-1`}>
              <TrendingUp className="w-4 h-4" />
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* System Metrics */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">مؤشرات النظام</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemMetrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(metric.value * 2.51)} 251.2`}
                    className={`text-${metric.color}-500`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">
                    {metric.value}%
                  </span>
                </div>
              </div>
              <h3 className="font-medium text-gray-900">{metric.label}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">إجراءات سريعة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-${action.color}-100 text-${action.color}-600`}>
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">النشاط الأخير</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            عرض جميع الأنشطة
          </button>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">حالة النظام</h2>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm text-green-600 font-medium">كل الأنظمة تعمل بشكل طبيعي</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="font-medium text-gray-900">الخادم الرئيسي</h3>
                <p className="text-sm text-gray-600">يعمل بشكل طبيعي</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="font-medium text-gray-900">قاعدة البيانات</h3>
                <p className="text-sm text-gray-600">متصلة وسليمة</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <div>
                <h3 className="font-medium text-gray-900">النسخ الاحتياطية</h3>
                <p className="text-sm text-gray-600">آخر نسخة: اليوم 3:00 ص</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};